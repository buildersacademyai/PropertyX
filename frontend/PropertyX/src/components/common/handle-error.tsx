"use client"

import type { DalError } from "@/db/type"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"
import { NextLink } from "@/components/common/next-link"

import EmptyWallet from "./empty-wallet"

type HandleErrorProps = {
  error: DalError["type"]
  empty?: React.ReactNode
}

const Section: React.FC<{
  icon: React.ReactNode
  title: string
  description: string
  actions?: React.ReactNode
}> = ({ icon, title, description, actions }) => (
  <div className="flex w-full items-center justify-center py-24">
    <Card
      className="mx-auto flex w-full max-w-xl flex-col items-center gap-6
        rounded-xl border border-dashed p-10 text-center"
    >
      <div
        className="flex h-20 w-20 items-center justify-center rounded-full
          bg-accent/40"
      >
        {icon}
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="mx-auto max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {actions ? (
        <div className="flex flex-col gap-3 sm:flex-row">{actions}</div>
      ) : null}
    </Card>
  </div>
)

const HandleError: React.FC<HandleErrorProps> = ({ error, empty }) => {
  const router = useRouter()

  if (error === "invalid-address") {
    return <EmptyWallet />
  }

  if (error === "no-data") {
    if (empty) return <>{empty}</>
    return (
      <Section
        icon={<Icons.building className="text-muted-foreground" size={40} />}
        title="No data found"
        description="We couldn’t find any records to display right now. Explore the marketplace to get started."
        actions={
          <NextLink href="/">
            <Button>Back Home</Button>
          </NextLink>
        }
      />
    )
  }

  if (error === "drizzle-error") {
    return (
      <Section
        icon={<Icons.x className="text-muted-foreground" size={40} />}
        title="Database error"
        description="Something went wrong while fetching data. Please try again."
        actions={<Button onClick={() => router.refresh()}>Try again</Button>}
      />
    )
  }

  if (error === "unknown-error") {
    return (
      <Section
        icon={<Icons.x className="text-muted-foreground" size={40} />}
        title="Unexpected error"
        description="An unexpected error occurred. If the problem persists, please try again later."
        actions={<Button onClick={() => router.refresh()}>Try again</Button>}
      />
    )
  }

  return null
}

export default HandleError
