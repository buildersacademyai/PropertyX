import * as React from "react"
import { Card } from "@/components/ui/card"
import { Skeleton as Skel } from "@/components/ui/skeleton"
import { Icons } from "@/components/common/icons"

const LoadingApt: React.FC = () => {
  const placeholders = [1, 2]
  return (
    <div
      className="container mx-auto min-h-screen px-4 py-12"
      aria-busy="true"
      aria-live="polite"
      role="status"
    >
      <div className="mb-10 space-y-3">
        <Skel className="h-8 w-48" />
        <Skel className="h-4 w-96 max-w-full" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {placeholders.map((i) => (
          <Card key={i} className="group w-full overflow-hidden rounded-lg p-0">
            <div className="grid grid-cols-1 md:grid-cols-6">
              <div
                className="relative col-span-3 col-start-1 flex h-48
                  items-center justify-center border-r bg-accent/30 md:h-full"
              >
                <div className="absolute inset-0 animate-pulse bg-accent/40" />
                <Icons.building
                  className="relative text-muted-foreground opacity-60"
                  size={36}
                />
              </div>
              <div
                className="col-span-3 col-start-4 flex flex-col justify-between
                  px-4 py-6"
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Skel className="h-3 w-32" />
                    <Skel className="h-6 w-40" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="space-y-2">
                      <Skel className="h-3 w-20" />
                      <Skel className="h-4 w-28" />
                    </div>
                    <div className="space-y-2">
                      <Skel className="h-3 w-20" />
                      <Skel className="h-4 w-16" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                  <Skel className="h-10 w-full flex-1" />
                  <Skel className="h-10 w-full flex-1" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <span className="sr-only">Loading your tokenized properties...</span>
    </div>
  )
}

export default LoadingApt
