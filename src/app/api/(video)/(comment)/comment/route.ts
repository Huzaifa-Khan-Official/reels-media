import Comment from "@/models/comment.model";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { dbConnect } from "@/utils/db.util";
import { nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const buildCommentTree = (comments: any) => {
    const map = new Map<string, any>();
    const roots: any[] = [];

    comments.forEach((comment: any) => {
        map.set(comment._id, { ...comment, replies: [] });
    });

    comments.forEach((comment: any) => {
        if (comment.replyTo) {
            const parent = map.get(comment.replyTo);
            if (parent) {
                parent.replies.push(comment);
            }
        } else {
            roots.push(comment);
        }
    });

    return roots;
}

export const GET = asyncHandler(
    async (req: NextRequest): Promise<NextResponse> => {

        const { searchParams } = new URL(req.url);

        const videoId = searchParams.get("videoId");
        const commentId = searchParams.get("commentId");

        if (!videoId || !commentId) {
            throw new ApiError(400, "Video ID and Comment ID are required");
        }

        await dbConnect();

        const comments = await Comment.find({ video: videoId }).sort({ createdAt: -1 });

        if (!comments) {
            throw new ApiError(404, "Comments not found");
        }

        const tree = buildCommentTree(comments);

        return nextResponse(200, "Comments fetched successfully", tree);
    }
)

export const POST = asyncHandler(
    async (req: NextRequest): Promise<NextResponse> => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "Please sign in to leave a comment");
        }

        const { comment, videoId } = await req.json();

        if (!comment || !videoId) {
            throw new ApiError(400, "Comment and Video ID are required");
        }

        await dbConnect();

        const newComment = await Comment.create({
            comment,
            userId: session.user.id,
            videoId: videoId
        })

        if (!newComment) {
            throw new ApiError(500, "Failed to create comment");
        }

        return nextResponse(200, "Comments fetched successfully", newComment);
    }
)

export const DELETE = asyncHandler(
    async (req: NextRequest): Promise<NextResponse> => {
        const { searchParams } = new URL(req.url);

        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "Please sign in to delete a comment");
        }

        const videoId = searchParams.get("videoId");
        const commentId = searchParams.get("commentId");

        if (!videoId || !commentId) {
            throw new ApiError(400, "Video ID and Comment ID are required");
        }

        await dbConnect();

        const deletedComment = await Comment.findOneAndDelete({ video: videoId, _id: commentId, userId: session.user.id });

        if (!deletedComment) {
            throw new ApiError(404, "You cannot delete this comment");
        }

        return nextResponse(200, "Comment deleted successfully");
    }
)