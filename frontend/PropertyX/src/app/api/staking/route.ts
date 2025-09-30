import { StacksPayload } from "@hirosystems/chainhook-client"
import { debugConsole, processRouteTransactions } from "@/lib/utils"

export async function POST(request: Request) {
  try {
    const payload: StacksPayload = await request.json()
    if (!payload.apply || !Array.isArray(payload.apply)) {
      return new Response("Invalid payload structure", { status: 400 })
    }
    const transactions = payload.apply.map((tx) => tx.transactions).flat()
    console.log("Transactions in staking:", debugConsole(transactions))
    const processedValues = processRouteTransactions<void>({
      transactions,
    })
    console.log("Processed staking payload: ", debugConsole(processedValues))
    if (processedValues.length === 0) {
      return new Response("No valid staking transactions found", {
        status: 400,
      })
    }

    return new Response("Staking apt successful", { status: 200 })
  } catch (error) {
    return new Response("Internal server error", { status: 500 })
  }
}
