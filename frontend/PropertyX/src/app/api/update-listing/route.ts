import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TUpdateListingPayload } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { and, eq } from "drizzle-orm"
import { revalidatePath, revalidateTag } from "next/cache"
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
    console.log("Transactions in update listing:", debugConsole(transactions))
    const processedValues = processRouteTransactions<TUpdateListingPayload>({
      transactions,
    })
    console.log(
      "Processed update listing payload: ",
      debugConsole(processedValues)
    )
    if (processedValues.length === 0) {
      return new Response("No valid update listing transactions found", {
        status: 400,
      })
    }

    const valid = processedValues.filter(
      (v) =>
        typeof v["listing-id"] === "number" &&
        typeof v.maker === "string" &&
        typeof v["new-amt"] === "number" &&
        typeof v["old-amt"] === "number" &&
        typeof v["new-expiry"] === "number" &&
        typeof v["new-price"] === "number" &&
        typeof v.topic === "string" &&
        v.topic.toLowerCase().includes("update")
    )

    if (valid.length === 0) {
      return new Response("No valid update listing entries after validation", {
        status: 400,
      })
    }

    const dedupedMap = new Map<number, TUpdateListingPayload>()
    for (const v of valid) {
      dedupedMap.set(v["listing-id"], v)
    }
    const deduped = Array.from(dedupedMap.values())

    const operations = deduped.map((v) =>
      db
        .update(listings)
        .set({
          amount: convertAmount(v["new-amt"], "from-u6"),
          expiry: v["new-expiry"],
          price: v["new-price"],
        })
        .where(
          and(
            eq(listings.listingId, v["listing-id"]),
            eq(listings.maker, v.maker)
          )
        )
    )

    await Promise.all(operations)

    revalidateTag("listings")
    revalidateTag("ft-balances")
    revalidateTag("apts")
    revalidatePath("/your-listings")

    return new Response("Update listing successful", { status: 200 })
  } catch (error) {
    return new Response("Internal server error", { status: 500 })
  }
}
