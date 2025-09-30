import { db } from "@/db/drizzle"
import { assets, tcoins, whiteListing } from "@/db/schema"
import { ApiService } from "@/services/api"
import { TCoinSchema, TWhitelistContractSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { fetchCallReadOnlyFunction } from "@stacks/transactions"
import { eq, inArray } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import { env } from "@/lib/config/env"
import { processRouteTransactions } from "@/lib/utils"

async function saveTokenAndAssetData(contract: string, tokenData: TCoinSchema) {
  try {
    const [savedAsset] = await db
      .insert(assets)
      .values({
        name: tokenData.asset.name,
        image: tokenData.asset.image,
        location: tokenData.asset.location,
        valuation: tokenData.asset.valuation,
        tokens: tokenData.asset.tokens,
        apr: tokenData.asset.apr,
        description: tokenData.asset.description,
        staking: tokenData.asset.staking,
      })
      .returning({ id: assets.id })

    if (!savedAsset) {
      throw new Error("Failed to save asset data")
    }

    await db
      .insert(tcoins)
      .values({
        contract: contract,
        name: tokenData.name,
        description: tokenData.description,
        image: tokenData.image,
        assetId: savedAsset.id,
      })
      .onConflictDoUpdate({
        target: tcoins.contract,
        set: {
          name: tokenData.name,
          description: tokenData.description,
          image: tokenData.image,
          assetId: savedAsset.id,
        },
      })

    console.log(`Successfully saved token and asset data for ${contract}`)
  } catch (error) {
    console.error(`Error saving token and asset data for ${contract}:`, error)
    throw error
  }
}

async function processTokenUri(contract: string): Promise<boolean> {
  try {
    const contractParts = contract.split(".")

    if (contractParts.length !== 2) {
      console.warn(`Invalid contract format: ${contract}`)
      return false
    }

    const getTokenUri = await fetchCallReadOnlyFunction({
      contractAddress: contractParts[0],
      contractName: contractParts[1],
      functionName: "get-token-uri",
      functionArgs: [],
      senderAddress: env.CONTRACT_ADDRESS,
      network: env.NETWORK,
    })

    if (getTokenUri.type !== "ok") {
      console.warn(`Token URI call failed for ${contract}`)
      return false
    }

    const tokenType =
      getTokenUri.value.type === "some" && getTokenUri.value.value
    const tokenUri =
      tokenType && tokenType.type === "utf8" ? tokenType.value : null

    if (!tokenUri) {
      console.warn(`No valid token URI found for ${contract}`)
      return false
    }

    const tokenData = await ApiService.getTestCoin(tokenUri)

    if (!tokenData || !tokenData.asset) {
      console.warn(`Invalid token data structure for ${contract}`)
      return false
    }
    console.log(`Fetched token data for ${contract}:`, tokenData)
    await saveTokenAndAssetData(contract, tokenData)
    return true
  } catch (error) {
    console.error(`Error processing token URI for ${contract}:`, error)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TWhitelistContractSchema>({
      transactions,
    })

    const validValues = processedValues.filter((v) => v !== null)

    if (validValues.length === 0) {
      return new Response("No valid transactions to process", { status: 200 })
    }

    const whitelistedAddresses = validValues.map((v) => v.whitelisted)
    const existingRecords = await db
      .select()
      .from(whiteListing)
      .where(inArray(whiteListing.whitelisted, whitelistedAddresses))

    const existingMap = new Map(
      existingRecords.map((record) => [record.whitelisted, record])
    )

    const toUpdate: Array<{ whitelisted: string; isWhitelisted: boolean }> = []
    const toInsert: Array<{ whitelisted: string; isWhitelisted: boolean }> = []

    for (const value of validValues) {
      const existing = existingMap.get(value.whitelisted)

      if (!existing && !value.isWhitelisted) {
        continue
      }

      if (existing && existing.isWhitelisted !== value.isWhitelisted) {
        toUpdate.push({
          whitelisted: value.whitelisted,
          isWhitelisted: value.isWhitelisted,
        })
      } else if (value.isWhitelisted && !existing) {
        toInsert.push({
          whitelisted: value.whitelisted,
          isWhitelisted: value.isWhitelisted,
        })
      }
    }

    if (toUpdate.length > 0) {
      await Promise.allSettled(
        toUpdate.map((item) =>
          db
            .update(whiteListing)
            .set({ isWhitelisted: item.isWhitelisted })
            .where(eq(whiteListing.whitelisted, item.whitelisted))
        )
      )
    }

    if (toInsert.length > 0) {
      await db.insert(whiteListing).values(toInsert).onConflictDoNothing()

      await Promise.allSettled(
        toInsert.map((item) => processTokenUri(item.whitelisted))
      )
    }

    revalidateTag("apts")
    revalidateTag("ft-balances")

    return new Response(
      JSON.stringify({
        message: "Processing completed successfully",
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
