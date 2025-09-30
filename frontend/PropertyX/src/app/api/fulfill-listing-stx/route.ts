import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TFtStxBuyPayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { eq } from "drizzle-orm"
import { revalidateTag } from "next/cache"
import {
  convertAmount,
  debugConsole,
  processRouteTransactions,
} from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    console.log(
      "Transactions received stx fulfill:",
      debugConsole(transactions)
    )
    const processedValues = processRouteTransactions<TFtStxBuyPayload>({
      transactions,
    })
    console.log("Processed values stx fulfill:", debugConsole(processedValues))
    if (processedValues.length === 0) {
      return new Response("No valid listing transactions found", {
        status: 400,
      })
    }

    const ops = processedValues
      .filter(
        (v) =>
          typeof v["listing-id"] === "number" &&
          typeof v["remaining-amt"] === "number"
      )
      .map((v) => {
        const listingId = v["listing-id"]
        const remaining = v["remaining-amt"]

        if (remaining === 0) {
          return db.delete(listings).where(eq(listings.listingId, listingId))
        }

        return db
          .update(listings)
          .set({ amount: convertAmount(remaining) })
          .where(eq(listings.listingId, listingId))
      })

    await Promise.all(ops)

    revalidateTag("listings")
    revalidateTag("ft-balances")
    revalidateTag("apts")

    return new Response("Token Buy successful", { status: 200 })
  } catch (error) {
    console.error("Error processing token buy:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
