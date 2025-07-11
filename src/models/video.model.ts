import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export const Video_Dimensions = {
    width: 1080,
    height: 1920,
} as const;

export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
    isPublic?: boolean;
    transformation?: {
        height: number;
        width: number;
        quality?: number;
    }
    createdAt?: Date;
    updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    videoUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    controls: {
        type: Boolean,
        default: true,
    },
    transformation: {
        height: {
            type: Number,
            default: Video_Dimensions.height,
        },
        width: {
            type: Number,
            default: Video_Dimensions.width,
        },
        quality: {
            type: Number,
            min: 1,
            max: 100,
        },
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    likes: {
        type: Number,
        default: 0,
    },
    comments: {
        type: Number,
        default: 0,
    },
    shares: {
        type: Number,
        default: 0,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    }
}, {
    timestamps: true,
});

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;