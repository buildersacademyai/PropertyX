"use client"

import { assetRequestSchema } from "@/services/schema"
import { TAssetRequestSchema } from "@/services/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
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
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Icons } from "@/components/common/icons"

const ASSET_TYPES = [
  { value: "real-estate", label: "Real Estate" },
  { value: "rental", label: "Rental" },
  { value: "commercial", label: "Commercial" },
  { value: "other", label: "Other" },
]

export default function RequestAssetPage() {
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<TAssetRequestSchema>({
    resolver: zodResolver(assetRequestSchema),
    defaultValues: {
      assetType: "",
      assetName: "",
      tokenSymbol: "",
      location: "",
      description: "",
      tokenSupply: undefined as unknown as number,
      initialOffering: undefined as unknown as number,
      terms: false,
    },
    mode: "onBlur",
  })

  function onSubmit(values: TAssetRequestSchema) {
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      toast.success("Asset request submitted", {
        description: `${values.assetName} (${values.tokenSymbol}) submitted successfully.`,
      })
      setSubmitting(false)
      form.reset()
    }, 900)
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Request New Asset
          </h1>
          <p className="text-sm text-muted-foreground">
            Provide details to tokenize and list a new asset on the marketplace.
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="gap-1.5">
          <Link href="/profile" aria-label="Back to profile">
            <span className="-ml-1 inline-flex rotate-180">
              <Icons.arrowRight className="size-4" />
            </span>
            Back
          </Link>
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Step 1 */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Step 1 – Asset Details</CardTitle>
              <CardDescription>
                Fundamental information about the asset.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="assetType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            {ASSET_TYPES.map((t) => (
                              <SelectItem key={t.value} value={t.value}>
                                {t.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="assetName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Asset Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Sunrise Apartments"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tokenSymbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token Symbol</FormLabel>
                      <FormControl>
                        <Input
                          maxLength={6}
                          placeholder="e.g. SUNRS"
                          {...field}
                          onChange={(e) =>
                            field.onChange(e.target.value.toUpperCase())
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="City, Country" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-4 grid gap-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief overview (max 500 chars)"
                          maxLength={500}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Asset Images Placeholder */}
                <div className="grid gap-2">
                  <div className="text-sm font-medium">Asset Images</div>
                  <div
                    className="flex h-40 w-full items-center justify-center
                      rounded-md border border-dashed border-border bg-muted/30
                      text-muted-foreground"
                    role="group"
                    aria-label="Asset images upload placeholder"
                  >
                    <div
                      className="flex flex-col items-center text-center text-xs"
                    >
                      <Icons.download className="mb-2 size-5 opacity-60" />
                      Drag & Drop or Click to Upload
                      <span
                        className="mt-1 text-[10px] text-muted-foreground/70"
                      >
                        PNG, JPG up to 5MB (UI only)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 2 */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Step 2 – Valuation</CardTitle>
              <CardDescription>
                Financial metrics (coming soon – disabled).
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Total Asset Valuation (USD)
                  </label>
                  <Input type="number" disabled placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Annual Revenue (USD)
                  </label>
                  <Input type="number" disabled placeholder="0" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">
                    Annual Net Profit (USD)
                  </label>
                  <Input type="number" disabled placeholder="0" />
                </div>
              </div>
              <div className="mt-8 grid gap-2">
                <div className="text-sm font-medium">Valuation Documents</div>
                <div
                  className="flex h-32 w-full items-center justify-center
                    rounded-md border border-dashed border-border bg-muted/30
                    text-muted-foreground"
                  role="group"
                  aria-label="Valuation documents upload placeholder"
                >
                  <div
                    className="flex flex-col items-center text-center text-xs"
                  >
                    <Icons.download className="mb-2 size-5 opacity-60" />
                    Drag & Drop PDFs (UI only)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Step 3 */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Step 3 – Token Setup</CardTitle>
              <CardDescription>
                Define supply and public offering.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tokenSupply"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>APT Token Supply</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          placeholder="100000"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="initialOffering"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Initial Offering Percentage (%)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1}
                          max={100}
                          placeholder="10"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Step 4 */}
          <Card>
            <CardHeader className="pb-0">
              <CardTitle>Step 4 – Review & Agreement</CardTitle>
              <CardDescription>
                Acknowledge the terms before submitting.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem>
                    <div
                      className="flex items-start gap-3 rounded-md border p-4"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={(val) =>
                            field.onChange(Boolean(val))
                          }
                        />
                      </FormControl>
                      <div className="space-y-1 leading-snug">
                        <FormLabel className="font-medium">
                          I agree to the platform terms
                        </FormLabel>
                        <p className="max-w-xl text-xs text-muted-foreground">
                          I confirm that the information provided is accurate
                          and I have the rights to request tokenization for this
                          asset. I understand this submission is subject to
                          review and approval.
                        </p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end">
                <Button type="submit" loading={submitting} className="px-8">
                  Submit Asset
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
}
