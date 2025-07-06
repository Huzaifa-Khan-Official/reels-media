import { NextResponse } from "next/server"
import { ApiResponse } from "./ApiResponse"

const nextResponse = (statusCode: number, message: string, data: any = null) => NextResponse.json(
    new ApiResponse(statusCode, message, data), { status: statusCode }
)

export { nextResponse }