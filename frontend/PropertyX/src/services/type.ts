import { z } from "zod"
import { functionContractMap } from "@/lib/utils"

import {
  assetRequestSchema,
  buyListingSchema,
  listForSaleSchema,
  marketplaceSchema,
  stakeSchema,
  unstakeSchema,
  updateListingSchema,
  whitelistContractSchema,
} from "./schema"

export interface TBlockHeightResponse {
  server_version: string
  status: string
  pox_v1_unlock_height: number
  pox_v2_unlock_height: number
  pox_v3_unlock_height: number
  chain_tip: Chain_tip
}
interface Chain_tip {
  block_height: number
  block_hash: string
  index_block_hash: string
  burn_block_height: number
}
export interface TFtBalancesResponse {
  limit: number
  offset: number
  total: number
  results: ResultsItem[]
}
interface ResultsItem {
  token: `${string}.${string}::${string}`
  balance: string
}

export type TWhiteListedBalances = ResultsItem & {
  name: string
  contractAddress: string
  contractName: string
}

export interface TTestCoin {
  name: string
  description: string
  image: string
  asset: Asset
}
interface Asset {
  name: string
  image: string
  location: string
  valuation: string
  tokens: string
  apr: string
  description: string
  staking: string
}

export interface TListingSchema {
  amount: number
  "asset-contract": string
  expiry: number
  "listing-id": number
  maker: string
  "payment-asset-contract": null | string
  price: number
  taker: null | string
  topic: string
}

export interface TCoinSchema {
  name: string
  description: string
  image: string
  asset: Asset
}
interface Asset {
  name: string
  image: string
  location: string
  valuation: string
  tokens: string
  apr: string
  description: string
  staking: string
}

export interface TMarketplaceListing {
  listingId: number
  amount: number
  expiry: number
  maker: string
  paymentAssetContract: string | null
  price: number
  taker: string | null
  topic: string
  contract: string
  name: string
  description: string
  image: string
  assetName: string
  assetImage: string
  assetLocation: string
  assetValuation: string
  assetTokens: string
  assetApr: string
  assetDescription: string
  assetStaking: string
}

export interface TFtStxBuyPayload {
  amt: number
  buyer: string
  "fee-percentage": number
  "listing-id": number
  "remaining-amt": number
  seller: string
  topic: string
  "total-payment": number
  "tx-fee": number
}

export type TFunctionName = keyof typeof functionContractMap

export type TWhitelistContractSchema = z.infer<typeof whitelistContractSchema>
export type TMarketplaceSchema = z.infer<typeof marketplaceSchema>
export type TBuyListingSchema = z.infer<typeof buyListingSchema>
export type TListForSaleSchema = z.infer<typeof listForSaleSchema>
export type TAssetRequestSchema = z.infer<typeof assetRequestSchema>
export type TUpdateListingSchema = z.infer<typeof updateListingSchema>

type TListingContract = {
  listingId: number
  contract: string
}

export type TListSaleBlockHeight = TListForSaleSchema & {
  currentBlockHeight: number
  contract: string
}

export type TBuyListing = TBuyListingSchema & TListingContract

export type TUpdateListing = TUpdateListingSchema &
  TListingContract & {
    currentBlockHeight: number
  }

export type TCancelListing = TListingContract

export interface TCancelListingPayload {
  "ft-asset-contract": string
  "listing-id": number
  topic: string
}

export interface TUpdateListingPayload {
  "listing-id": number
  maker: string
  "new-amt": number
  "new-expiry": number
  "new-price": number
  "old-amt": number
  topic: string
}

export type TStakeAptSchema = z.infer<typeof stakeSchema> & { contract: string }
export type TUnstakeAptSchema = z.infer<typeof unstakeSchema> & {
  contract: string
}

export type TStakeApt = TStakeAptSchema & {
  contract: string
  currentBlockHeight: number
}

export type TUnstakeApt = TUnstakeAptSchema & { contract: string }
