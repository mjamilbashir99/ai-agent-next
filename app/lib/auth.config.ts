import type { AuthOptions } from "next-auth";
import Twitter from "next-auth/providers/twitter";

export const authConfig: AuthOptions = {
  providers: [
    Twitter({
      clientId: "UFFJb21fVnFKb2hRdGF4UEFNemc6MTpjaQ",
      clientSecret: "rB8Cdbl5Bpu75JKbNi-g1Ox0yg3TTj3a_4P6vCTY2stFsfkaFt",
      version: "2.0",
    }),
  ],
  secret: "3981af3191e9123cf85aafa8cc7ad0be6005413568343dd914a6ef4908d47866",
  debug: true,
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    },
  },
};