import { TMarketplaceListing } from "@/services/type"
import React from "react"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ListingCardProps {
  listing: TMarketplaceListing
  children?: React.ReactNode
}

export function ListingCard({ listing, children }: ListingCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="relative mb-3 aspect-video overflow-hidden rounded-lg">
          <Image
            src={listing.assetImage}
            alt={listing.assetName}
            fill
            className="object-contain"
          />
        </div>
        <CardTitle className="line-clamp-2">{listing.assetName}</CardTitle>
        <CardDescription className="line-clamp-2">
          {listing.name} • {listing.assetLocation}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-semibold">{listing.price}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Amount</p>
            <p className="font-semibold">{listing.amount}</p>
          </div>
          <div>
            <p className="text-muted-foreground">APR</p>
            <p className="font-semibold">{listing.assetApr}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Tokens</p>
            <p className={"font-semibold"}>{listing.assetTokens}</p>
          </div>
        </div>
      </CardContent>

      {children ? (
        <CardFooter className="flex gap-2 pt-3">{children}</CardFooter>
      ) : null}
    </Card>
  )
}

export default ListingCard
