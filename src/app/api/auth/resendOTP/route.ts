import User from "@/models/user.model";
import UserOTP from "@/models/userOTP.model";
import { asyncHandler } from "@/utils/asyncHandler";
import { dbConnect } from "@/utils/db.util";
import { generateOtp } from "@/utils/generateOTP";
import { nextResponse } from "@/utils/Response";
import { sendEmail } from "@/utils/sendMail";
import { NextRequest } from "next/server";

export const POST = asyncHandler(
    async (req: NextRequest) => {
        const { userId } = await req.json();

        if (!userId) {
            return nextResponse(400, "User ID is required");
        }

        await dbConnect();

        await UserOTP.deleteMany({ userId });

        const user = await User.findOne({ _id: userId });

        if (!user) {
            return nextResponse(404, "User not found");
        }

        await sendEmail({ _id: userId, email: user.email, username: user.username, otp: generateOtp() });

        return nextResponse(200, "OTP sent successfully");
    }
)