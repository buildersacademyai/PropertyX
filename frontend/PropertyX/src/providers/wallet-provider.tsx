"use client"

import { clearWalletAddress, setWalletAddress } from "@/db/actions/wallet"
import {
  connect,
  disconnect,
  getLocalStorage,
  isConnected,
} from "@stacks/connect"
import { toast } from "sonner"
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  createBoolCV,
  createNoneCV,
  createPrincipalCV,
  createStringCV,
  createUintCV,
  parseAssetData,
  simulateContractCall,
  simulateContractWrite,
} from "@/lib/stacks-helper"

interface LocalStorageAddressEntry {
  address: string
}

interface LocalStorageData {
  addresses?: {
    stx?: LocalStorageAddressEntry[]
  }
}

interface Balance {
  pxt: number
  btc: number
}

interface ContractCallParams {
  contractAddress: string
  contractName: string
  functionName: string
  functionArgs: unknown[]
}

interface NftData {
  tokenId: number
  owner: string | null
}

interface AssetData {
  name: string
  description?: string
}

interface MarketplaceListing {
  id: number
  tokenId: number
  name: string
  description?: string
  assetType: string
  owner: string
  price: number
  currency: string
  imageUrl: string
  metadataCid: string
  createdAt: Date
  expiry: number
  isCancelled: boolean
}

interface WalletContextValue {
  connected: boolean
  stxAddress: string | null
  userData: LocalStorageData | null
  balance: Balance
  getConnect: () => Promise<void>
  getDisconnect: () => void
  callContract: (
    p: ContractCallParams
  ) => Promise<{ txId: string; value: boolean }>
  fetchBalance: (address: string) => Promise<void>
  getNftData: (tokenId: number) => Promise<NftData>
  getAssetData: (owner: string, assetId: number) => Promise<AssetData | null>
  fetchIpfsMetadata: <T = any>(cid: string) => Promise<T | null>
  isContractAdmin: () => Promise<boolean>
  updateMarketplaceContract: (principal: string, role: string) => Promise<void>
  updateKycContract: (principal: string, role: string) => Promise<void>
}
interface WalletProviderProps {
  children: ReactNode
}

const IPFS_GATEWAY = "https://ipfs.io/ipfs/"

const noopAsync = async () => {}
const noopPromiseBool = async () => false
const noopPromiseArray = async () => [] as MarketplaceListing[]

const WalletContext = createContext<WalletContextValue>({
  connected: false,
  stxAddress: null,
  userData: null,
  balance: { pxt: 0, btc: 0 },
  getConnect: noopAsync,
  getDisconnect: () => {},
  callContract: async () => ({ txId: "", value: false }),
  fetchBalance: noopAsync,
  getNftData: async () => ({ tokenId: 0, owner: null }),
  getAssetData: async () => null,
  fetchIpfsMetadata: async () => null,
  isContractAdmin: noopPromiseBool,
  updateMarketplaceContract: noopAsync,
  updateKycContract: noopAsync,
})

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false)
  const [stxAddress, setStxAddress] = useState<string | null>(null)
  const [userData, setUserData] = useState<LocalStorageData | null>(null)
  const [balance, setBalance] = useState<Balance>({ pxt: 0, btc: 0 })

  const isLocalStorageData = (data: unknown): data is LocalStorageData => {
    return !!data && typeof data === "object" && "addresses" in (data as any)
  }

  useEffect(() => {
    try {
      if (isConnected()) {
        const raw = getLocalStorage()
        if (isLocalStorageData(raw) && raw.addresses?.stx?.[0]?.address) {
          const addr = raw.addresses.stx[0].address
          setUserData(raw)
          setStxAddress(addr)
          setConnected(true)
          void fetchBalance(addr)
          void setWalletAddress(addr)
        }
      }
    } catch (e) {
      console.error("Initialization error:", e)
    }
  }, [])

  const fetchBalance = async (address: string): Promise<void> => {
    if (!address) return
    try {
      if (isConnected()) {
        const result = await simulateContractCall({
          contractAddress: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
          contractName: "rws",
          functionName: "get-balance",
          functionArgs: [createPrincipalCV(address)],
          senderAddress: address,
        })
        const rawVal = (result.value as any)?.value ?? 0
        const parsed = typeof rawVal === "number" ? rawVal : Number(rawVal)
        setBalance({ pxt: Number.isFinite(parsed) ? parsed : 0, btc: 0 })
      }
    } catch (error) {
      console.error("Error fetching balance:", error)
      setBalance({ pxt: 0, btc: 0 })
    }
  }

  const getConnect = async (): Promise<void> => {
    if (isConnected()) return
    await connect()
    const raw = getLocalStorage()
    if (isLocalStorageData(raw) && raw.addresses?.stx?.[0]?.address) {
      const addr = raw.addresses.stx[0].address
      setUserData(raw)
      setStxAddress(addr)
      setConnected(true)
      await fetchBalance(addr)
      await setWalletAddress(addr)
    }
    toast.success("Wallet connected successfully")
  }

  const getDisconnect = (): void => {
    setConnected(false)
    setStxAddress(null)
    setUserData(null)
    setBalance({ pxt: 0, btc: 0 })
    disconnect()
    void clearWalletAddress()
    toast("Wallet Disconnected", { description: "You have been logged out." })
  }

  const callContract = async ({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
  }: ContractCallParams): Promise<{ txId: string; value: boolean }> => {
    if (!connected) throw new Error("Wallet not connected")
    try {
      const cvArgs = functionArgs.map((arg) => {
        if (
          typeof arg === "number" ||
          (typeof arg === "string" && !isNaN(Number(arg)))
        ) {
          return createUintCV(Number(arg))
        } else if (typeof arg === "string") {
          if (arg.startsWith("ST") && arg.length >= 39)
            return createPrincipalCV(arg)
          return createStringCV(arg)
        } else if (typeof arg === "boolean") {
          return createBoolCV(arg)
        } else if (arg === null || arg === undefined) {
          return createNoneCV()
        }
        return createStringCV(String(arg))
      })

      const result = await simulateContractWrite({
        contractAddress,
        contractName,
        functionName,
        functionArgs: cvArgs,
      })
      return { txId: result?.txId || "", value: true }
    } catch (error) {
      console.error("Error calling contract:", error)
      throw error
    }
  }

  const getNftData = async (tokenId: number): Promise<NftData> => {
    if (!connected) throw new Error("Wallet not connected")
    try {
      if (!stxAddress) throw new Error("Missing wallet address")
      const result = await simulateContractCall({
        contractAddress: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
        contractName: "nft",
        functionName: "get-owner",
        functionArgs: [createUintCV(tokenId)],
        senderAddress: stxAddress,
      })

      let owner: string | null = null
      try {
        if (result?.value?.type === "some") {
          owner = result.value.value?.address ?? null
        }
      } catch (e) {
        console.error("Error parsing NFT owner:", e)
      }
      return { tokenId, owner }
    } catch (error) {
      console.error("Error fetching NFT data:", error)
      throw error
    }
  }

  const getAssetData = async (
    owner: string,
    assetId: number
  ): Promise<AssetData | null> => {
    try {
      const result = await simulateContractCall({
        contractAddress: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
        contractName: "rws",
        functionName: "get-asset",
        functionArgs: [createPrincipalCV(owner), createUintCV(assetId)],
        senderAddress: stxAddress || owner,
      })
      const parsedRaw = parseAssetData(result, owner, assetId)
      if (!parsedRaw) return null
      const parsed: AssetData = {
        name: parsedRaw.name,
        description: parsedRaw.description,
      }
      return parsed
    } catch (error) {
      console.error("Error fetching asset data:", error)
      throw error
    }
  }

  const isContractAdmin = async (): Promise<boolean> => {
    if (!connected || !stxAddress) return false
    try {
      const result = await simulateContractCall({
        contractAddress: "ST1VZ3YGJKKC8JSSWMS4EZDXXJM7QWRBEZ0ZWM64E",
        contractName: "rws",
        functionName: "get-admin",
        functionArgs: [],
        senderAddress: stxAddress,
      })
      if ((result.value as any)?.type === "ok") {
        const inner = (result.value as any).value
        if (inner?.type === "principal" && inner.address === stxAddress)
          return true
      }
      return false
    } catch (error) {
      console.error("Error checking admin status:", error)
      return false
    }
  }

  const updateMarketplaceContract = async (
    principal: string,
    role: string
  ): Promise<void> => {
    if (!connected) throw new Error("Wallet not connected")
    try {
      const roleNum = Number.parseInt(role, 10)
      await simulateContractWrite({
        contractAddress: "ST1JG6WDA1B4PZD8JZY95RPNKFFF5YKPV57BHPC9G",
        contractName: "marketplace",
        functionName: "update-marketplace-contract",
        functionArgs: [
          createPrincipalCV(principal),
          createUintCV(Number.isNaN(roleNum) ? 0 : roleNum),
        ],
      })
    } catch (error) {
      console.error("Error updating marketplace contract:", error)
      throw error
    }
  }

  const updateKycContract = async (
    principal: string,
    role: string
  ): Promise<void> => {
    if (!connected) throw new Error("Wallet not connected")
    try {
      const roleNum = Number.parseInt(role, 16)
      await simulateContractWrite({
        contractAddress: "ST1JG6WDA1B4PZD8JZY95RPNKFFF5YKPV57BHPC9G",
        contractName: "marketplace",
        functionName: "update-kyc-contract",
        functionArgs: [
          createPrincipalCV(principal),
          createUintCV(Number.isNaN(roleNum) ? 0 : roleNum),
        ],
      })
    } catch (error) {
      console.error("Error updating KYC contract:", error)
      throw error
    }
  }

  const fetchIpfsMetadata = async <T = any,>(
    cid: string
  ): Promise<T | null> => {
    if (!cid) return null
    try {
      const url = `${IPFS_GATEWAY}${cid}`
      const response = await fetch(url)
      if (!response.ok)
        throw new Error(`Failed to fetch IPFS data: ${response.status}`)
      return (await response.json()) as T
    } catch (error) {
      console.error("Error fetching IPFS metadata:", error)
      return null
    }
  }

  const contextValue: WalletContextValue = {
    connected,
    stxAddress,
    userData,
    balance,
    getConnect,
    getDisconnect,
    callContract,
    fetchBalance,
    getNftData,
    getAssetData,
    fetchIpfsMetadata,
    isContractAdmin,
    updateMarketplaceContract,
    updateKycContract,
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = (): WalletContextValue => useContext(WalletContext)

export default WalletContext
