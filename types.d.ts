import { Connection } from "mongoose";

declare global {
    var mongoose: {
        connection: Connection | null;
        promise: Promise<Connection> | null;
    }

    interface Reel {
    id: string
    videoUrl: string
    thumbnail: string
    user: {
        username: string
        avatar: string
        isVerified: boolean
    }
    description: string
    likes: number
    comments: number
    shares: number
    isLiked: boolean
    isBookmarked: boolean
}
}

export { }