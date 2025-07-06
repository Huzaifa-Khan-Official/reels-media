import { asyncHandler } from "@/utils/asyncHandler";
import { nextResponse } from "@/utils/Response";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export const GET = asyncHandler(
    async (req: NextRequest) => {
        const token = await getToken({ req: req });

        if (!token?.id) return nextResponse(401, "Unauthorized");

        const userId = token.id;

        return nextResponse(200, "Success", userId);
    }
)