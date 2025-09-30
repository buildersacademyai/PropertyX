"use client"

import { useWallet } from "@/providers/wallet-provider"
import { Check, Copy, Eye, EyeOff } from "lucide-react"
import React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

function maskAddress(addr: string, visible: number = 4) {
  if (!addr) return ""
  if (addr.length <= visible * 2) return addr
  return `${addr.slice(0, visible)}..............${addr.slice(-visible)}`
}

const ProfileInfo: React.FC = () => {
  const { stxAddress, connected, balance } = useWallet()
  const [masked, setMasked] = React.useState(true)
  const [copied, setCopied] = React.useState(false)

  const displayAddress = React.useMemo(() => {
    if (!stxAddress) return "Not connected"
    return masked ? maskAddress(stxAddress) : stxAddress
  }, [stxAddress, masked])

  const onCopy = async () => {
    if (!stxAddress) return
    await navigator.clipboard.writeText(stxAddress)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="w-full overflow-hidden">
      <CardContent
        className="grid gap-6 p-6 md:grid-cols-[auto_1fr] md:items-start
          md:gap-8"
      >
        <div className="flex shrink-0 items-start justify-start">
          <Avatar className="size-20 md:size-24">
            <AvatarFallback
              aria-label="Profile avatar"
              className="text-transparent"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 45%, var(--ring) 100%)",
              }}
            />
          </Avatar>
        </div>

        <div className="flex w-full flex-col gap-3">
          <h2 className="text-lg font-semibold tracking-tight">Your Profile</h2>

          <div
            className="grid grid-cols-1 items-start gap-2
              sm:grid-cols-[1fr_auto_auto] sm:gap-3"
          >
            <div
              className="min-w-0 rounded-md border bg-accent/30 px-3 py-2
                font-mono text-sm text-accent-foreground sm:col-start-1"
            >
              <div className="truncate">{displayAddress}</div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCopy}
              disabled={!stxAddress}
              aria-label="Copy STX address"
              className="sm:col-start-3"
            >
              {copied ? (
                <Check className="size-4" />
              ) : (
                <Copy className="size-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setMasked((m) => !m)}
              disabled={!stxAddress}
              aria-label={masked ? "Show full address" : "Hide address"}
              className="sm:col-start-4"
            >
              {masked ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Button>
          </div>

          <div className="mt-1 flex items-center gap-2 text-sm">
            <span
              className={
                connected
                  ? "inline-flex items-center gap-2 text-foreground"
                  : "inline-flex items-center gap-2 text-muted-foreground"
              }
            >
              <span
                className={
                  connected
                    ? "size-2.5 rounded-full bg-chart-3"
                    : "size-2.5 rounded-full bg-border"
                }
              />
              {connected ? (
                <span className="inline-flex items-center gap-1.5">
                  <Icons.wallet className="size-4" /> Connected
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Icons.unplug className="size-4" /> Disconnected
                </span>
              )}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:col-span-2">
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">PXT Balance</div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">
              {Number(balance?.pxt ?? 0).toLocaleString()} PXT
            </div>
          </div>
          <div className="rounded-lg border bg-card p-4">
            <div className="text-xs text-muted-foreground">
              Assets Tokenized
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">0</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileInfo
