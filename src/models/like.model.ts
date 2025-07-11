import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface ILike {
    userId: mongoose.Types.ObjectId;
    videoId: mongoose.Types.ObjectId;
    like: number;
}

const likeSchema = new Schema<ILike>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        index: true
    },
    like: {
        type: Number,
        default: 0
    }
});

const Like = models?.Like || model<ILike>("Like", likeSchema);

export default Like;