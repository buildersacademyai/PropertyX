"use client"

import * as React from "react"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

import ConnectWallet from "./connect-wallet"

const EmptyWallet = () => {
  return (
    <div className="flex w-full items-center justify-center py-24">
      <Card
        className="mx-auto flex w-full max-w-xl flex-col items-center gap-6
          rounded-xl border border-dashed p-10 text-center"
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-full
            bg-accent/40"
        >
          <Icons.wallet className="text-muted-foreground" size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Connect your wallet
          </h2>
          <p className="mx-auto max-w-sm text-sm text-muted-foreground">
            To continue, please connect a Stacks-compatible wallet to manage
            your assets and trade tokenized properties.
          </p>
        </div>
        <div className="w-full sm:w-auto">
          <ConnectWallet className="w-full sm:w-auto" size="lg" />
        </div>
      </Card>
    </div>
  )
}

export default EmptyWallet
