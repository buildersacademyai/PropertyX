const ERROR_MESSAGES = {
  401: "You are not authorized to view this resource. Please log in.",
  403: "You do not have permission to perform this action.",
  500: "An unexpected server error occurred. Please try again later.",
  GENERIC_ERROR: "Something went wrong. Please try again.",
  NETWORK_ERROR:
    "Network error, unable to reach the server. Please check your connection.",
  BAD_REQUEST: "Bad request",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Access forbidden",
  NOT_FOUND: "Resource not found",
  VALIDATION_ERROR: "Validation error",
  SERVER_ERROR: "Internal server error",
  SERVICE_UNAVAILABLE: "Service temporarily unavailable",
}

export default ERROR_MESSAGES
