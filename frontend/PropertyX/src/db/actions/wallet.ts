"use server"

import { cookies } from "next/headers"

export async function setWalletAddress(stxAddress: string) {
  const cookieStore = await cookies()

  cookieStore.set("stx-address", stxAddress, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  })
}

export async function clearWalletAddress() {
  const cookieStore = await cookies()
  cookieStore.delete("stx-address")
}

export async function getWalletAddress(): Promise<string | null> {
  const cookieStore = await cookies()
  return cookieStore.get("stx-address")?.value || null
}
