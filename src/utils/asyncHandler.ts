import { NextRequest, NextResponse } from "next/server";
import { nextResponse } from "./Response";
import { ApiError } from './ApiError';

const asyncHandler = (
  fn: (req: NextRequest) => Promise<NextResponse>
) => {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
      if (error instanceof ApiError) {
        return nextResponse(error.statusCode, error.message, error.data);
      }
      return nextResponse(500, error instanceof Error ? error.message : "Internal Server Error");
    }
  };
};

export { asyncHandler };