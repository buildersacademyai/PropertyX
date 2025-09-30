import { z } from "zod"

const amountSchema = z.object({
  amount: z.coerce.number().min(1, "Amount must be at least 1"),
})

export const listForSaleSchema = amountSchema.extend({
  listingPrice: z.coerce.number().min(1, "Listing price must be at least 1"),
  paymentAsset: z.string(),
  listingDuration: z.enum(["20927", "41855", "89689", "179377", "269066"]),
  targetBuyer: z.string().optional(),
})

export const whitelistContractSchema = z.object({
  whitelisted: z
    .string()
    .min(1, "Contract address is required")
    .regex(
      /^[a-zA-Z0-9]+\.{1}[a-zA-Z0-9_-]+$/,
      "Contract address must be in the format: address.contractName"
    ),
  isWhitelisted: z.boolean({
    required_error: "Whitelisted status is required",
  }),
})

export const marketplaceSchema = z.object({
  principal: z.string().min(1, "Principal is required"),
  role: z.enum(["admin", "fulfill"] as const),
})

export const buyListingSchema = amountSchema

export const assetRequestSchema = z.object({
  assetType: z.string().min(1, "Select an asset type"),
  assetName: z
    .string()
    .min(3, "Asset name must be at least 3 characters")
    .max(100, "Asset name must be at most 100 characters"),
  tokenSymbol: z
    .string()
    .min(1, "Token symbol required")
    .max(6, "Max 6 characters")
    .transform((val) => val.toUpperCase()),
  location: z.string().optional().or(z.literal("")),
  description: z
    .string()
    .max(500, "Max 500 characters")
    .optional()
    .or(z.literal("")),
  tokenSupply: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => !isNaN(val), { message: "Enter a valid number" })
    .pipe(z.number().min(1, "Supply must be at least 1")),
  initialOffering: z
    .union([z.number(), z.string()])
    .transform((val) => (typeof val === "string" ? Number(val) : val))
    .refine((val) => !isNaN(val), { message: "Enter a valid number" })
    .pipe(z.number().min(1, "Min 1%").max(100, "Cannot exceed 100%")),
  terms: z
    .boolean({ required_error: "You must agree to terms" })
    .refine((val) => val, { message: "You must agree to terms" }),
})

export const updateListingSchema = amountSchema
  .extend({
    price: z.coerce.number().min(1, "New price must be at least 1"),
    expiry: z.enum(["20927", "41855", "89689", "179377", "269066"]),
  })
  .partial()

export const stakeSchema = amountSchema
  .extend({
    expiry: updateListingSchema.shape.expiry,
  })
  .required()

export const unstakeSchema = amountSchema
