import Comment from "@/models/comment.model";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const POST = asyncHandler(
    async (req: NextRequest): Promise<NextResponse> => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "Please sign in first to post a reply!");
        }

        const { comment, videoId, parentCommentId } = await req.json();

        if (!comment || !videoId || !parentCommentId) {
            throw new ApiError(400, "Missing required fields!");
        }

        const reply = await Comment.create({
            comment,
            userId: session?.user.id,
            videoId,
            parentCommentId,
        })

        if (!reply) {
            throw new ApiError(500, "Failed to add reply!");
        }

        return nextResponse(200, "Reply added", reply)
    })