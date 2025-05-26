// types/next-auth.d.ts
import NextAuth from "next-auth";

// Dummy usage to avoid ESLint error for unused import
type __NextAuthDummy = typeof NextAuth;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken: string;
  }

  interface User {
    id: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken?: string;
  }
}

export {__NextAuthDummy}; // Ensure module scope
