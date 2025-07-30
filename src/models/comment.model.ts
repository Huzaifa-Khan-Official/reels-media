import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IComment {
    _id?: mongoose.Types.ObjectId;
    comment: string;
    parentCommentId?: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    videoId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface CommentWithReplies extends IComment {
    replies: CommentWithReplies[]
}

const commentSchema = new Schema<IComment>({
    comment: {
        type: String,
        required: [true, "Comment is required"],
    },
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
    parentCommentId: {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: null
    }
}, { timestamps: true });

const Comment = models?.Comment || model<IComment>("Comment", commentSchema);

export default Comment;