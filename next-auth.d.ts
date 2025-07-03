import NextAuth, {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            isVerified: boolean;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        username; string;
        isVerified: boolean;
    }
}