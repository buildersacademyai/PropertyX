"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"
import { NextLink } from "@/components/common/next-link"

interface EmptyListingProps {
  href: string
  label: string
}

const EmptyListing = ({ href, label }: EmptyListingProps) => {
  return (
    <div className="flex w-full items-center justify-center py-24">
      <Card
        className="mx-auto flex w-full max-w-xl flex-col items-center gap-6
          rounded-xl border border-dashed p-10 text-center"
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full
            bg-accent/40"
        >
          <Icons.building className="text-muted-foreground" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            No listings right now
          </h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            There are currently no tokenized property listings available. Check
            back soon or list an asset if you&apos;re a property partner.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <NextLink href={href} className="flex-1">
            <Button className="w-full">{label}</Button>
          </NextLink>
        </div>
      </Card>
    </div>
  )
}
export default EmptyListing
