"use client"

import { fulfillStx } from "@/services/mutation-options"
import { buyListingSchema } from "@/services/schema"
import { TBuyListingSchema, TMarketplaceListing } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface BuyNowDialogProps {
  listing: TMarketplaceListing
  children: React.ReactNode
  disabled?: boolean
}

export function BuyNowDialog({
  listing,
  children,
  disabled,
}: BuyNowDialogProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const form = useForm<TBuyListingSchema>({
    resolver: zodResolver(buyListingSchema),
  })

  const buyListingMutation = useMutation({
    ...fulfillStx(),
    onSuccess: () => {
      form.reset()
      setOpen(false)
      router.refresh()
      toast.success("Successfully purchased listing!")
    },
    onError: (error) => {
      toast.error(`Error purchasing listing: ${error.message}`)
    },
  })

  const onSubmit = async (values: TBuyListingSchema) => {
    if (!listing.contract) return toast.error("Missing asset contract")
    if (values.amount > Number(listing.amount)) {
      form.setError("amount", {
        type: "manual",
        message: `Amount cannot exceed the value ${listing.amount}`,
      })
      return
    }
    buyListingMutation.mutate({
      listingId: listing.listingId,
      contract: listing.contract,
      amount: values.amount,
    })
  }

  const watchedAmount = form.watch("amount")
  const totalCost = (watchedAmount || 0) * listing.price

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild disabled={disabled}>
        {children}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy {listing.assetName}</DialogTitle>
          <DialogDescription>
            Enter the amount of tokens you want to purchase. Current price:{" "}
            {listing.price} tokens each.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {totalCost > 0 && (
              <div className="rounded-lg bg-muted p-3">
                <div className="flex justify-between text-sm">
                  <span>Total Cost:</span>
                  <span className="font-semibold">{totalCost} tokens</span>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={buyListingMutation.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" loading={buyListingMutation.isPending}>
                Buy Now
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
