import type { EventHandler,EventHandlerRequest, H3Event } from "h3";

// Error response - always type: "error"
export type ApiError = {
  type: "error";
  title: string;
  detail: string;
  status: number;
  errors?: {
    field: string;
    issue: string;
  }[];
};

// Success response - always type: "success"
export type ApiSuccess<T> = {
  type: "success";
  data: T;
};

// Union type
export type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Helper to create error responses
export function apiError(error: Omit<ApiError, "type">): ApiError {
  return { type: "error", ...error };
}

// Helper to create success responses
export function apiSuccess<T>(data: T): ApiSuccess<T> {
  return { type: "success", data };
}

// Simplified wrapper - only needs the Data type
export function useDefineHandler<
  Data,
  Request extends EventHandlerRequest = EventHandlerRequest
>(
  handler: (event: H3Event<Request>) => Promise<ApiResponse<Data>>
): EventHandler<Request, Promise<ApiResponse<Data>>> {
  return defineEventHandler<Request, Promise<ApiResponse<Data>>>(handler);
}
