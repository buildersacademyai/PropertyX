import { request } from "@stacks/connect"
import { Cl } from "@stacks/transactions"
import { apiClient } from "@/lib/config/api-client"
import { env } from "@/lib/config/env"
import {
  convertAmount,
  functionContractMap,
  getContractNameAddress,
  safeUint,
} from "@/lib/utils"

import {
  TBlockHeightResponse,
  TBuyListing,
  TCancelListing,
  TFtBalancesResponse,
  TFunctionName,
  TListSaleBlockHeight,
  TStakeApt,
  TTestCoin,
  TUnstakeApt,
  TUpdateListing,
  TWhitelistContractSchema,
} from "./type"

export class ApiService {
  private static readonly BASE_PATH =
    env.NETWORK === "testnet"
      ? "https://api.testnet.hiro.so/extended"
      : env.NETWORK === "mainnet"
        ? "https://api.hiro.so/extended"
        : "http://localhost:3999/extended"

  static async getBlockHeight(): Promise<TBlockHeightResponse> {
    const response = await apiClient.get(`${this.BASE_PATH}`)
    return response.data
  }

  static async getFtBalances(stxAddress: string): Promise<TFtBalancesResponse> {
    const response = await apiClient.get(
      `${this.BASE_PATH}/v2/addresses/${stxAddress}/balances/ft?limit=100&offset=0`
    )
    return response.data
  }

  static async getTestCoin(url: string): Promise<TTestCoin> {
    const response = await apiClient.get(url)
    return response.data
  }
}

export const getRequest = async ({
  args,
  postMode = true,
  functionName,
}: {
  args: any
  postMode?: boolean
  functionName: TFunctionName
}) => {
  const CONTRACT_NAME = functionContractMap[functionName]
  if (!CONTRACT_NAME) {
    throw new Error(`No contract mapping found for function: ${functionName}`)
  }

  try {
    return await request("stx_callContract", {
      contract: `${env.CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
      functionName,
      functionArgs: args,
      network: env.NETWORK,
      postConditionMode: postMode ? "allow" : "deny",
    })
  } catch (error) {
    throw error instanceof Error
      ? error
      : new Error("Unknown contract call error")
  }
}

export class ContractService {
  static async whitelistContract({
    whitelisted,
    isWhitelisted,
  }: TWhitelistContractSchema) {
    const { contractAddress, contractName } =
      getContractNameAddress(whitelisted)
    const args = [
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.bool(isWhitelisted),
    ]
    return await getRequest({
      args,
      functionName: "set-whitelisted",
      postMode: false,
    })
  }

  static async statkeApt(values: TStakeApt) {
    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )
    const args = [
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.uint(convertAmount(values.amount, "to-u6")),
      Cl.uint(values.currentBlockHeight + values.expiry),
    ]

    return await getRequest({
      args,
      functionName: "staking",
    })
  }

  static async unstakeApt(values: TUnstakeApt) {
    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )
    const args = [
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.uint(values.amount),
    ]

    return await getRequest({
      args,
      functionName: "unstaking",
    })
  }

  static async listAptForSale({
    currentBlockHeight,
    ...values
  }: TListSaleBlockHeight) {
    const finalPrice =
      values.paymentAsset !== "STX"
        ? values.listingPrice * 100
        : values.listingPrice

    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )
    const args = [
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.tuple({
        taker: Cl.none(),
        amt: safeUint(convertAmount(values.amount, "to-u6")),
        expiry: safeUint(currentBlockHeight + Number(values.listingDuration)),
        price: safeUint(finalPrice),
        "payment-asset-contract":
          values.paymentAsset === "STX"
            ? Cl.none()
            : Cl.some(Cl.principal(values.paymentAsset)),
      }),
    ]
    return await getRequest({
      args,
      functionName: "list-asset-ft",
    })
  }

  static async updateListing(values: TUpdateListing) {
    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )

    const args = [
      Cl.uint(values.listingId),
      Cl.contractPrincipal(contractAddress, contractName),
      values.amount
        ? Cl.some(safeUint(convertAmount(values.amount, "to-u6")))
        : Cl.none(),
      values.price ? Cl.some(safeUint(values.price)) : Cl.none(),
      values.expiry
        ? Cl.some(safeUint(values.currentBlockHeight + values.expiry))
        : Cl.none(),
    ]

    return await getRequest({
      args,
      functionName: "update-listing-ft",
    })
  }

  static async cancelListing(values: TCancelListing) {
    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )
    const args = [
      Cl.uint(values.listingId),
      Cl.contractPrincipal(contractAddress, contractName),
    ]

    return await getRequest({
      args,
      functionName: "cancel-listing-ft",
    })
  }

  static async fulfillStx(values: TBuyListing) {
    const { contractAddress, contractName } = getContractNameAddress(
      values.contract
    )
    const args = [
      Cl.uint(values.listingId),
      Cl.contractPrincipal(contractAddress, contractName),
      Cl.uint(convertAmount(values.amount, "to-u6")),
    ]

    return await getRequest({
      args,
      functionName: "fulfil-listing-ft-stx",
    })
  }
}
