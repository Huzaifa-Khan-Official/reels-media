import Video, { IVideo } from "@/models/video.model";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { authOptions } from "@/utils/authOptions.util";
import { dbConnect } from "@/utils/db.util";
import { nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = asyncHandler(
    async (): Promise<NextResponse> => {
        await dbConnect();

        const session = await getServerSession(authOptions);

        const loggedInUserId = session?.user.id;

        // const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        const videos = await Video.aggregate([
            {
                $sort: {
                    createdAt: -1
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "owner"
                }
            },
            {
                $lookup: {
                    from: "likes",
                    localField: "_id",
                    foreignField: "video",
                    as: "likes"
                }
            },
            {
                $addFields: {
                    likes: {
                        $size: {
                            $ifNull: ["$likes", []]
                        }
                    },
                    likedUserIds: {
                        $map: {
                            input: "$likes",
                            as: "like",
                            in: "$$like.userId"
                        }
                    }
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "likedUserIds",
                    foreignField: "_id",
                    as: "likedUsersInfo"
                }
            },
            ...(loggedInUserId ? [
                {
                    $lookup: {
                        from: "subscribes",
                        let: { videoOwner: "$userId" },
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$subscribedTo", "$$videoOwner"] },
                                        { $eq: ["$subscriber", new mongoose.Types.ObjectId(loggedInUserId)] }
                                    ]
                                }
                            }
                        }],
                        as: "subscriptionInfo"
                    }
                },
                {
                    $addFields: {
                        isSubscribed: {
                            $cond: {
                                if: {
                                    $gt: [{ $size: "$subscriptionInfo" }, 0],
                                    then: true,
                                    else: false
                                }
                            }
                        }
                    }
                }
            ] : [
                {
                    $addFields: {
                        isSubscribed: false
                    }
                }
            ]),
            {
                $project: {
                    owner: {
                        $map: {
                            input: "$owner",
                            as: "o",
                            in: {
                                username: "$$o.username",
                                profilePic: "$$o.profilePic"
                            }
                        }
                    },
                    likedUsers: {
                        $map: {
                            input: "$likedUsersInfo",
                            as: "o",
                            in: {
                                username: "$$o.username",
                                profilePic: "$$o.profilePic"
                            }
                        }
                    },
                    videoUrl: 1,
                    views: 1,
                    likes: 1,
                    user: 1,
                    isSubscribed: 1
                }
            }
        ]);

        if (!videos) {
            throw new ApiError(500, "Failed to fetch videos");
        }

        return nextResponse(200, "Videos fetched successfully", videos);
    }
)

export const POST = asyncHandler(
    async (req: NextRequest): Promise<NextResponse> => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new ApiError(401, "Please sign in first to post a reply!");
        }

        const body: IVideo = await req.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            throw new ApiError(400, "Missing required fields.");
        }

        await dbConnect();

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
                height: 1920,
                width: 1080,
                quality: body.transformation?.quality ?? 100,
            }
        }

        const newVideo = await Video.create(videoData);

        if (!newVideo) {
            throw new ApiError(500, "Failed to create video");
        }

        return nextResponse(200, "Video created successfully", newVideo);
    }
)