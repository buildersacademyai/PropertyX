import util from "util"
import { TWhitelistContractSchema } from "@/services/type"
import { StacksPayload } from "@hirosystems/chainhook-client"
import { Cl } from "@stacks/transactions"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

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

export function convertAmount(amount: number) {
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
