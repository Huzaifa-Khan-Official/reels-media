import { authOptions } from "@/utils/authOptions.util";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };