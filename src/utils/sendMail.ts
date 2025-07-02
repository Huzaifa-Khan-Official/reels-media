import { configs } from "@/constants/configs";
import nodemailer from "nodemailer";
import {nextResponse} from "./Response"
import { NextResponse } from "next/server";
// import serverConfig from "../config/serverConfig.js";

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

// const sendEmail = async (email: string, code: string) => {
//     try {
//         const response = await transporter.sendMail({
//             from: configs.gmail_user_mail,
//             to: email,
//             subject: "Verification Code",
//             text: `Your verification code is: ${code}`
//         });

//         return response;
//     } catch (error) {
//         throw error;
//     }
// };

interface OTPData {
    email: string;
    username: string;
    otp: string;
}


const sendEmail = async ({ email, username, otp }: OTPData, res: NextResponse) => {
    try {
        const emailTemplate = `
            <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
                <h2>Account Verification</h2>
                <p>Hello ${username},</p>
                <p>Thank you for registering on our platform. To complete your registration, please verify your account using the OTP below:</p>
                <h3>${otp}</h3>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>Blogging Site Official</p>
            </div>
        `;

        const response = await transporter.sendMail({
            from: configs.gmail_user_mail,
            subject: "Account Verification OTP",
            to: email,
            html: emailTemplate
        })
        
        return nextResponse(200, "Verification email sent successfully. Please check your inbox.");
    } catch (error) {
        console.log("Error at sending email ==>", error);
        return nextResponse(404, "Error sending verification email.");
    }
}

export { sendEmail };