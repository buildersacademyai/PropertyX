"use client"

import { updateListing } from "@/services/mutation-options"
import { updateListingSchema } from "@/services/schema"
import { TMarketplaceListing, TUpdateListingSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useMemo, useState } from "react"
import { useBlockHeight } from "@/hooks/use-block-height"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface UpdateListingDialogProps {
  listing: TMarketplaceListing
}

export function UpdateListingDialog({ listing }: UpdateListingDialogProps) {
  const [open, setOpen] = useState(false)
  const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

  const form = useForm<TUpdateListingSchema>({
    resolver: zodResolver(updateListingSchema),
    defaultValues: {
      price: listing.price,
      amount: listing.amount,
      expiry: "20927",
    },
  })

  const initialValues = useMemo(
    () => ({
      price: listing.price,
      amount: listing.amount,
      expiry: String(listing.expiry),
    }),
    [listing.price, listing.amount, listing.expiry]
  )

  const mutation = useMutation({
    ...updateListing(),
    onSuccess: () => {
      toast.success("Listing updated successfully")
      setOpen(false)
    },
    onError: (error: any) => {
      toast.error(`Error updating listing: ${error.message}`)
    },
  })

  function onSubmit(values: TUpdateListingSchema) {
    const hasChanges =
      Number(values.price) !== Number(initialValues.price) ||
      Number(values.amount) !== Number(initialValues.amount) ||
      String(values.expiry) !== String(initialValues.expiry)

    if (!hasChanges) {
      toast.error("No changes made to update")
      return
    }
    if (!isSuccessBlockHeight || !currentBlockHeight) {
      return toast.error("Unable to fetch current block height")
    }
    mutation.mutate({
      currentBlockHeight,
      listingId: listing.listingId,
      contract: listing.contract,
      ...values,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1" variant="secondary">
          Update Listing
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Listing</DialogTitle>
          <DialogDescription>
            Modify the selected fields to update your listing.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent defaultValue={field.value}>
                      <SelectItem value="20927">7 Days</SelectItem>
                      <SelectItem value="41855">14 Days</SelectItem>
                      <SelectItem value="89689">30 Days</SelectItem>
                      <SelectItem value="179377">60 Days</SelectItem>
                      <SelectItem value="269066">90 Days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => setOpen(false)}
                disabled={mutation.status === "pending"}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={mutation.status === "pending"}
              >
                {mutation.status === "pending" ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
