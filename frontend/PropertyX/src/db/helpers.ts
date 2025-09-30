import {
  createErrorReturn,
  createSuccessReturn,
  DalError,
  DalReturn,
  ThrowableDalError,
} from "@/db/type"
import { DrizzleQueryError } from "drizzle-orm"

export function dalThrowError<T, E extends DalError>(
  dalReturn: DalReturn<T, E>
) {
  if (dalReturn.success) return dalReturn

  throw dalReturn.error
}

export function dalVerifySuccess<T, E extends DalError>(
  dalReturn: DalReturn<T, E>
): T {
  const res = dalThrowError(dalReturn)
  return res.data
}

export async function dalDbOperation<T>(operation: () => Promise<T>) {
  try {
    const data = await operation()
    return createSuccessReturn(data)
  } catch (e) {
    if (e instanceof ThrowableDalError) {
      return createErrorReturn(e.dalError)
    }
    if (e instanceof DrizzleQueryError) {
      return createErrorReturn({ type: "drizzle-error", error: e })
    }
    return createErrorReturn({ type: "unknown-error", error: e })
  }
}

export function dalFormatErrorMessage(error: DalError) {
  const type = error.type
  switch (error.type) {
    case "invalid-address":
      return "The provided address is invalid."
    case "no-data":
      return "No data found."
    case "drizzle-error":
      return `A database error occurred`
    case "unknown-error":
      return `An unknown error occurred ` + error.error
    default:
      throw new Error(`Unhandled error type: ${type as never}`)
  }
}
