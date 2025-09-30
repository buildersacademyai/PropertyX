export type ClarityType =
  | "uint"
  | "int"
  | "principal"
  | "string-utf8"
  | "string-ascii"
  | "bool"
  | "none"
  | "some"
  | "ok"
  | "err"
  | "tuple"
  | "list"

export interface ClarityValue {
  type: ClarityType
  value?: any
  address?: string
  data?: string | Record<string, ClarityValue>
}

export interface UintCV extends ClarityValue {
  type: "uint"
  value: number
}

export interface PrincipalCV extends ClarityValue {
  type: "principal"
  address: string
}

export interface StringCV extends ClarityValue {
  type: "string-utf8"
  data: string
}

export interface BoolCV extends ClarityValue {
  type: "bool"
  value: boolean
}

export interface NoneCV extends ClarityValue {
  type: "none"
}

export interface SomeCV extends ClarityValue {
  type: "some"
  value: ClarityValue
}

export interface TupleCV extends ClarityValue {
  type: "tuple"
  data: Record<string, ClarityValue>
}

// Contract call parameter interfaces
export interface ContractCallParams {
  contractAddress: string
  contractName: string
  functionName: string
  functionArgs: ClarityValue[]
  senderAddress: string
}

export interface ContractWriteParams {
  contractAddress: string
  contractName: string
  functionName: string
  functionArgs: ClarityValue[]
  fee?: number
  nonce?: number
}

export interface ContractCallResult {
  value: ClarityValue
}

export interface ContractWriteResult {
  txId: string
  value: boolean
}

// Asset data interfaces
export interface AssetData {
  id: number
  owner: string
  name: string
  description: string
  assetType: string
  value: number
  location: string
  imageUrl: string
}

/**
 * Creates a principal Clarity Value for a Stacks address
 */
export function createPrincipalCV(address: string): PrincipalCV {
  return { type: "principal", address }
}

/**
 * Creates a uint Clarity Value
 */
export function createUintCV(value: number): UintCV {
  return { type: "uint", value: Number(value) }
}

/**
 * Creates a string Clarity Value
 */
export function createStringCV(value: string): StringCV {
  return { type: "string-utf8", data: value }
}

/**
 * Creates a boolean Clarity Value
 */
export function createBoolCV(value: boolean): BoolCV {
  return { type: "bool", value: Boolean(value) }
}

/**
 * Creates a none Clarity Value
 */
export function createNoneCV(): NoneCV {
  return { type: "none" }
}

/**
 * Creates a some Clarity Value
 */
export function createSomeCV(value: ClarityValue): SomeCV {
  return { type: "some", value }
}

/**
 * Converts a Clarity Value to a string representation
 */
export function cvToString(cv: ClarityValue): string {
  try {
    if (cv && typeof cv === "object") {
      if (cv.type === "uint") return String(cv.value)
      if (cv.type === "principal") return cv.address || "unknown"
      if (cv.type === "string-utf8") return (cv.data as string) || ""
      if (cv.type === "bool") return cv.value ? "true" : "false"
      if (cv.type === "none") return "none"
      if (cv.type === "some")
        return `some ${cvToString(cv.value as ClarityValue)}`
    }
    return String(cv)
  } catch (e) {
    console.error("Error converting clarity value to string:", e)
    return "error"
  }
}

/**
 * Simulates a read-only contract call to the Stacks blockchain
 */
export async function simulateContractCall(
  params: ContractCallParams
): Promise<ContractCallResult> {
  const {
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderAddress,
  } = params

  if (contractName === "rws" && functionName === "get-balance") {
    const address = (functionArgs[0] as PrincipalCV)?.address || "unknown"
    const balance = Math.floor(Math.random() * 900) + 100
    return {
      value: { type: "uint", value: balance },
    }
  }

  if (contractName === "rws" && functionName === "get-admin") {
    // Return the admin address from the contract
    return {
      value: {
        type: "ok",
        value: {
          type: "principal",
          address: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
        },
      },
    }
  }

  if (contractName === "nft" && functionName === "get-owner") {
    const tokenId = (functionArgs[0] as UintCV)?.value || 0
    // For even token IDs, return the sender's address as owner
    // For odd ones, return a different address
    const owner =
      tokenId % 2 === 0
        ? senderAddress
        : "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E"

    return {
      value: {
        type: "some",
        value: { type: "principal", address: owner },
      },
    }
  }

  if (contractName === "rws" && functionName === "get-asset") {
    const owner = (functionArgs[0] as PrincipalCV)?.address || "unknown"
    const assetId = (functionArgs[1] as UintCV)?.value || 0

    // Return simulated asset data with IPFS CID for metadata
    const ipfsCid = `Qm${Array.from(
      { length: 44 },
      () =>
        "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"[
          Math.floor(Math.random() * 58)
        ]
    ).join("")}`

    return {
      value: {
        type: "tuple",
        data: {
          id: { type: "uint", value: assetId },
          owner: { type: "principal", address: owner },
          name: { type: "string-utf8", data: `Property Asset ${assetId}` },
          value: { type: "uint", value: 50000 + assetId * 10000 },
          metadata: { type: "string-utf8", data: ipfsCid },
        },
      },
    }
  }

  if (contractName === "nft-marketplace" && functionName === "get-listing") {
    const listingId = (functionArgs[0] as UintCV)?.value || 0

    // Return simulated listing data
    return {
      value: {
        type: "tuple",
        data: {
          id: { type: "uint", value: listingId },
          maker: {
            type: "principal",
            address: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
          },
          tokenId: { type: "uint", value: listingId },
          price: { type: "uint", value: 75000 + listingId * 5000 },
          expiry: { type: "uint", value: 720 }, // ~5 days in blocks
          isCancelled: { type: "bool", value: false },
        },
      },
    }
  }

  // Generic response for any other function
  return {
    value: { type: "bool", value: true },
  }
}

/**
 * Simulates a non-read-only contract call
 */
export async function simulateContractWrite(
  params: ContractWriteParams
): Promise<ContractWriteResult> {
  const { contractAddress, contractName, functionName, functionArgs } = params

  console.log(
    `Simulating write to ${contractAddress}.${contractName}::${functionName}`
  )

  // Generate a fake transaction ID
  const txId = `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`

  return {
    txId,
    value: true,
  }
}

/**
 * Parse asset data from contract response
 */
export function parseAssetData(
  result: ContractCallResult,
  owner: string,
  assetId: number
): AssetData | null {
  if (result && result.value) {
    // In a real app, extract values from the Clarity Value
    return {
      id: assetId,
      owner: owner,
      name: `Property Asset ${assetId}`,
      description: `Real-world asset tokenized on PropertyX Protocol (ID: ${assetId})`,
      assetType: "property",
      value: 50000 + assetId * 10000,
      location: "Downtown Financial District",
      imageUrl: `https://via.placeholder.com/400x300?text=Property+Asset+${assetId}`,
    }
  }
  return null
}

export function isUintCV(cv: ClarityValue): cv is UintCV {
  return cv.type === "uint"
}

export function isPrincipalCV(cv: ClarityValue): cv is PrincipalCV {
  return cv.type === "principal"
}

export function isStringCV(cv: ClarityValue): cv is StringCV {
  return cv.type === "string-utf8"
}

export function isBoolCV(cv: ClarityValue): cv is BoolCV {
  return cv.type === "bool"
}

export function isTupleCV(cv: ClarityValue): cv is TupleCV {
  return cv.type === "tuple"
}

export function isSomeCV(cv: ClarityValue): cv is SomeCV {
  return cv.type === "some"
}

export function isNoneCV(cv: ClarityValue): cv is NoneCV {
  return cv.type === "none"
}
