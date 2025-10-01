import util from "util"
import { TTypeSchema, TWhitelistContractSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { Cl } from "@stacks/transactions"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { env } from "./config/env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function range(length: number): number[] {
  return Array.from({ length }, (_, i) => i)
}

export function processRouteTransactions<T>({
  transactions,
}: {
  transactions: StacksPayload["apply"][number]["transactions"]
}) {
  const values: T[] = []

  transactions.forEach((tx) => {
    const events = tx.metadata.receipt.events

    events.forEach((event) => {
      if (event.type === "SmartContractEvent") {
        const eventData = event.data as {
          contract_identifier: string
          raw_value: string
          topic: string
          value: T
        }
        values.push(eventData.value)
      }
    })
  })

  return values
}

export function safeUint(value: string | number) {
  const num = BigInt(value || 0)
  return Cl.uint(num)
}

export function debugConsole(args: any) {
  return util.inspect(args, { depth: null, colors: true })
}

export function convertAmount(
  amount: number,
  type: "to-u6" | "from-u6" = "from-u6"
): number {
  if (type === "to-u6") {
    return amount * 1_000_000
  }
  return amount / 1_000_000
}

export function getContractNameAddress(
  contract: TWhitelistContractSchema["whitelisted"]
) {
  const [contractAddress, contractName] = contract.split(".")
  return {
    contractAddress,
    contractName,
  }
}

export const functionContractMap = {
  "list-asset-ft": env.MARKETPLACE,
  "set-whitelisted": env.MARKETPLACE,
  "update-protocol-contract": env.MARKETPLACE,
  "update-listing-ft": env.MARKETPLACE,
  "set-emergency-stop": env.MARKETPLACE,
  "set-contract-owner": env.MARKETPLACE,
  "set-transaction-fee-bps": env.MARKETPLACE,
  "cancel-listing-ft": env.MARKETPLACE,

  "fulfil-listing-ft-stx": env.FULFILL,
  "fulfil-ft-listing-ft": env.FULFILL,

  "update-contract": env.ADMIN,

  staking: env.STAKE,
  unstaking: env.STAKE,
} as const

export const formatNumber = (val?: number | string) => {
  const n = typeof val === "string" ? Number(val) : val
  return typeof n === "number" && isFinite(n)
    ? new Intl.NumberFormat("en-US").format(n)
    : typeof val === "string"
      ? val
      : "—"
}

export function createTypeGuard<T extends Record<string, any>>(
  schema: TTypeSchema
): (obj: any) => obj is T {
  return (obj: any): obj is T => {
    if (typeof obj !== "object" || obj === null) return false

    return Object.entries(schema).every(([key, config]) => {
      if (config.optional && !(key in obj)) return true

      if (!config.optional && !(key in obj)) return false

      const value = obj[key]

      if (config.type === "array") {
        return Array.isArray(value)
      }

      return typeof value === config.type
    })
  }
}
