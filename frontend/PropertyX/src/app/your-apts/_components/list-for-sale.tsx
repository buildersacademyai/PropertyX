"use client"

import { useWallet } from "@/providers/wallet-provider"
import { listAptForSale } from "@/services/mutation-options"
import { getBlockHeight } from "@/services/query-options"
import { listForSaleSchema } from "@/services/schema"
import { TListForSaleSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import { useRouter } from "next/navigation"
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

type Props = {
  contract: string
  balance: number
}

export function ListForSaleDialog({ contract, balance }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

  const form = useForm<TListForSaleSchema>({
    resolver: zodResolver(listForSaleSchema),
    defaultValues: {
      paymentAsset: "STX",
      listingDuration: "20927",
      targetBuyer: "",
    },
  })

  const listAptMutation = useMutation({
    ...listAptForSale(),
    onSuccess: () => {
      form.reset()
      setOpen(false)
      router.refresh()
      toast.success("Apt listed for sale successfully")
    },
    onError: (error) => {
      toast.error(`Error listing apt for sale: ${error.message}`)
    },
  })

  async function onSubmit(values: TListForSaleSchema) {
    if (!contract) return toast.error("Missing asset contract")
    if (values.amount > Number(balance)) {
      form.setError("amount", {
        type: "manual",
        message: `Amount cannot exceed the value ${balance}`,
      })
      return
    }
    if (!isSuccessBlockHeight || !currentBlockHeight) {
      toast.error("Unable to fetch current block height")
      return
    }
    listAptMutation.mutate({
      currentBlockHeight,
      ...values,
      contract,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex-1">List for Sale</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>List for Sale</DialogTitle>
          <DialogDescription>
            Set your listing details and publish.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="listingPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Price</FormLabel>
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

            <div className="grid gap-2">
              <label className="text-sm font-medium">
                FT Asset Contract Address
              </label>
              <Input
                className="bg-muted text-muted-foreground"
                type="text"
                disabled
                value={contract}
                readOnly
              />
            </div>

            <FormField
              control={form.control}
              name="paymentAsset"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Payment Asset</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select payment asset" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STX">STX</SelectItem>
                      <SelectItem value="SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token">
                        SBTC
                      </SelectItem>
                      <SelectItem value="SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1">
                        USDC
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listingDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Listing Duration</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
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

            <FormField
              control={form.control}
              name="targetBuyer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target Buyer (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Stacks address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                className="flex-1"
                loading={listAptMutation.isPending}
              >
                List Apt
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
