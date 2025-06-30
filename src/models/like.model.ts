import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface ILike {
    user: mongoose.Types.ObjectId;
    video: mongoose.Types.ObjectId;
    like: number;
}

const likeSchema = new Schema<ILike>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    video: {
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