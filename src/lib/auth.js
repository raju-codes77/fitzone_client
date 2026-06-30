import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("fitzone");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // Allow requests from your frontend domain


  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, { client }),

  user: {
    additionalFields: {
      role: { defaultValue: "user" },
      isBlocked: { defaultValue: false },
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      strategy: "jwt",
      maxAge: 60 * 60 * 24 * 30, // 30 days in seconds (not minutes!)
    },
  },

  

  plugins: [jwt()],
});