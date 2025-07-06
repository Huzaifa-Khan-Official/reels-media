import { configs } from "@/constants/configs";
import nodemailer from "nodemailer";
import UserOTP from "@/models/userOTP.model";
import bcrypt from "bcryptjs";
import { ApiError } from "./ApiError";

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: true,
    auth: {
        user: configs.gmail_user_mail,
        pass: configs.gmail_app_password
    }
});

interface OTPData {
    _id: string;
    email: string;
    username: string;
    otp: string;
}

const sendEmail = async ({ _id, email, username, otp }: OTPData) => {
    try {
        const emailTemplate = `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <h2>Account Verification</h2>
                <p>Hello ${username},</p>
                <p>Thank you for registering on our platform. To complete your registration, please verify your account using the OTP below:</p>
                <h3>${otp}</h3>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>Reels Media</p>
            </div>
        `;

        const saltRounds = 10;

        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        await UserOTP.create({
            userId: _id,
            otp: hashedOTP,
            expiresAt: new Date(Date.now() + 2 * 60 * 1000) // 2 minutes from now
        })

        await transporter.sendMail({
            from: configs.gmail_user_mail,
            subject: "Account Verification OTP",
            to: email,
            html: emailTemplate
        })
    } catch (error) {
        console.log("Error at sending email ==>", error);
        throw new ApiError(500, "Failed to send verification email.");
    }
}

export { sendEmail };