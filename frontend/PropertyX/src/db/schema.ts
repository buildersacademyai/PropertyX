import { boolean, integer, pgTable, serial, text } from "drizzle-orm/pg-core"

export const whiteListing = pgTable("whitelisting", {
  whitelisted: text("whitelisted").primaryKey(),
  isWhitelisted: boolean("is_whitelisted").notNull(),
})

export const assets = pgTable("assets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  image: text("image").notNull(),
  location: text("location").notNull(),
  valuation: text("valuation").notNull(),
  tokens: text("tokens").notNull(),
  apr: text("apr").notNull(),
  description: text("description").notNull(),
  staking: text("staking").notNull(),
})

export const tcoins = pgTable("tcoins", {
  contract: text("contract")
    .primaryKey()
    .references(() => whiteListing.whitelisted),
  name: text("name").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  assetId: integer("asset_id")
    .references(() => assets.id)
    .notNull(),
})

export const listings = pgTable("listings", {
  listingId: serial("listing_id").primaryKey(),
  assetContract: text("asset_contract")
    .notNull()
    .references(() => whiteListing.whitelisted),
  amount: integer("amount").notNull(),
  expiry: integer("expiry").notNull(),
  maker: text("maker").notNull(),
  paymentAssetContract: text("payment_asset_contract"),
  price: integer("price").notNull(),
  taker: text("taker"),
  topic: text("topic").notNull(),
})
