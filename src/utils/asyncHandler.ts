import { NextRequest, NextResponse } from "next/server";
import { nextResponse } from "./Response";

const asyncHandler = (fn: (req: NextRequest) => Promise<NextResponse>) => {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error) {
    return nextResponse(500, error instanceof Error ? error.message : "Internal Server Error");
    }
  };
};

export { asyncHandler };