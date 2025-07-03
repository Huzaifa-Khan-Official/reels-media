import { nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request });

    if (!token?.id) {
        return nextResponse(401, "Unauthorized");
    }

    const userId = token.id;

    return nextResponse(200, "Success", userId);
}