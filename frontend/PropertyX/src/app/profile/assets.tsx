"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Icons } from "@/components/common/icons"

const staticAssets = [
  {
    id: 1,
    title: "Downtown Loft",
    subtitle: "Property token",
    tokens: 1200,
    valuation: "$1.2M",
    price: "25,000",
  },
  {
    id: 2,
    title: "Harbor View Condo",
    subtitle: "Property token",
    tokens: 800,
    valuation: "$900k",
    price: "18,500",
  },
  {
    id: 3,
    title: "Tech Park Office",
    subtitle: "Property token",
    tokens: 3000,
    valuation: "$4.5M",
    price: "120,000",
  },
]

const Assets = () => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {staticAssets.map((item) => (
        <Card
          key={item.id}
          className={cn(
            `group relative overflow-hidden border-primary/10 bg-card/80
            backdrop-blur-sm transition-all duration-300 hover:border-primary/30
            hover:shadow-lg`
          )}
        >
          <CardHeader className="pb-0">
            <div className="relative -mx-6 mb-4 px-6">
              <div
                className="relative aspect-[4/3] w-full overflow-hidden
                  rounded-lg"
              >
                <div
                  className="flex h-full w-full items-center justify-center
                    rounded-lg bg-muted text-muted-foreground"
                >
                  <Icons.building className="h-8 w-8" />
                </div>
              </div>
              <CardTitle className="mt-1 truncate text-base font-semibold">
                {item.title}
              </CardTitle>
              <CardDescription className="truncate text-xs">
                {item.subtitle}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-muted-foreground">Tokens</p>
                <p className="font-medium">{item.tokens.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Ask Price</p>
                <p className="font-medium">{item.price}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Valuation</p>
                <p className="font-medium">{item.valuation}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expiry</p>
                <p className="font-medium">—</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="mt-auto flex flex-col gap-2 pt-0">
            <div className="flex w-full gap-2">
              <Button className="flex-1" variant="default">
                View Details
              </Button>
              <Button className="flex-1" variant="outline">
                Transfer
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default Assets
