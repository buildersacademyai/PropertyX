import axios, {
  AxiosError,
  CanceledError,
  InternalAxiosRequestConfig,
} from "axios"

import ERROR_MESSAGES from "./custom-errors"

export interface ApiErrorResponse {
  message: string
  error: string
}

export class ApiError extends Error {
  status: number
  originalError: Error
  constructor(message: string, status: number, originalError: Error) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.originalError = originalError
  }
}

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    if (!error.response) {
      const networkError = new ApiError(
        ERROR_MESSAGES.NETWORK_ERROR || "Network error occurred",
        0,
        error
      )
      return Promise.reject(networkError)
    }

    const { status, data } = error.response
    let message = ERROR_MESSAGES.GENERIC_ERROR || "Something went wrong"

    if (data?.message) {
      message = data.message
    } else if (data?.error) {
      message = data.error
    }

    switch (status) {
      case 400:
        message = data?.message || ERROR_MESSAGES.BAD_REQUEST || "Bad request"
        break
      case 401:
        message = ERROR_MESSAGES.UNAUTHORIZED || "Unauthorized access"
        break
      case 403:
        message = ERROR_MESSAGES.FORBIDDEN || "Access forbidden"
        break
      case 404:
        message = ERROR_MESSAGES.NOT_FOUND || "Resource not found"
        break
      case 422:
        message =
          data?.message || ERROR_MESSAGES.VALIDATION_ERROR || "Validation error"
        break
      case 500:
        message = ERROR_MESSAGES.SERVER_ERROR || "Internal server error"
        break
      case 503:
        message =
          ERROR_MESSAGES.SERVICE_UNAVAILABLE ||
          "Service temporarily unavailable"
        break
    }

    const apiError = new ApiError(message, status, error)
    return Promise.reject(apiError)
  }
)

export { apiClient, CanceledError }
