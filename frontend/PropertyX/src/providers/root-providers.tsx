"use client"

import { QueryProvider } from "@/providers/query-provider"
import React from "react"
import dynamic from "next/dynamic"

const WalletProvider = dynamic(
  () => import("@/providers/wallet-provider").then((m) => m.WalletProvider),
  { ssr: false }
)

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <WalletProvider>
      <QueryProvider>{children}</QueryProvider>
    </WalletProvider>
  )
}

export default RootProviders
