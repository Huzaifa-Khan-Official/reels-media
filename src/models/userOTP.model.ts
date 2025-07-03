import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

interface UserOTP {
    userId: mongoose.Types.ObjectId;
    otp: string;
    expiresAt: Date;
}

const userOTPSchema = new Schema<UserOTP>({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    otp: { type: String },
    expiresAt: { type: Date },
}, { timestamps: true });


const UserOTP = models?.UserOTP || model<UserOTP>("UserOTP", userOTPSchema);

export default UserOTP;