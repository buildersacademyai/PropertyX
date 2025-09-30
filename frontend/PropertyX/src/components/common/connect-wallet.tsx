"use client"

import { useWallet } from "@/providers/wallet-provider"
import { AnimatePresence, motion } from "motion/react"
import React, { useState, type ComponentPropsWithoutRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import { Icons } from "./icons"

type ConnectWalletProps = ComponentPropsWithoutRef<typeof Button> & {
  isNav?: boolean
}

const ConnectWallet = ({ isNav = false, ...props }: ConnectWalletProps) => {
  const router = useRouter()
  const { getConnect, connected, getDisconnect } = useWallet()
  const [hovered, setHovered] = useState(false)

  const handleButtonClick = () => {
    if (!connected) {
      getConnect()
    } else if (connected) {
      router.push("/explore")
    }
  }

  return (
    <>
      <Button
        size="sm"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
        className={cn(
          "group relative flex cursor-pointer items-center gap-2",
          props.className
        )}
        onClick={handleButtonClick}
      >
        {connected ? (
          <Icons.store size={16} />
        ) : (
          <div className="relative size-4">
            <AnimatePresence mode="wait" initial={false}>
              {hovered ? (
                <motion.div
                  key="unplug"
                  initial={{ opacity: 0, y: 5, rotate: -15 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -5, rotate: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Icons.unplug size={24} />
                </motion.div>
              ) : (
                <motion.div
                  key="plug"
                  initial={{ opacity: 0, y: 5, rotate: 15 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, y: -5, rotate: -15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Icons.plug size={24} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
        <span>{connected ? "Explore Marketplace" : "Connect Wallet"}</span>
      </Button>
      {connected && isNav ? (
        <Button
          variant="destructive"
          size="icon"
          onClick={getDisconnect}
          className="cursor-pointer"
        >
          <Icons.power />
        </Button>
      ) : null}
    </>
  )
}

export default ConnectWallet
