import { getListings, getListingsCore } from "@/db/actions/listing"
import { getWalletAddress } from "@/db/actions/wallet"
import { dalFormatErrorMessage, dalVerifySuccess } from "@/db/helpers"
import React from "react"
import { Button } from "@/components/ui/button"
import EmptyWallet from "@/components/common/empty-wallet"
import HandleError from "@/components/common/handle-error"

import EmptyListing from "../_components/empty-listing"
import ListingCard from "../_components/listing-card"
import { ViewDetailsDialog } from "../_components/view-details-dialog"
import { CancelListingAlert } from "./_components/cancel-listing-alert"
import { UpdateListingDialog } from "./_components/update-listing-dialog"

async function ListingsContent() {
  const stxAddress = await getWalletAddress()
  if (!stxAddress) {
    return <EmptyWallet />
  }
  const res = await getListings("your-listings", stxAddress)

  if (!res.success && res.error?.type) {
    return (
      <HandleError
        error={res.error.type}
        empty={<EmptyListing href="/explore" label="Explore Marketplace" />}
      />
    )
  }

  const listings = dalVerifySuccess(res)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Listings</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <ListingCard key={listing.listingId} listing={listing}>
            <div className="flex w-full flex-col gap-4">
              <div className="flex gap-2">
                <UpdateListingDialog listing={listing} />
                <CancelListingAlert listing={listing} />
              </div>

              <ViewDetailsDialog listing={listing}>
                <Button className="flex-1" variant={"outline"}>
                  View Details
                </Button>
              </ViewDetailsDialog>
            </div>
          </ListingCard>
        ))}
      </div>
    </div>
  )
}

export default function Page() {
  return <ListingsContent />
}
