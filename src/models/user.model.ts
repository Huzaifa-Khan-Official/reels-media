import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema, model, models } = mongoose;

export interface IUser {
    email: string;
    password: string;
    username: string;
    code?: string;
    codeExpiry?: Date;
    isVerified: boolean;
    followers: mongoose.Types.ObjectId[];
    following: mongoose.Types.ObjectId[];
    profilePic?: string;
    _id?: mongoose.Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    followers: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    following: {
        type: [Schema.Types.ObjectId],
        default: [],
    },
    profilePic: {
        type: String,
    },
}, {
    timestamps: true,
})

userSchema.pre("save", async function (this: IUser & mongoose.Document, next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;