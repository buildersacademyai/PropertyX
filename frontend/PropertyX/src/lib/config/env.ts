import { z } from "zod"

const serverSchema = z.object({
  DATABASE_URL: z
    .string()
    .url("DATABASE_URL must be a valid URL")
    .includes("postgresql", {
      message: "DATABASE_URL must be a PostgreSQL connection string",
    }),
  NODE_ENV: z.enum(["development", "production", "test"]),
})

const clientSchema = z.object({
  CONTRACT_ADDRESS: z
    .string()
    .length(
      41,
      "Contract address must be exactly 41 characters (including 0x)"
    ),
  NETWORK: z.enum(["devnet", "testnet", "mainnet"]),
})

const validateServerEnv = () => {
  const serverEnv = {
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
  }

  const result = serverSchema.safeParse(serverEnv)

  if (!result.success) {
    console.error("❌ Invalid server environment variables:")
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`)
    })
    throw new Error("Invalid server environment variables")
  }

  return result.data
}

const validateClientEnv = () => {
  const clientEnv = {
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    NETWORK: process.env.NEXT_PUBLIC_NETWORK,
  }

  const result = clientSchema.safeParse(clientEnv)

  if (!result.success) {
    console.error("❌ Invalid client environment variables:")
    result.error.issues.forEach((issue) => {
      console.error(`  - ${issue.path.join(".")}: ${issue.message}`)
      console.error(
        `  - Current value:`,
        clientEnv[issue.path[0] as keyof typeof clientEnv]
      )
    })
    throw new Error("Invalid client environment variables")
  }

  return result.data
}

export const env = {
  ...(typeof window === "undefined" ? validateServerEnv() : {}),
  ...validateClientEnv(),
} as z.infer<typeof serverSchema> & z.infer<typeof clientSchema>

export type Env = typeof env
