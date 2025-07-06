import { nextResponse } from "@/utils/Response";
import { NextRequest } from "next/server";
import UserOTP from "@/models/userOTP.model";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { asyncHandler } from "@/utils/asyncHandler";
import { dbConnect } from "@/utils/db.util";
import { ApiError } from "@/utils/ApiError";

export const POST = asyncHandler(
    async (req: NextRequest) => {
        const { otp, userId } = await req.json();

        if (!otp) throw new ApiError(400, "OTP is required");

        await dbConnect();

        const verificationRecords = await UserOTP.find({ userId });

        if (verificationRecords.length === 0) {
            throw new ApiError(404, "No OTP record found. Please request a new OTP.");
        }

        const { expiresAt, otp: hashedOTP } = verificationRecords[0];

        if (expiresAt < new Date()) {
            await UserOTP.deleteMany({ userId });
            throw new ApiError(400, "OTP has expired. Please request a new one.");
        }

        const isOTPValid = await bcrypt.compare(otp, hashedOTP);

        if (!isOTPValid) {
            throw new ApiError(400, "Invalid OTP. Please try again.");
        }

        await User.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true }
        );

        await UserOTP.deleteMany({ userId });

        return nextResponse(200, "OTP verified successfully");
    }
)