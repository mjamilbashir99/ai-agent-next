import type { AuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";

export const authConfig: AuthOptions = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
      authorization: {
        params: {
          scope: "users.read tweet.read email",
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        console.log("JWT Callback", { account, user });
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session Callback", { session, token });
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
