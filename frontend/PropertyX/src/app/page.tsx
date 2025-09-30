"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import ConnectWallet from "@/components/common/connect-wallet"
import { Icons } from "@/components/common/icons"

export default function PropertyXLanding() {
  const [trancheSold, setTrancheSold] = useState(3420)
  const [activeTab, setActiveTab] = useState("features")
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 1000)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress((trancheSold / 10000) * 100)
    }, 1000)
    return () => clearTimeout(timer)
  }, [trancheSold])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="min-h-screen">
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed right-6 bottom-6 z-50 h-12 w-12 animate-in
            rounded-full p-0 shadow-lg transition-all duration-300
            slide-in-from-bottom-2 hover:shadow-xl"
        >
          <Icons.chevronUp className="h-5 w-5" />
        </Button>
      )}

      <section id="hero" className="relative -mt-20 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0
              bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_60%)]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-background
              via-background/80 to-background"
          />
          <div
            className="absolute top-0 left-1/2 h-64 w-[120%] -translate-x-1/2
              bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10
              opacity-60 blur-3xl"
          />
        </div>
        <div
          className="relative z-10 container mx-auto px-4 pt-36 pb-24 md:pt-40
            md:pb-28"
        >
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div
                className="animate-in space-y-8 duration-1000
                  slide-in-from-left-8"
              >
                <div className="space-y-4">
                  <Badge
                    variant="secondary"
                    className="animate-in text-sm font-medium delay-300
                      duration-1000 fade-in"
                  >
                    <Icons.bitcoin className="mr-2 h-4 w-4" />
                    Bitcoin-Secured Real Estate
                  </Badge>

                  <h1
                    className="animate-in text-[clamp(2.4rem,6vw,3.75rem)]
                      leading-[1.05] font-bold tracking-tight text-balance
                      delay-500 duration-1000 slide-in-from-left-6"
                  >
                    Unlock Real Urban Returns —
                    <span className="text-primary">
                      {" "}
                      Tokenized Property Yield
                    </span>
                    , Secured by Bitcoin
                  </h1>

                  <p
                    className="max-w-xl animate-in
                      text-[clamp(1.05rem,1.3vw,1.25rem)] leading-relaxed
                      text-pretty text-foreground/90 delay-700 duration-1000
                      slide-in-from-left-4"
                  >
                    Invest in income-generating city assets through APT tokens
                    (45% cash-flow share + BTC rewards) and join governance with
                    PXT. Built on Stacks, secured by Bitcoin, with low entry and
                    transparent contracts.
                  </p>
                </div>

                <div
                  className="flex animate-in flex-wrap gap-2 text-sm
                    text-muted-foreground delay-900 duration-1000 fade-in"
                >
                  <div className="flex items-center gap-1">
                    <Icons.shield className="h-4 w-4" />
                    Built on Stacks, secured by Bitcoin
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1">
                    <Icons.checkCircle className="h-4 w-4" />
                    Clarity smart contracts
                  </div>
                </div>

                <div
                  className="flex animate-in flex-col gap-4 delay-1100
                    duration-1000 slide-in-from-left-2 sm:flex-row"
                >
                  <ConnectWallet
                    size={"lg"}
                    className="w-full px-10 py-6 text-lg font-medium
                      transition-all duration-300 hover:scale-[1.03] sm:w-auto"
                  />
                </div>
              </div>

              <div
                className="animate-in space-y-6 delay-500 duration-1000
                  slide-in-from-right-8"
              >
                <Card
                  className="border-primary/20 bg-card/80 backdrop-blur-sm
                    transition-all duration-500 hover:scale-105 hover:shadow-xl"
                >
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icons.trendingUp className="h-5 w-5 text-primary" />
                      Live Token Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className="rounded-lg bg-muted/50 p-4 text-center
                          transition-colors hover:bg-muted/70"
                      >
                        <p className="text-2xl font-bold text-primary">38%</p>
                        <p className="text-sm text-muted-foreground">
                          APY Target
                        </p>
                      </div>
                      <div
                        className="rounded-lg bg-muted/50 p-4 text-center
                          transition-colors hover:bg-muted/70"
                      >
                        <p className="text-2xl font-bold text-secondary">
                          0.02 BTC
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bonus Yield
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Tranche Progress</span>
                        <span>{trancheSold.toLocaleString()} / 10,000</span>
                      </div>
                      <Progress
                        value={animatedProgress}
                        className="h-2 transition-all duration-2000 ease-out"
                      />
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          Next Distribution:
                        </span>
                        <span className="font-medium">Dec 15, 2024</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card
                    className="bg-card/60 p-4 text-center backdrop-blur-sm
                      transition-all duration-300 hover:scale-105
                      hover:bg-card/80"
                  >
                    <p className="text-2xl font-bold text-primary">12</p>
                    <p className="text-xs text-muted-foreground">
                      Assets Tokenized
                    </p>
                  </Card>
                  <Card
                    className="bg-card/60 p-4 text-center backdrop-blur-sm
                      transition-all duration-300 hover:scale-105
                      hover:bg-card/80"
                  >
                    <p className="text-2xl font-bold text-secondary">$1.2M</p>
                    <p className="text-xs text-muted-foreground">
                      APT Liquidity
                    </p>
                  </Card>
                  <Card
                    className="bg-card/60 p-4 text-center backdrop-blur-sm
                      transition-all duration-300 hover:scale-105
                      hover:bg-card/80"
                  >
                    <p className="text-2xl font-bold text-chart-1">3,450</p>
                    <p className="text-xs text-muted-foreground">
                      Waitlist Joined
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Partner Logos */}
            {/* <div className="text-center mb-16">
              <p className="text-sm text-muted-foreground mb-8">Trusted by community owners and pilot partners</p>
              <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-16 bg-muted rounded-lg flex items-center justify-center hover:opacity-80 transition-opacity"
                  >
                    <span className="text-xs text-muted-foreground font-medium">Partner {i}</span>
                  </div>
                ))}
              </div>
            </div> */}

            {/* Live Numbers */}
            {/* <div className="mb-16 grid gap-8 md:grid-cols-3">
              <Card
                className="border-primary/15 bg-card/75 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/90"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Icons.building className="h-8 w-8 text-primary" />
                </div>
                <p className="mb-2 text-4xl font-bold text-primary">12</p>
                <p className="text-muted-foreground">pilot assets tokenized</p>
              </Card>

              <Card
                className="border-secondary/15 bg-card/75 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/90"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Icons.dollarSign className="h-8 w-8 text-secondary" />
                </div>
                <p className="mb-2 text-4xl font-bold text-secondary">$1.2M</p>
                <p className="text-muted-foreground">
                  in APT liquidity reserved
                </p>
              </Card>

              <Card
                className="border-chart-1/15 bg-card/75 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-card/90"
              >
                <div className="mb-4 flex items-center justify-center">
                  <Icons.users className="h-8 w-8 text-chart-1" />
                </div>
                <p className="mb-2 text-4xl font-bold text-chart-1">3,450</p>
                <p className="text-muted-foreground">
                  community investors joined waitlist
                </p>
              </Card>
            </div> */}

            {/* Video Testimonial & Case Study */}
            {/* <div className="grid items-start gap-12 lg:grid-cols-2">
            <Card
              className="bg-card/80 backdrop-blur-sm transition-all
                  duration-300 hover:shadow-lg"
            >
              <CardContent className="p-0">
                <div
                  className="group relative aspect-video overflow-hidden
                      rounded-t-lg bg-muted"
                >
                  <NextImage
                    src="/placeholder.svg?height=300&width=500"
                    alt="Video testimonial thumbnail"
                    width={500}
                    height={300}
                    className="h-full w-full object-cover transition-transform
                        duration-500 group-hover:scale-105"
                    showSkeleton
                  />
                  <div
                    className="absolute inset-0 flex items-center
                        justify-center bg-black/20 transition-colors
                        group-hover:bg-black/30"
                  >
                    <Button
                      size="lg"
                      className="h-16 w-16 rounded-full p-0
                          transition-transform duration-300 hover:scale-110"
                      onClick={() => setIsVideoPlaying(true)}
                    >
                      <Icons.play className="ml-1 h-6 w-6" />
                    </Button>
                  </div>
                  <Badge
                    className="absolute top-4 left-4 animate-pulse bg-primary"
                  >
                    60s Testimonial
                  </Badge>
                </div>
                <div className="p-6">
                  <blockquote
                    className="mb-4 text-lg text-muted-foreground italic"
                  >
                    &ldquo;PropertyX allowed us to access $220k in capital for
                    critical repairs without losing ownership. The process was
                    transparent and our tenants love the improvements.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center
                          rounded-full bg-muted"
                    >
                      <span className="text-sm font-medium">MR</span>
                    </div>
                    <div>
                      <p className="font-medium">Maria Rodriguez</p>
                      <p className="text-sm text-muted-foreground">
                        Property Owner, Brooklyn
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className="border-primary/20 bg-gradient-to-br from-primary/5
                  to-secondary/5 transition-all duration-300 hover:scale-105
                  hover:shadow-lg"
            >
              <CardHeader>
                <div className="mb-2 flex items-center gap-2">
                  <Icons.award className="h-5 w-5 text-primary" />
                  <Badge variant="secondary">Case Study</Badge>
                </div>
                <CardTitle className="text-2xl">
                  HORIZ-APT Pilot Success
                </CardTitle>
                <CardDescription>
                  Mixed-use building in Queens achieves funding target ahead
                  of schedule
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-lg bg-background/50 p-4 text-center
                        transition-colors hover:bg-background/70"
                  >
                    <p className="text-2xl font-bold text-primary">38%</p>
                    <p className="text-sm text-muted-foreground">
                      of target in 14 days
                    </p>
                  </div>
                  <div
                    className="rounded-lg bg-background/50 p-4 text-center
                        transition-colors hover:bg-background/70"
                  >
                    <p className="text-2xl font-bold text-secondary">45%</p>
                    <p className="text-sm text-muted-foreground">
                      NOI distribution
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div
                    className="flex items-center gap-3 transition-transform
                        duration-300 hover:translate-x-2"
                  >
                    <Icons.checkCircle
                      className="h-5 w-5 flex-shrink-0 text-primary"
                    />
                    <span className="text-sm">
                      0.02 BTC bonus distributed to early investors
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 transition-transform
                        duration-300 hover:translate-x-2"
                  >
                    <Icons.checkCircle
                      className="h-5 w-5 flex-shrink-0 text-primary"
                    />
                    <span className="text-sm">
                      Monthly cash flows automated via smart contract
                    </span>
                  </div>
                  <div
                    className="flex items-center gap-3 transition-transform
                        duration-300 hover:translate-x-2"
                  >
                    <Icons.checkCircle
                      className="h-5 w-5 flex-shrink-0 text-primary"
                    />
                    <span className="text-sm">
                      Secondary market trading active within 30 days
                    </span>
                  </div>
                </div>

                <Alert className="border-primary/20 bg-primary/5">
                  <Icons.target className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Result:</strong> Property owner retained 100%
                    equity while accessing $180k for renovations, increasing
                    property value by 23% within 6 months.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div> 
          */}

            {/* Metrics Bar */}
            <div
              className="mt-16 grid gap-8 rounded-lg border border-primary/20
                bg-card/50 p-8 backdrop-blur-sm md:grid-cols-3"
            >
              <div className="text-center">
                <p className="mb-2 text-3xl font-bold text-primary">$2.4M</p>
                <p className="text-sm text-muted-foreground">
                  Total Capital Unlocked
                </p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-3xl font-bold text-secondary">100%</p>
                <p className="text-sm text-muted-foreground">
                  Distribution Reliability
                </p>
              </div>
              <div className="text-center">
                <p className="mb-2 text-3xl font-bold text-chart-1">0</p>
                <p className="text-sm text-muted-foreground">
                  Defaults to Date
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-balance">
                The Real Estate Liquidity Problem
              </h2>
              <p
                className="mx-auto max-w-3xl text-xl text-pretty
                  text-muted-foreground"
              >
                Property owners are trapped between keeping their assets and
                accessing capital for growth
              </p>
            </div>

            <div className="mb-16 grid items-center gap-12 lg:grid-cols-2">
              {/* Problem Quotes */}
              <div className="space-y-8">
                <Card
                  className="border-destructive/20 bg-destructive/5 p-6
                    transition-all duration-300 hover:shadow-lg"
                >
                  <blockquote className="mb-4 text-lg italic">
                    &ldquo;I needed $150k for building improvements but
                    couldn&apos;t get a loan without putting my property at
                    risk. Selling wasn&apos;t an option — this building has been
                    in my family for 20 years.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center
                        rounded-full bg-muted"
                    >
                      <span className="text-sm font-medium">JS</span>
                    </div>
                    <div>
                      <p className="font-medium">James Sullivan</p>
                      <p className="text-sm text-muted-foreground">
                        Property Owner, Manhattan
                      </p>
                    </div>
                  </div>
                </Card>

                <Card
                  className="border-destructive/20 bg-destructive/5 p-6
                    transition-all duration-300 hover:shadow-lg"
                >
                  <blockquote className="mb-4 text-lg italic">
                    &ldquo;Traditional REITs give me exposure to real estate,
                    but I have zero control and the fees eat into returns. I
                    want to invest in specific properties I believe in.&rdquo;
                  </blockquote>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-10 w-10 items-center justify-center
                        rounded-full bg-muted"
                    >
                      <span className="text-sm font-medium">AL</span>
                    </div>
                    <div>
                      <p className="font-medium">Angela Liu</p>
                      <p className="text-sm text-muted-foreground">
                        Investor, San Francisco
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Visual Comparison */}
              <div className="space-y-6">
                <Card className="bg-card/80 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-semibold">
                    The Opportunity Cost
                  </h3>
                  <div className="space-y-4">
                    <div
                      className="flex items-center justify-between rounded-lg
                        bg-destructive/10 p-4"
                    >
                      <span className="font-medium">Locked Capital</span>
                      <span className="text-2xl font-bold text-destructive">
                        $500k
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg
                        bg-muted/50 p-4"
                    >
                      <span className="font-medium">
                        Annual Opportunity Cost (12% APY)
                      </span>
                      <span className="text-2xl font-bold text-muted-foreground">
                        $60k/year
                      </span>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-lg
                        bg-primary/10 p-4"
                    >
                      <span className="font-medium">
                        With PropertyX (45% share)
                      </span>
                      <span className="text-2xl font-bold text-primary">
                        $225k liquid
                      </span>
                    </div>
                  </div>
                </Card>

                <Alert className="border-primary/20 bg-primary/5">
                  <Icons.trendingUp className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Bottom Line:</strong> Every year you wait costs you
                    $6,000+ in missed opportunities while your property equity
                    sits idle.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="how-it-works" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-balance">
                PropertyX: The Dual-Token Solution
              </h2>
              <p
                className="mx-auto max-w-3xl text-xl text-pretty
                  text-muted-foreground"
              >
                Unlock liquidity without selling through our innovative APT +
                PXT token system
              </p>
            </div>

            {/* How It Works Process */}
            <div className="mb-16">
              <h3 className="mb-12 text-center text-2xl font-semibold">
                How It Works in 5 Steps
              </h3>
              <div className="grid gap-6 md:grid-cols-5">
                {[
                  {
                    step: 1,
                    title: "Property Assessment",
                    desc: "Professional valuation & tokenization analysis",
                  },
                  {
                    step: 2,
                    title: "Smart Contract Deploy",
                    desc: "Clarity contracts secure ownership & distributions",
                  },
                  {
                    step: 3,
                    title: "APT Token Launch",
                    desc: "Fractional ownership tokens (45% cash flow rights)",
                  },
                  {
                    step: 4,
                    title: "Capital Access",
                    desc: "Owner receives immediate liquidity from token sales",
                  },
                  {
                    step: 5,
                    title: "Ongoing Returns",
                    desc: "Automated monthly distributions + BTC rewards",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="bg-card/80 p-6 text-center backdrop-blur-sm
                      transition-all duration-300 hover:scale-105
                      hover:shadow-lg"
                  >
                    <div
                      className="mx-auto mb-4 flex h-12 w-12 items-center
                        justify-center rounded-full bg-primary"
                    >
                      <span
                        className="text-xl font-bold text-primary-foreground"
                      >
                        {item.step}
                      </span>
                    </div>
                    <h4 className="mb-2 font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Key Differentiators */}
            <div className="grid gap-8 lg:grid-cols-3">
              <Card
                className="border-primary/20 bg-gradient-to-br from-primary/5
                  to-primary/10 p-8 transition-all duration-300 hover:scale-105
                  hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icons.shield className="h-8 w-8 text-primary" />
                  <h3 className="text-xl font-semibold">
                    vs. Traditional Real Estate
                  </h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-primary"
                    />
                    <span>No need to sell or refinance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-primary"
                    />
                    <span>Maintain full ownership control</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-primary"
                    />
                    <span>Access capital in weeks, not months</span>
                  </li>
                </ul>
              </Card>

              <Card
                className="border-secondary/20 bg-gradient-to-br
                  from-secondary/5 to-secondary/10 p-8 transition-all
                  duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icons.bitcoin className="h-8 w-8 text-secondary" />
                  <h3 className="text-xl font-semibold">
                    vs. Other Crypto Projects
                  </h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-secondary"
                    />
                    <span>Real assets, not speculation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-secondary"
                    />
                    <span>Bitcoin-secured smart contracts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-secondary"
                    />
                    <span>Transparent, auditable cash flows</span>
                  </li>
                </ul>
              </Card>

              <Card
                className="border-chart-1/20 bg-gradient-to-br from-chart-1/5
                  to-chart-1/10 p-8 transition-all duration-300 hover:scale-105
                  hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Icons.building className="h-8 w-8 text-chart-1" />
                  <h3 className="text-xl font-semibold">vs. REITs</h3>
                </div>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-chart-1"
                    />
                    <span>Choose specific properties</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-chart-1"
                    />
                    <span>Lower fees, higher returns</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Icons.checkCircle
                      className="h-4 w-4 flex-shrink-0 text-chart-1"
                    />
                    <span>Governance voting rights</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-balance">
                Core Features & Benefits
              </h2>
              <p
                className="mx-auto max-w-3xl text-xl text-pretty
                  text-muted-foreground"
              >
                Everything you need for transparent, profitable real estate
                tokenization
              </p>
            </div>

            {/* Feature Cards */}
            <div className="mb-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Icons.building,
                  title: "APT Fractionalization",
                  desc: "Convert property equity into tradeable tokens representing 45% of net operating income",
                  color: "text-primary",
                },
                {
                  icon: Icons.bitcoin,
                  title: "BTC Rewards",
                  desc: "Earn additional Bitcoin rewards on top of cash distributions through our yield enhancement program (Coming Soon)",
                  color: "text-secondary",
                },
                {
                  icon: Icons.users,
                  title: "PXT Governance",
                  desc: "Vote on protocol decisions, property improvements, and distribution schedules with governance tokens",
                  color: "text-chart-1",
                },
                {
                  icon: Icons.shield,
                  title: "Clarity Smart Contracts",
                  desc: "Bitcoin-secured contracts ensure transparent, automated distributions and immutable ownership records",
                  color: "text-chart-2",
                },
                {
                  icon: Icons.trendingUp,
                  title: "Non-Dilutive Liquidity",
                  desc: "Access capital without giving up ownership control or taking on debt obligations",
                  color: "text-chart-3",
                },
                {
                  icon: Icons.target,
                  title: "Transparent Reporting",
                  desc: "Real-time dashboards show property performance, cash flows, and token holder distributions",
                  color: "text-chart-4",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="cursor-pointer bg-card/80 p-6 backdrop-blur-sm
                    transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center
                    rounded-lg transition-all duration-300 ${
                      hoveredFeature === index
                        ? "scale-110 bg-primary/20"
                        : "bg-muted/50"
                    }`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </Card>
              ))}
            </div>

            {/* Comparison Table */}
            <Card className="mb-16 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  PropertyX vs. Alternatives
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="p-4 text-left">Feature</th>
                        <th className="bg-primary/5 p-4 text-center">
                          PropertyX
                        </th>
                        <th className="p-4 text-center">Traditional REIT</th>
                        <th className="p-4 text-center">Property Sale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Maintain Ownership", "✓", "✗", "✗"],
                        ["Choose Specific Assets", "✓", "✗", "N/A"],
                        ["Immediate Liquidity", "✓", "✓", "✓"],
                        ["Ongoing Cash Flow", "✓", "✓", "✗"],
                        ["Low Fees", "✓", "✗", "✗"],
                        ["Governance Rights", "✓", "Limited", "N/A"],
                        ["Bitcoin Rewards", "✓", "✗", "✗"],
                      ].map((row, index) => (
                        <tr
                          key={index}
                          className="border-b transition-colors
                            hover:bg-muted/20"
                        >
                          <td className="p-4 font-medium">{row[0]}</td>
                          <td className="bg-primary/5 p-4 text-center">
                            <span
                              className={
                                row[1] === "✓" ? "font-bold text-primary" : ""
                              }
                            >
                              {row[1]}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={
                                row[2] === "✗" ? "text-destructive" : ""
                              }
                            >
                              {row[2]}
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            <span
                              className={
                                row[3] === "✗" ? "text-destructive" : ""
                              }
                            >
                              {row[3]}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Investment Calculator */}
            <Card
              className="border-primary/20 bg-gradient-to-br from-primary/5
                to-secondary/5"
            >
              <CardHeader>
                <CardTitle className="text-center text-2xl">
                  Investment Impact Calculator
                </CardTitle>
                <CardDescription className="text-center">
                  See how PropertyX compares to traditional real estate
                  investments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <h4 className="font-semibold">
                      Traditional Property Investment
                    </h4>
                    <div className="space-y-3 rounded-lg bg-background/50 p-4">
                      <div className="flex justify-between">
                        <span>Initial Investment:</span>
                        <span className="font-medium">$100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Cash Flow (6%):</span>
                        <span className="font-medium">$6,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Liquidity:</span>
                        <span className="font-medium text-destructive">
                          Locked
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Management Required:</span>
                        <span className="font-medium text-destructive">
                          High
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">PropertyX APT Investment</h4>
                    <div className="space-y-3 rounded-lg bg-primary/10 p-4">
                      <div className="flex justify-between">
                        <span>Initial Investment:</span>
                        <span className="font-medium">$100,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Annual Cash Flow (8.5%):</span>
                        <span className="font-medium text-primary">$8,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BTC Bonus (estimated):</span>
                        <span className="font-medium text-secondary">
                          $2,400
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Liquidity:</span>
                        <span className="font-medium text-primary">
                          Tradeable
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Management Required:</span>
                        <span className="font-medium text-primary">None</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Total Annual Return:</span>
                        <span className="text-primary">$10,900 (10.9%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-balance">
                What Our Community Says
              </h2>
              <p
                className="mx-auto max-w-3xl text-xl text-pretty
                  text-muted-foreground"
              >
                Real stories from property owners and investors who&apos;ve
                experienced PropertyX
              </p>
            </div>

            {/* Testimonial Cards - Removed Video Section */}
            <div className="mb-16 grid gap-8 lg:grid-cols-3">
              {[
                {
                  name: "David Chen",
                  role: "Property Owner, San Francisco",
                  rating: 5,
                  text: "PropertyX helped me unlock $300k from my duplex without losing ownership. The process was smooth, and I'm earning more from the APT distributions than I was from rent alone.",
                  avatar: "DC",
                  image: "/placeholder.svg?height=400&width=400",
                },
                {
                  name: "Sarah Williams",
                  role: "Real Estate Investor",
                  rating: 5,
                  text: "I've been investing in REITs for years, but PropertyX gives me the control I've always wanted. I can choose specific properties and the returns are significantly better.",
                  avatar: "SW",
                  image: "/placeholder.svg?height=400&width=400",
                },
                {
                  name: "Michael Torres",
                  role: "Property Developer, Austin",
                  rating: 5,
                  text: "The Bitcoin rewards are a game-changer. Not only do I get steady cash flow from my tokenized properties, but the BTC bonuses have added an extra 15% to my annual returns.",
                  avatar: "MT",
                  image: "/placeholder.svg?height=400&width=400",
                },
              ].map((testimonial, index) => (
                <Card
                  key={index}
                  className="bg-card/80 p-6 backdrop-blur-sm transition-all
                    duration-300 hover:scale-105 hover:shadow-lg"
                >
                  {/* Simplified avatar without image per request */}
                  <div className="mb-4 flex items-center justify-center">
                    <div
                      className="flex h-16 w-16 items-center justify-center
                        rounded-full bg-gradient-to-br from-primary/30
                        to-secondary/30 text-lg font-semibold text-primary
                        shadow-inner"
                    >
                      {testimonial.avatar}
                    </div>
                  </div>
                  <div className="mb-4 flex items-center justify-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-5 w-5 items-center justify-center
                          rounded-full bg-primary"
                      >
                        <span className="text-xs text-primary-foreground">
                          ★
                        </span>
                      </div>
                    ))}
                  </div>
                  <blockquote
                    className="mb-6 text-center text-lg text-muted-foreground
                      italic"
                  >
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <div className="text-center">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </Card>
              ))}
            </div>

            {/* Media Mentions removed per request */}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-bold text-balance">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-pretty text-muted-foreground">
                Everything you need to know about PropertyX tokenization
              </p>
            </div>

            {/* FAQ Tabs */}
            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { id: "legal", label: "Legal & Compliance" },
                  { id: "investment", label: "Investment Process" },
                  { id: "returns", label: "Returns & Rewards" },
                  { id: "technical", label: "Technical" },
                ].map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                    className="transition-all duration-300"
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* FAQ Content */}
            <div className="space-y-4">
              {activeTab === "legal" && (
                <div className="animate-in space-y-4 duration-500 fade-in">
                  {[
                    {
                      q: "Is PropertyX legally compliant?",
                      a: "Yes, PropertyX operates under existing securities regulations. All APT tokens are properly registered and compliant with federal and state laws. We work with top legal firms specializing in digital securities.",
                    },
                    {
                      q: "What happens to my ownership rights?",
                      a: "Property owners retain full legal ownership and control. APT tokens represent economic rights to cash flow distributions, not ownership transfer. You maintain all decision-making authority over your property.",
                    },
                    {
                      q: "Are there any regulatory risks?",
                      a: "We continuously monitor regulatory developments and maintain compliance with all applicable laws. Our legal structure is designed to adapt to evolving regulations in the digital securities space.",
                    },
                  ].map((faq, index) => (
                    <Card
                      key={index}
                      className="bg-card/80 p-6 backdrop-blur-sm transition-all
                        duration-300 hover:shadow-lg"
                    >
                      <h4 className="mb-3 font-semibold">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "investment" && (
                <div className="animate-in space-y-4 duration-500 fade-in">
                  {[
                    {
                      q: "What's the minimum investment amount?",
                      a: "The minimum investment varies by property but typically starts at $1,000 for APT tokens. This allows broad access to high-quality real estate investments that were previously only available to institutional investors.",
                    },
                    {
                      q: "How do I evaluate properties before investing?",
                      a: "Each property listing includes comprehensive due diligence materials: financial statements, property inspections, market analysis, and projected returns. We also provide third-party appraisals and legal documentation.",
                    },
                    {
                      q: "Can I sell my APT tokens?",
                      a: "Yes, APT tokens are designed to be tradeable on secondary markets. Liquidity typically develops within 30-60 days of initial token launch, allowing you to exit your position if needed.",
                    },
                  ].map((faq, index) => (
                    <Card
                      key={index}
                      className="bg-card/80 p-6 backdrop-blur-sm transition-all
                        duration-300 hover:shadow-lg"
                    >
                      <h4 className="mb-3 font-semibold">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "returns" && (
                <div className="animate-in space-y-4 duration-500 fade-in">
                  {[
                    {
                      q: "How are distributions calculated and paid?",
                      a: "APT holders receive 45% of the property's net operating income, distributed monthly via smart contract. Payments are automatic and transparent, with all transactions recorded on the blockchain.",
                    },
                    {
                      q: "What are Bitcoin rewards and how do they work?",
                      a: "Bitcoin rewards are additional yield enhancements paid to early investors and long-term holders. These come from protocol fees and strategic partnerships, typically adding 2-4% to your annual returns.",
                    },
                    {
                      q: "What's the expected annual return?",
                      a: "Target returns vary by property but typically range from 8-12% annually from cash distributions, plus potential Bitcoin rewards. Past performance of pilot properties has exceeded these targets.",
                    },
                  ].map((faq, index) => (
                    <Card
                      key={index}
                      className="bg-card/80 p-6 backdrop-blur-sm transition-all
                        duration-300 hover:shadow-lg"
                    >
                      <h4 className="mb-3 font-semibold">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              )}

              {activeTab === "technical" && (
                <div className="animate-in space-y-4 duration-500 fade-in">
                  {[
                    {
                      q: "Why use Bitcoin's blockchain instead of Ethereum?",
                      a: "Bitcoin's Clarity smart contracts offer superior security and predictability. The Bitcoin network's proven stability and security make it ideal for long-term real estate investments worth millions of dollars.",
                    },
                    {
                      q: "How secure are the smart contracts?",
                      a: "All smart contracts are audited by leading blockchain security firms and use Clarity's deterministic execution model. This eliminates many common vulnerabilities found in other smart contract platforms.",
                    },
                    {
                      q: "What if there's a technical issue with distributions?",
                      a: "Smart contracts include multiple failsafes and manual override capabilities. In the unlikely event of technical issues, our team can ensure distributions continue through backup systems while resolving any problems.",
                    },
                  ].map((faq, index) => (
                    <Card
                      key={index}
                      className="bg-card/80 p-6 backdrop-blur-sm transition-all
                        duration-300 hover:shadow-lg"
                    >
                      <h4 className="mb-3 font-semibold">{faq.q}</h4>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section (Redesigned) */}
      <section className="relative overflow-hidden py-24">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-40">
          <div
            className="absolute inset-0 bg-gradient-to-br from-primary/10
              via-background to-secondary/10"
          />
          <div
            className="absolute top-1/2 left-1/2 h-[600px] w-[600px]
              -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20
              blur-3xl"
          />
        </div>
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl text-center">
            <Badge variant="secondary" className="mb-6">
              Future of Property Yield
            </Badge>
            <h2 className="mb-6 text-4xl font-bold text-balance md:text-5xl">
              Ready to Tokenize or Invest with Confidence?
            </h2>
            <p className="mx-auto mb-12 max-w-3xl text-xl text-muted-foreground">
              Secure your position in the next evolution of urban real estate.
              Whether you&apos;re unlocking capital from property or seeking
              yield with on-chain transparency—PropertyX gives you both.
            </p>
            <div
              className="mx-auto mb-12 grid max-w-4xl gap-6 text-left
                sm:grid-cols-2"
            >
              {[
                {
                  icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                  title: "On-Chain, Audited Cash Flows",
                  text: "Automated monthly distributions—no opaque intermediaries.",
                },
                {
                  icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                  title: "Low Entry, High Clarity",
                  text: "Access institutional-grade deals starting around $1K.",
                },
                {
                  icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                  title: "BTC-Aligned Rewards",
                  text: "Earn additional Bitcoin incentives for early support.",
                },
                {
                  icon: <Icons.checkCircle className="h-5 w-5 text-primary" />,
                  title: "Keep Ownership, Unlock Capital",
                  text: "Raise funds without selling equity or taking on debt.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 rounded-lg border
                    border-primary/10 bg-card/70 p-5 backdrop-blur-sm
                    transition-colors hover:bg-card/90"
                >
                  <div
                    className="mt-1 flex h-8 w-8 items-center justify-center
                      rounded-full bg-primary/15"
                  >
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col items-center justify-center">
              <ConnectWallet
                size={"lg"}
                className="w-full max-w-md px-10 py-7 text-lg font-medium
                  shadow-xl transition-all duration-300 hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
