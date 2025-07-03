// import { authOptions } from "@/utils/authOptions.util";
// import { nextResponse } from "@/utils/Response";
// import { getServerSession } from "next-auth";
// import { NextRequest } from "next/server";

// export async function POST(req: NextRequest) {
//     try {
//         const session = await getServerSession(authOptions);
//         const { otp } = await req.json();

//         console.log("otp ==>", otp);
//         console.log("session ==>", session);

//         // if (!userId || !otp) {
//         //     throw Error("Empty otp details are not allowed");
//         // } else {
//         //     const verificationResponse = await UserOTP.find({
//         //         userId
//         //     })

//         //     if (verificationResponse.length <= 0) {
//         //         throw Error("Account record does'nt exit or has been verified already. Please sign up or log in.");
//         //     } else {
//         //         const { expiresAt } = verificationResponse[0];

//         //         const hashedOTP = verificationResponse[0].otp;

//         //         if (expiresAt < Date.now()) {
//         //             await UserOTP.deleteMany({ userId });

//         //             throw new Error("Code has expired. Please request again.");
//         //         } else {
//         //             const isOTPMatched = await bcrypt.compare(otp, hashedOTP);

//         //             if (!isOTPMatched) {
//         //                 throw new Error("Invalid OTP. Please try again.");
//         //             } else {
//         //                 const updatedUser = await User.findByIdAndUpdate(userId,
//         //                     { isVerified: true },
//         //                     { new: true }
//         //                 );

//         //                 await UserOTP.deleteMany({ userId });

//         //                 res.status(200).json({
//         //                     _id: updatedUser._id,
//         //                     username: updatedUser.username,
//         //                     email: updatedUser.email,
//         //                     role: updatedUser.role,
//         //                     img: updatedUser.img,
//         //                     title: updatedUser.title,
//         //                     isVerified: updatedUser.isVerified,
//         //                 });
//         //             }
//         //         }
//         //     }
//         // }

//         return nextResponse(200, "OTP verified successfully")
//     } catch (error) {
//         console.log("Error in verifyOTP controller", error);
//         // res.status(500).json({
//         //     status: "FAILED",
//         //     message: error.message
//         // })

//         return nextResponse(500, "Failed to verify OTP")
//     }
// }

// export const resendOTP = async (req, res) => {
//     try {
//         const { _id: userId, email } = req.user;

//         if (!userId || !email) {
//             throw Error("Empty user details are not allowed");
//         } else {
//             await UserOTP.deleteMany({ userId });

//             await sendEmail({ _id: userId, email }, res);
//         }
//     } catch (error) {
//         console.log("Error in resendOTP controller", error.message);
//         res.status(500).json({
//             status: "FAILED",
//             message: error.message
//         })
//     }
// }



import { authOptions } from "@/utils/authOptions.util";
import { nextResponse } from "@/utils/Response";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";
import UserOTP from "@/models/userOTP.model";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { getToken } from "next-auth/jwt";

export async function POST(req: NextRequest) {
    try {
        // Get session with proper context
        // const session = await getServerSession(authOptions);
        const session = await getServerSession(authOptions)


        // if (!session?.user?.id) {
        //     return nextResponse(401, "Unauthorized - Please log in first");
        // }

        // const userId = session.user.id;
        // const { otp } = await req.json();

        // if (!otp) {
        //     return nextResponse(400, "OTP is required");
        // }

        // Find OTP record
        // const verificationRecords = await UserOTP.find({ userId });

        // if (verificationRecords.length === 0) {
        //     return nextResponse(404, "No OTP record found. Please request a new OTP.");
        // }

        // const { expiresAt, otp: hashedOTP } = verificationRecords[0];

        // Check expiration
        // if (expiresAt < new Date()) {
        //     await UserOTP.deleteMany({ userId });
        //     return nextResponse(400, "OTP has expired. Please request a new one.");
        // }

        // Verify OTP
        // const isOTPValid = await bcrypt.compare(otp, hashedOTP);
        // if (!isOTPValid) {
        //     return nextResponse(400, "Invalid OTP. Please try again.");
        // }

        // Update user verification status
        // const updatedUser = await User.findByIdAndUpdate(
        //     userId,
        //     { isVerified: true },
        //     { new: true }
        // );

        // Clean up OTP records
        // await UserOTP.deleteMany({ userId });

        // user: {
        //     _id: updatedUser._id,
        //     username: updatedUser.username,
        //     email: updatedUser.email,
        //     isVerified: updatedUser.isVerified,
        // }
        return nextResponse(200, "OTP verified successfully");
    } catch (error) {
        console.error("Error in verifyOTP controller:", error);
        return nextResponse(500, "Failed to verify OTP");
    }
}