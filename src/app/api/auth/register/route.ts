import User from "@/models/user.model";
import { usernameValidation } from "@/schemas/register.schema";
import { dbConnect } from "@/utils/db.util";
import { generateOtp } from "@/utils/generateOTP";
import { nextResponse } from "@/utils/Response";
import { sendEmail } from "@/utils/sendMail";
import { signIn } from "next-auth/react";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { email, password, username } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const checkUsernameUniqueness = usernameValidation.safeParse({
            username
        })

        if (!checkUsernameUniqueness.success) {
            console.log("Error at username validation ==>", checkUsernameUniqueness.error);
            return NextResponse.json(
                { error: "Invalid username" },
                { status: 400 }
            );
        }

        await dbConnect();

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const user = await User.create({ email, password, username });

        if (!user) return nextResponse(500, "Failed to register user.");

        await sendEmail({ _id: user._id as string, email, username, otp: generateOtp() });

        return nextResponse(200, "Verification email sent successfully. Please check your inbox.");
    } catch (error) {
        console.log("Error at user registration ==>", error);
        return NextResponse.json(
            { message: "Failed to register user." },
            { status: 500 }
        );
    }
}