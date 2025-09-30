"use client"

import { stakeApt, unstakeApt } from "@/services/mutation-options"
import { stakeSchema, unstakeSchema } from "@/services/schema"
import {
  TStakeApt,
  TStakeAptSchema,
  TUnstakeApt,
  TUnstakeAptSchema,
} from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useBlockHeight } from "@/hooks/use-block-height"
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

type Variant = "stake" | "unstake"

interface Props {
  contract: string
  balance: number
  variant: Variant
}

type StakeFormValues = TStakeAptSchema & { kind: "stake" }
type UnstakeFormValues = TUnstakeAptSchema & { kind: "unstake" }
type FormValues = StakeFormValues | UnstakeFormValues

export function StakeUnstakeDialog({ contract, balance, variant }: Props) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { currentBlockHeight, isSuccessBlockHeight } = useBlockHeight()

  const isStake = variant === "stake"

  const form = useForm<FormValues>({
    resolver: zodResolver(
      isStake
        ? stakeSchema.extend({ kind: z.literal("stake") })
        : unstakeSchema.extend({ kind: z.literal("unstake") })
    ),
    defaultValues: isStake
      ? { amount: undefined, expiry: undefined, kind: "stake" }
      : { amount: undefined, kind: "unstake" },
  })

  const stakeMutation = useMutation({
    ...stakeApt(),
    onSuccess: () => {
      toast.success("APT staked successfully")
      form.reset()
      setOpen(false)
      router.refresh()
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to stake APT")
    },
  })

  const unstakeMutation = useMutation({
    ...unstakeApt(),
    onSuccess: () => {
      toast.success("APT unstaked successfully")
      form.reset()
      setOpen(false)
      router.refresh()
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to unstake APT")
    },
  })

  function onSubmit(values: FormValues) {
    if (!contract) return toast.error("Missing contract address")
    if (!isSuccessBlockHeight || !currentBlockHeight) {
      return toast.error("Unable to fetch current block height")
    }

    if (values.amount > Number(balance)) {
      form.setError("amount" as any, {
        type: "manual",
        message: `Amount cannot exceed the value ${balance}`,
      })
      return
    }

    if (values.kind === "stake") {
      const payload: TStakeApt = {
        contract,
        currentBlockHeight,
        amount: Number(values.amount),
        expiry: values.expiry,
      }
      stakeMutation.mutate(payload)
    } else {
      const payload: TUnstakeApt = {
        contract,
        amount: Number(values.amount),
      }
      unstakeMutation.mutate(payload)
    }
  }

  const submitting = isStake
    ? stakeMutation.isPending
    : unstakeMutation.isPending

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="flex-1" variant={"outline"}>
          {isStake ? "Stake APT" : "Unstake APT"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isStake ? "Stake APT" : "Unstake APT"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isStake
              ? "Lock your APT tokens for yield until the chosen expiry block."
              : "Withdraw previously staked APT tokens."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-5 pt-2"
          >
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
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isStake && (
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
            )}

            <AlertDialogFooter className="pt-2">
              <AlertDialogCancel type="button">Cancel</AlertDialogCancel>
              <AlertDialogAction asChild>
                <Button type="submit" loading={submitting} className="min-w-28">
                  {isStake ? "Stake" : "Unstake"}
                </Button>
              </AlertDialogAction>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}
