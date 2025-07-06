import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse"

const nextResponse = <T = unknown>(statusCode: number, message: string, data?: T) => NextResponse.json(
    new ApiResponse<T>(statusCode, message, data),
    { status: statusCode }
);

export { nextResponse }