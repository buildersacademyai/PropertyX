import { getListings } from "@/db/actions/listing"
import { getWalletAddress } from "@/db/actions/wallet"
import { dalFormatErrorMessage, dalVerifySuccess } from "@/db/helpers"
import React from "react"
import { Button } from "@/components/ui/button"
import EmptyWallet from "@/components/common/empty-wallet"

import { BuyNowDialog } from "../_components/buy-now-dialog"
import EmptyExplore from "../_components/empty-listing"
import ListingCard from "../_components/listing-card"
import { ViewDetailsDialog } from "../_components/view-details-dialog"

const Page = async () => {
  const stxAddress = await getWalletAddress()
  if (!stxAddress) {
    return <EmptyWallet />
  }
  const res = await getListings("explore", stxAddress)

  if (!res.success) {
    if (res.error?.type === "no-data")
      return (
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
          <EmptyExplore href="/your-apts" label="Explore Apts" />
        </div>
      )

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
        <p className="text-sm text-destructive">
          {dalFormatErrorMessage(res.error)}
        </p>
      </div>
    )
  }

  const listings = dalVerifySuccess(res)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Marketplace Listings</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.listingId} listing={listing}>
            <BuyNowDialog listing={listing}>
              <Button className="flex-1">Buy Now</Button>
            </BuyNowDialog>
            <ViewDetailsDialog listing={listing}>
              <Button variant="outline" className="flex-1">
                View Details
              </Button>
            </ViewDetailsDialog>
          </ListingCard>
        ))}
      </div>
    </div>
  )
}

export default Page
