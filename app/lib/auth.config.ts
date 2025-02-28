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
      clientId: "QnE5UGtyZHBSbzV4ZGNqLWpqV1o6MTpjaQ",
      clientSecret: "18oRqU7rXotoNEmlV6d-5JKwFWoyA75tHSh9DgeccEeMl6PEQw",
      version: "2.0",
      authorization: {
        params: {
          scope: "users.read tweet.read email",
        },
      },
    }),
  ],
  secret: "f13b18ca71e997bfcf1507ec27da005fa2f0d952b9f87be16fdce32e4e1a8579",
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