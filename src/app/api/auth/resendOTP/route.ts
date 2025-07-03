import UserOTP from "@/models/userOTP.model";
import { generateOtp } from "@/utils/generateOTP";
import { nextResponse } from "@/utils/Response";
import { sendEmail } from "@/utils/sendMail";
import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req: req });

        const userId = token?.id;
        const email = token?.email;

        if (!userId || !email) {
            return nextResponse(401, "Unauthorized");
        } else {
            await UserOTP.deleteMany({ userId });

            await sendEmail({ _id: userId, email, username: token?.username, otp: generateOtp() });
        }

        return nextResponse(200, "OTP sent successfully");
    } catch (error) {
        return nextResponse(500, "Failed to resend OTP");
    }
}
