/**
 * Auth.js v5 configuration with Resend magic link provider.
 *
 * Uses JWT session strategy (no database sessions needed).
 * The signIn callback creates a user in db.ts if not exists.
 * JWT and session callbacks expose the user's tier to the client.
 */

import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { getUserByEmail, createUser } from "@/lib/db";

declare module "next-auth" {
  interface Session {
    user: {
      email: string;
      tier: "free" | "premium";
    };
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    tier?: "free" | "premium";
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.AUTH_RESEND_KEY,
      from: process.env.EMAIL_FROM ?? "Oracle Cards <no-reply@authjs.dev>",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    verifyRequest: "/auth/verify",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      // Create user in DB if they don't exist yet
      const existing = await getUserByEmail(user.email);
      if (!existing) {
        await createUser(user.email);
      }
      return true;
    },
    async jwt({ token }) {
      if (token.email) {
        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          token.tier = dbUser.tier;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.tier = (token.tier as "free" | "premium") ?? "free";
      }
      return session;
    },
  },
});
