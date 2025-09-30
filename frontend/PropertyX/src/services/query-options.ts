import { queryOptions } from "@tanstack/react-query"

import { ApiService } from "./api"

export const getBlockHeight = () => {
  return queryOptions({
    queryKey: ["block-height"],
    queryFn: () => ApiService.getBlockHeight(),
  })
}
