"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

import ConnectWallet from "./connect-wallet"
import { Icons } from "./icons"
import Logo from "./logo"
import { NextLink } from "./next-link"

const Nav = () => {
  return (
    <nav
      className={cn(
        "sticky top-0 right-0 left-0 z-50 transition-all duration-300",
        "border-b border-border/50 bg-background/80 backdrop-blur-md",
        "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-6 md:flex">
            {[
              { label: "Your Apts", href: "your-apts" },
              { label: "Your Listings", href: "your-listings" },
              { label: "Profile", href: "profile" },
            ].map((link) => (
              <Button
                variant={"ghost"}
                key={link.href}
                className="text-sm transition-colors hover:font-bold
                  hover:text-primary"
                asChild
              >
                <NextLink href={`/${link.href}`}>{link.label}</NextLink>
              </Button>
            ))}
            <ConnectWallet isNav />
          </div>

          <Button variant="ghost" size="sm" className="md:hidden">
            <Icons.menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Nav
