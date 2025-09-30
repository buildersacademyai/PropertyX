import { db } from "@/db/drizzle"
import { listings } from "@/db/schema"
import { TListingSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { revalidateTag } from "next/cache"
import { convertAmount, processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    const processedValues = processRouteTransactions<TListingSchema>({
      transactions,
    })
    if (processedValues.length === 0) {
      return new Response("No valid listing transactions found", {
        status: 400,
      })
    }

    await db.insert(listings).values(
      processedValues
        .filter((v) => v["asset-contract"])
        .map((values) => ({
          amount: convertAmount(values.amount),
          assetContract: values["asset-contract"],
          expiry: values.expiry,
          listingId: values["listing-id"],
          maker: values.maker,
          paymentAssetContract: values["payment-asset-contract"],
          price: values.price,
          taker: values.taker,
          topic: values.topic,
        }))
    )

    revalidateTag("listings")
    revalidateTag("ft-balances")
    revalidateTag("apts")

    return new Response("Listing successful", { status: 200 })
  } catch (error) {
    console.error("Error processing listing:", error)
    return new Response("Internal server error", { status: 500 })
  }
}
