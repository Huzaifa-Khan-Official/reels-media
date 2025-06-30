import Video, { IVideo } from "@/models/video.model";
import { authOptions } from "@/utils/authOptions.util";
import { dbConnect } from "@/utils/db.util";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect();

        const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

        if (!videos || videos.length === 0) {
            return NextResponse.json([], { status: 200 });
        }

        return NextResponse.json(videos, { status: 200 });

    } catch (error) {
        console.log("Error at getting videos ==>", error);
        return NextResponse.json({ error: "Failed to get videos" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const body: IVideo = await req.json();

        if (!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl) {
            return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
        }

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

        return NextResponse.json(newVideo, { status: 200 });
    } catch (error) {
        console.log("Error at creating video ==>", error);
        return NextResponse.json({ error: "Failed to create video" }, { status: 500 });
    }
}