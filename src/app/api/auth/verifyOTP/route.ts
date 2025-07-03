import { nextResponse } from "@/utils/Response";
import { NextRequest } from "next/server";
import UserOTP from "@/models/userOTP.model";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req: req });
        
        const userId = token?.id;
        const { otp } = await req.json();

        if (!otp) {
            return nextResponse(400, "OTP is required");
        }
        
        const verificationRecords = await UserOTP.find({ userId });

        if (verificationRecords.length === 0) {
            return nextResponse(404, "No OTP record found. Please request a new OTP.");
        }

        const { expiresAt, otp: hashedOTP } = verificationRecords[0];

        if (expiresAt < new Date()) {
            await UserOTP.deleteMany({ userId });
            return nextResponse(400, "OTP has expired. Please request a new one.");
        }

        const isOTPValid = await bcrypt.compare(otp, hashedOTP);
        if (!isOTPValid) {
            return nextResponse(400, "Invalid OTP. Please try again.");
        }

        await User.findByIdAndUpdate(
            userId,
            { isVerified: true },
            { new: true }
        );

        await UserOTP.deleteMany({ userId });

        return nextResponse(200, "OTP verified successfully");
    } catch (error) {
        return nextResponse(500, "Failed to verify OTP");
    }
}