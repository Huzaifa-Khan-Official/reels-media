import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "./db.util";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { configs } from "@/constants/configs";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email or password is missing.");
                }
                try {
                    await dbConnect();
                    const user = await User.findOne({ email: credentials.email });
                    if (!user) {
                        throw new Error("User not found.");
                    }
                    const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
                    if (!isPasswordValid) {
                        throw new Error("Invalid password.");
                    }
                    return {
                        id: user._id.toString(),
                        email: user.email,
                        username: user.username,
                    };
                } catch (error) {
                    console.log("Error at login ==>", error);
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret: configs.nextAuthSecret,
};