import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production", "test"]),
    DATABASE_URL: z.string().url().min(1),
    NEXTAUTH_URL: z.string().url().min(1),
    NEXTAUTH_SECRET: z.string().min(1),
    AUTH_GOOGLE_ID: z.string().min(1),
    AUTH_GOOGLE_SECRET: z.string().min(1),
    GOOGLE_REDIRECT_URI: z.string().url().min(1),
    GOOGLE_API_KEY: z.string().min(1),
    API_URL: z.string().url().min(1),
  },
  client: {
    // Add any client-side/public variables here (prefix with NEXT_PUBLIC_)
    // Example:
    // NEXT_PUBLIC_SOME_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    AUTH_GOOGLE_ID: process.env.AUTH_GOOGLE_ID,
    AUTH_GOOGLE_SECRET: process.env.AUTH_GOOGLE_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    API_URL: process.env.API_URL,
  },
});