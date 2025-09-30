"use client"

import { whitelistContract } from "@/services/mutation-options"
import { marketplaceSchema, whitelistContractSchema } from "@/services/schema"
import { TMarketplaceSchema, TWhitelistContractSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const Admin = () => {
  const whitelistForm = useForm<TWhitelistContractSchema>({
    resolver: zodResolver(whitelistContractSchema),
    defaultValues: { whitelisted: "", isWhitelisted: true },
    mode: "onChange",
  })

  const marketplaceForm = useForm<TMarketplaceSchema>({
    resolver: zodResolver(marketplaceSchema),
    defaultValues: { principal: "", role: "admin" },
    mode: "onChange",
  })

  const whitelistMutation = useMutation({
    ...whitelistContract(),
    onSuccess: () => {
      whitelistForm.reset()
      toast.success("Contract whitelist status updated successfully")
    },
    onError: (error) => {
      toast.error(`Error updating whitelist status: ${error.message}`)
    },
  })

  const onSubmitWhitelist = async (values: TWhitelistContractSchema) => {
    whitelistMutation.mutate({
      whitelisted: values.whitelisted,
      isWhitelisted: values.isWhitelisted,
    })
  }

  const onSubmitMarketplace = (values: TMarketplaceSchema) => {
    console.log("Marketplace update submit", values)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Whitelist Token Contract
          </CardTitle>
          <CardDescription>
            Make the given contract address whitelist for the PropertyX
            ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...whitelistForm}>
            <form
              onSubmit={whitelistForm.handleSubmit(onSubmitWhitelist)}
              className="grid gap-4"
            >
              <FormField
                control={whitelistForm.control}
                name="whitelisted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contract Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contract address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={whitelistForm.control}
                name="isWhitelisted"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Is Whitelisted</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid grid-cols-2 gap-3"
                        value={field.value.toString()}
                        onValueChange={(val) => field.onChange(val === "true")}
                      >
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="true" /> True
                        </label>
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="false" /> False
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" loading={whitelistMutation.isPending}>
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {/* Update Marketplace Contract */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">
            Update Marketplace Contract
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <Form {...marketplaceForm}>
            <form
              onSubmit={marketplaceForm.handleSubmit(onSubmitMarketplace)}
              className="grid gap-4"
            >
              <FormField
                control={marketplaceForm.control}
                name="principal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Principal</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter principal address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={marketplaceForm.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <RadioGroup
                        className="grid grid-cols-2 gap-3"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="admin" /> Admin
                        </label>
                        <label
                          className="inline-flex items-center gap-2 text-sm"
                        >
                          <RadioGroupItem value="fulfill" /> Fulfill
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit">Update</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Admin
