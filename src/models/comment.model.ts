import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IComment {
    comment: string;
    user: mongoose.Types.ObjectId;
    video: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    },
    video: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        index: true
    }
});

const Comment = models?.Comment || model<IComment>("Comment", commentSchema);

export default Comment;