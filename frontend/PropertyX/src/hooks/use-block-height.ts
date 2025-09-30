import { useWallet } from "@/providers/wallet-provider"
import { getBlockHeight } from "@/services/query-options"
import { useQuery } from "@tanstack/react-query"

export const useBlockHeight = () => {
  const { connected } = useWallet()

  const {
    data: blockHeightData,
    isLoading: isLoadingBlockHeight,
    isSuccess: isSuccessBlockHeight,
  } = useQuery({
    ...getBlockHeight(),
    enabled: connected,
  })

  const currentBlockHeight = blockHeightData?.chain_tip?.block_height || 0

  return {
    currentBlockHeight,
    isSuccessBlockHeight,
    isLoadingBlockHeight,
  }
}
