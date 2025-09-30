"use client"

import { forwardRef, useState } from "react"
import Image, { type ImageProps } from "next/image"
import { cn } from "@/lib/utils"

interface NextImageProps extends Omit<ImageProps, "onLoadingComplete"> {
  caption?: string
  containerClassName?: string
  skeletonClassName?: string
  captionClassName?: string
  showSkeleton?: boolean
  aspectRatio?: number
  onLoadingComplete?: () => void
  onError?: () => void
}

const NextImage = forwardRef<HTMLDivElement, NextImageProps>(
  (
    {
      caption,
      containerClassName,
      skeletonClassName,
      captionClassName,
      showSkeleton = true,
      aspectRatio,
      onLoadingComplete,
      onError,
      className,
      style,
      width,
      height,
      ...props
    },
    ref
  ) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)

    const calculatedAspectRatio =
      aspectRatio ||
      (typeof height === "number" && typeof width === "number" && width > 0
        ? height / width
        : undefined)

    const handleLoadingComplete = () => {
      setIsLoading(false)
      onLoadingComplete?.()
    }

    const handleError = () => {
      setIsLoading(false)
      setHasError(true)
      onError?.()
    }

    return (
      <div ref={ref} className={cn("w-full", containerClassName)}>
        <div
          className="relative w-full"
          style={{
            paddingBottom: calculatedAspectRatio
              ? `${calculatedAspectRatio * 100}%`
              : undefined,
            aspectRatio:
              !calculatedAspectRatio && width && height
                ? `${width} / ${height}`
                : undefined,
          }}
        >
          {showSkeleton && isLoading && !hasError && (
            <div
              className={cn(
                "absolute inset-0 animate-pulse rounded-md bg-muted",
                skeletonClassName
              )}
            />
          )}

          {hasError && (
            <div
              className="absolute inset-0 flex items-center justify-center
                rounded-md bg-muted"
            >
              <div className="text-sm text-muted-foreground">
                Failed to load image
              </div>
            </div>
          )}

          {!hasError && (
            <Image
              className={cn(
                `absolute top-0 left-0 h-full w-full rounded-md
                transition-opacity duration-500`,
                isLoading ? "opacity-0" : "opacity-100",
                className
              )}
              style={{
                objectFit: "cover",
                ...style,
              }}
              width={width}
              height={height}
              onLoad={handleLoadingComplete}
              onError={handleError}
              {...props}
            />
          )}
        </div>

        {caption && (
          <div
            className={cn(
              "mt-2 text-sm text-muted-foreground",
              captionClassName
            )}
          >
            {caption}
          </div>
        )}
      </div>
    )
  }
)

NextImage.displayName = "NextImage"

export default NextImage
export type { NextImageProps }
