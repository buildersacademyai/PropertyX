"use client"

import { TMarketplaceListing } from "@/services/type"
import React, { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface ViewDetailsDialogProps {
  listing: TMarketplaceListing
  children: React.ReactNode
}

export function ViewDetailsDialog({
  listing,
  children,
}: ViewDetailsDialogProps) {
  const [open, setOpen] = useState(false)
  const expiryDate = new Date(listing.expiry * 1000)
  const isExpired = listing.expiry * 1000 < Date.now()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{listing.assetName}</DialogTitle>
          <DialogDescription>
            Detailed information about this listing
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={listing.assetImage}
              alt={listing.assetName}
              fill
              className="object-contain"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 font-semibold">Contract Details</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Name: </span>
                  <span>{listing.name}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Contract: </span>
                  <span className="font-mono text-xs break-all">
                    {listing.contract}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Listing Info</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Listing ID: </span>
                  <span>{listing.listingId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Maker: </span>
                  <span className="font-mono text-xs break-all">
                    {listing.maker}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Topic: </span>
                  <span>{listing.topic}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Asset Details */}
          <div>
            <h3 className="mb-3 font-semibold">Asset Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Location: </span>
                <span>{listing.assetLocation}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Valuation: </span>
                <span className="font-semibold">{listing.assetValuation}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Total Tokens: </span>
                <span>{listing.assetTokens}</span>
              </div>
              <div>
                <span className="text-muted-foreground">APR: </span>
                <span className="font-semibold text-green-600">
                  {listing.assetApr}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Staking: </span>
                <span>{listing.assetStaking}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Trading Details */}
          <div>
            <h3 className="mb-3 font-semibold">Trading Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Price per Token: </span>
                <span className="font-semibold">{listing.price} tokens</span>
              </div>
              <div>
                <span className="text-muted-foreground">
                  Available Amount:{" "}
                </span>
                <span>{listing.amount}</span>
              </div>
              <div className="col-span-2">
                <span className="text-muted-foreground">Expires: </span>
                <span
                  className={isExpired ? "font-semibold text-destructive" : ""}
                >
                  {expiryDate.toLocaleDateString()} at{" "}
                  {expiryDate.toLocaleTimeString()}
                </span>
                {isExpired && (
                  <Badge variant="destructive" className="ml-2">
                    Expired
                  </Badge>
                )}
              </div>
              {listing.paymentAssetContract && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Payment Asset: </span>
                  <span className="font-mono text-xs break-all">
                    {listing.paymentAssetContract}
                  </span>
                </div>
              )}
              {listing.taker && (
                <div className="col-span-2">
                  <span className="text-muted-foreground">Taker: </span>
                  <span className="font-mono text-xs break-all">
                    {listing.taker}
                  </span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">Asset Description</h3>
              <p className="text-sm text-muted-foreground">
                {listing.assetDescription}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">Contract Description</h3>
              <p className="text-sm text-muted-foreground">
                {listing.description}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
