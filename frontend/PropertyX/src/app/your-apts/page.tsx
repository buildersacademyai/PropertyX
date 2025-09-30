import { getApts } from "@/db/actions/apts"
import { getWalletAddress } from "@/db/actions/wallet"
import { dalFormatErrorMessage, dalVerifySuccess } from "@/db/helpers"
import React from "react"
import Image from "next/image"
import { formatNumber } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import EmptyWallet from "@/components/common/empty-wallet"
import { Icons } from "@/components/common/icons"
import { NextLink } from "@/components/common/next-link"

import EmptyApt from "./_components/empty-apt"
import { ListForSaleDialog } from "./_components/list-for-sale"
import { StakeUnstakeDialog } from "./_components/stake-unstake-dialog"

const Apts = async () => {
  const stxAddress = await getWalletAddress()
  if (!stxAddress) {
    return <EmptyWallet />
  }

  const apt = await getApts(stxAddress)

  if (!apt.success && apt.error?.type === "no-data") {
    return <EmptyApt />
  }

  if (!apt.success) {
    return dalFormatErrorMessage(apt.error)
  }

  const response = dalVerifySuccess(apt)
  const items = response.items
  if (!response.items) {
    return null
  }

  return (
    <div className="container mx-auto min-h-screen px-4 py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Apts</h1>
          <p className="mt-1 max-w-lg text-sm text-muted-foreground">
            View your tokenized properties, track performance, and start earning
            passive yield.
          </p>
        </div>
      </div>
      {items.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {items.map((item) => {
            const tokenName = item?.tokenName || "Unknown Token"
            const name =
              item?.asset?.name || item?.tcoin.name || "Unknown Asset"
            const location = item?.asset?.location || "—"
            const balanceNum = Number(item?.balance)

            return (
              <Card
                key={item?.contract}
                className="group w-full rounded-lg p-0 hover:shadow-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-6">
                  <div className="col-span-3 col-start-1 border-r bg-accent/30">
                    {item?.asset?.image ? (
                      <Image
                        width={800}
                        height={450}
                        src={item.asset.image}
                        alt={name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div
                        className="absolute inset-0 flex items-center
                          justify-center"
                      >
                        <Icons.building
                          className="text-muted-foreground"
                          size={32}
                        />
                      </div>
                    )}
                  </div>

                  <div
                    className="col-span-3 col-start-4 flex flex-col
                      justify-between px-4 py-6"
                  >
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {location}
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <div
                          className="truncate text-xl font-bold text-foreground"
                        >
                          {name}
                        </div>
                        <NextLink
                          href={`/your-apts/${encodeURIComponent(item?.contract as string)}`}
                          className="flex items-center gap-1 text-primary
                            transition-colors hover:text-foreground"
                          prefetch={false}
                        >
                          <Icons.externalLink size={16} />
                        </NextLink>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground">Token Name</p>
                          <p className="font-medium">{tokenName}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Balance</p>
                          <p className="font-medium">
                            {formatNumber(balanceNum)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-4">
                      {item ? (
                        <>
                          <div className="flex w-full gap-2">
                            <StakeUnstakeDialog
                              contract={item.contract}
                              balance={balanceNum}
                              variant="stake"
                            />
                            <StakeUnstakeDialog
                              contract={item.contract}
                              balance={balanceNum}
                              variant="unstake"
                            />
                          </div>

                          <ListForSaleDialog
                            contract={item.contract}
                            balance={balanceNum}
                          />
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Apts
