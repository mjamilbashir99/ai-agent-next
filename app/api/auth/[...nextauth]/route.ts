import NextAuth from "next-auth";
import { authConfig } from "@/app/lib/auth.config";

console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
console.log("TWITTER_CLIENT_ID exists:", !!process.env.TWITTER_CLIENT_ID);
console.log("TWITTER_CLIENT_SECRET exists:", !!process.env.TWITTER_CLIENT_SECRET);
console.log("NEXTAUTH_SECRET exists:", !!process.env.NEXTAUTH_SECRET);

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST }; 