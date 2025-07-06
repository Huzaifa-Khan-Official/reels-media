import User from "@/models/user.model";
import { usernameValidation } from "@/schemas/register.schema";
import { ApiError } from "@/utils/ApiError";
import { asyncHandler } from "@/utils/asyncHandler";
import { dbConnect } from "@/utils/db.util";
import { generateOtp } from "@/utils/generateOTP";
import { nextResponse } from "@/utils/Response";
import { sendEmail } from "@/utils/sendMail";
import { NextRequest } from "next/server";

export const POST = asyncHandler(
    async (req: NextRequest) => {
        const { email, password, username } = await req.json();

        const checkUsernameUniqueness = usernameValidation.safeParse({
            username
        })

        if (!checkUsernameUniqueness.success) {
            console.log("Error at username validation ==>", checkUsernameUniqueness.error);
            throw new ApiError(400, "Invalid username");
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            throw new ApiError(400, "User already exists");
        }

        const user = await User.create({ username, email, password });

        if (!user) {
            throw new ApiError(500, "Failed to register user.");
        }

        await sendEmail({ _id: user._id as string, email, username: user.username, otp: generateOtp() });

        return nextResponse(200, "Verification email sent successfully. Please check your inbox.", { id: user._id });
    }
)