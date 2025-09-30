"use client"

import { cancelListing } from "@/services/mutation-options"
import { TMarketplaceListing } from "@/services/type"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface CancelListingAlertProps {
  listing: TMarketplaceListing
}

export function CancelListingAlert({ listing }: CancelListingAlertProps) {
  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    ...cancelListing(),
    onSuccess: () => {
      toast.success("Listing cancelled successfully")
      setOpen(false)
    },
    onError: (error: any) => {
      toast.error(`Error cancelling listing: ${error.message}`)
    },
  })

  function onConfirm() {
    mutation.mutate({
      listingId: listing.listingId,
      contract: listing.contract,
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex-1" variant="destructive">
          Cancel Listing
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Listing</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel this listing? This action cannot be
            undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={mutation.status === "pending"}>
            Close
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} asChild>
            <Button variant={"secondary"} loading={mutation.isPending}>
              Confirm
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
