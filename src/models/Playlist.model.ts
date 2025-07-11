import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

export interface IPlayList {
    name: string;
    videos: mongoose.Types.ObjectId[];
    userId: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const playlistSchema = new Schema<IPlayList>({
    name: {
        type: String,
        required: [true, "Playlist name is required"],
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video",
            index: true
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        index: true
    }
}, { timestamps: true });

const Playlist = models?.Playlist || model<IPlayList>("Playlist", playlistSchema);

export default Playlist;