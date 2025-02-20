import type { AuthOptions, DefaultSession } from "next-auth";
import Twitter from "next-auth/providers/twitter";
import { JWT } from "next-auth/jwt";

interface ExtendedToken extends JWT {
  accessToken?: string;
  email?: string;
}

interface ExtendedSession extends DefaultSession {
  accessToken?: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}

export const authConfig: AuthOptions = {
  providers: [
    Twitter({
      clientId: "UFFJb21fVnFKb2hRdGF4UEFNemc6MTpjaQ",
      clientSecret: "rB8Cdbl5Bpu75JKbNi-g1Ox0yg3TTj3a_4P6vCTY2stFsfkaFt",
      version: "2.0",
      authorization: {
        params: {
          scope: "users.read tweet.read email",
        },
      },
    }),
  ],
  secret: "3981af3191e9123cf85aafa8cc7ad0be6005413568343dd914a6ef4908d47866",
  debug: true,
  callbacks: {
    async jwt({ token, account, user, profile }) {
      // Initial sign in
      if (account && user) {
        console.log("JWT Callback", { account, user, profile }); // Debug log
        return {
          ...token,
          accessToken: account.access_token,
          email: user.email || profile?.email,
          username: user.name,
        };
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token }); // Debug log
      
      // Send properties to the client
      session.accessToken = token.accessToken;
      if (token.email) {
        session.user.email = token.email;
      }
      
      return session;
    },
  },
};