import { mutationOptions } from "@tanstack/react-query"

import { ContractService } from "./api"
import {
  TBuyListing,
  TCancelListing,
  TListSaleBlockHeight,
  TStakeApt,
  TUnstakeApt,
  TUpdateListing,
  TWhitelistContractSchema,
} from "./type"

export const whitelistContract = () => {
  return mutationOptions({
    mutationKey: ["whitelist-contract"],
    mutationFn: async (values: TWhitelistContractSchema) =>
      ContractService.whitelistContract({ ...values }),
  })
}

export const listAptForSale = () => {
  return mutationOptions({
    mutationKey: ["list-apt-for-sale"],
    mutationFn: async (values: TListSaleBlockHeight) =>
      ContractService.listAptForSale({ ...values }),
  })
}

export const updateListing = () => {
  return mutationOptions({
    mutationKey: ["update-listing"],
    mutationFn: async (values: TUpdateListing) =>
      ContractService.updateListing({ ...values }),
  })
}

export const cancelListing = () => {
  return mutationOptions({
    mutationKey: ["cancel-listing"],
    mutationFn: async (values: TCancelListing) =>
      ContractService.cancelListing({ ...values }),
  })
}

export const fulfillStx = () => {
  return mutationOptions({
    mutationKey: ["buy-listing"],
    mutationFn: async (values: TBuyListing) =>
      ContractService.fulfillStx({ ...values }),
  })
}

export const stakeApt = () => {
  return mutationOptions({
    mutationKey: ["stake-apt"],
    mutationFn: async (values: TStakeApt) =>
      ContractService.statkeApt({ ...values }),
  })
}

export const unstakeApt = () => {
  return mutationOptions({
    mutationKey: ["unstake-apt"],
    mutationFn: async (values: TUnstakeApt) =>
      ContractService.unstakeApt({ ...values }),
  })
}
