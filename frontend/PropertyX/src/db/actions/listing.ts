import { eq } from "drizzle-orm"
import { unstable_cache } from "next/cache"
import { env } from "@/lib/config/env"

import { db } from "../drizzle"
import { dalDbOperation } from "../helpers"
import { assets, listings, tcoins, whiteListing } from "../schema"
import { ThrowableDalError } from "../type"

export async function getListingsCore(
  type: "your-listings" | "explore",
  stxAddress: string
) {
  return dalDbOperation(async () => {
    const listingsData = await db
      .select()
      .from(listings)
      .innerJoin(
        whiteListing,
        eq(listings.assetContract, whiteListing.whitelisted)
      )
      .innerJoin(tcoins, eq(listings.assetContract, tcoins.contract))
      .innerJoin(assets, eq(tcoins.assetId, assets.id))

    if (listingsData.length === 0) {
      throw new ThrowableDalError({ type: "no-data" })
    }

    const finalListings = listingsData.map((listing) => ({
      listingId: listing.listings.listingId,
      amount: listing.listings.amount,
      expiry: listing.listings.expiry,
      maker: listing.listings.maker,
      paymentAssetContract: listing.listings.paymentAssetContract,
      price: listing.listings.price,
      taker: listing.listings.taker,
      topic: listing.listings.topic,
      contract: listing.listings.assetContract,
      name: listing.tcoins.name,
      description: listing.tcoins.description,
      image: listing.tcoins.image,
      assetName: listing.assets.name,
      assetImage: listing.assets.image,
      assetLocation: listing.assets.location,
      assetValuation: listing.assets.valuation,
      assetTokens: listing.assets.tokens,
      assetApr: listing.assets.apr,
      assetDescription: listing.assets.description,
      assetStaking: listing.assets.staking,
    }))

    const yourListings = finalListings.filter((l) => {
      return l.maker === stxAddress
    })

    const exploreListings = finalListings.filter((l) => {
      return l.maker !== stxAddress
    })

    if (type === "your-listings" && yourListings.length === 0) {
      throw new ThrowableDalError({ type: "no-data" })
    }
    if (type === "explore" && exploreListings.length === 0) {
      throw new ThrowableDalError({ type: "no-data" })
    }

    return type === "your-listings" ? yourListings : exploreListings
  })
}

export const getListings = unstable_cache(getListingsCore, ["listing-data"], {
  tags: ["listings"],
  revalidate: env.NODE_ENV === "test" ? 0 : 3600,
})
