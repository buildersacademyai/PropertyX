import { ApiService } from "@/services/api"
import { and, eq, inArray } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import { env } from "@/lib/config/env"
import { convertAmount } from "@/lib/utils"

import { db } from "../drizzle"
import { dalDbOperation } from "../helpers"
import { assets, tcoins, whiteListing } from "../schema"
import { ThrowableDalError } from "../type"

const getFtBalancesFromApi = unstable_cache(
  async (stxAddress: string) => {
    return dalDbOperation(async () => {
      if (!stxAddress) {
        throw new ThrowableDalError({ type: "invalid-address" })
      }
      try {
        const balancesResponse = await ApiService.getFtBalances(stxAddress)
        return balancesResponse
      } catch (error) {
        throw new ThrowableDalError({ type: "unknown-error", error: error })
      }
    })
  },
  ["ft-balances"],
  {
    tags: ["apts", "ft-balances"],
    revalidate: env.NODE_ENV === "test" ? 0 : 3600,
  }
)

async function getAptsCore(stxAddress: string) {
  return dalDbOperation(async () => {
    if (!stxAddress) {
      throw new ThrowableDalError({ type: "invalid-address" })
    }

    const response = await getFtBalancesFromApi(stxAddress)
    const balances = response.success ? response.data.results || [] : []
    const contracts = balances.map((b) => b.token.split("::")[0])

    if (!contracts.length) throw new ThrowableDalError({ type: "no-data" })

    const whitelistedRows = await db
      .select({ whitelisted: whiteListing.whitelisted })
      .from(whiteListing)
      .where(
        and(
          inArray(whiteListing.whitelisted, contracts),
          eq(whiteListing.isWhitelisted, true)
        )
      )

    const whitelistedSet = new Set(whitelistedRows.map((r) => r.whitelisted))

    if (!whitelistedSet.size) throw new ThrowableDalError({ type: "no-data" })

    const whitelistedContracts = contracts.filter((c) => whitelistedSet.has(c))

    if (!whitelistedContracts.length)
      throw new ThrowableDalError({ type: "no-data" })

    const tcoinRows = await db
      .select()
      .from(tcoins)
      .leftJoin(assets, eq(tcoins.assetId, assets.id))
      .where(inArray(tcoins.contract, whitelistedContracts))

    const byContract = new Map(tcoinRows.map((r) => [r.tcoins.contract, r]))

    if (!tcoinRows.length) throw new ThrowableDalError({ type: "no-data" })

    const items = balances
      .map((b) => {
        const contract = b.token.split("::")[0]
        const tokenName = b.token.split("::")[1] || ""
        if (!whitelistedSet.has(contract)) return null
        const meta = byContract.get(contract)
        if (!meta || !meta.assets) return null
        return {
          balance: convertAmount(Number(b.balance)),
          contract,
          tokenName,
          tcoin: {
            name: meta.tcoins.name,
            description: meta.tcoins.description,
            image: meta.tcoins.image,
            assetId: meta.tcoins.assetId,
          },
          asset: {
            id: meta.assets.id,
            name: meta.assets.name,
            image: meta.assets.image,
            location: meta.assets.location,
            valuation: meta.assets.valuation,
            tokens: meta.assets.tokens,
            apr: meta.assets.apr,
            description: meta.assets.description,
            staking: meta.assets.staking,
          },
        }
      })
      .filter(Boolean)

    if (!items || !items.length)
      throw new ThrowableDalError({ type: "no-data" })

    return { items }
  })
}

export const getApts = (stxAddress: string) =>
  unstable_cache(getAptsCore, ["apts-data", stxAddress], {
    tags: ["apts", `${stxAddress}`],
    revalidate: env.NODE_ENV === "test" ? 0 : 3600,
  })(stxAddress)
