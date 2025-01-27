import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import mongoClient from "./mongo-client";

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth({
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(mongoClient),
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {},
        name: {},
      },
      authorize: async (credentials) => {
        if (credentials === null) {
          return null;
        }
        return {
          name: credentials.name as string,
          email: credentials.email as string,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials) {
    //     // Add your own logic here to validate credentials
    //     // This is just a placeholder
    //     if (
    //       credentials?.email === "user@example.com" &&
    //       credentials?.password === "password"
    //     ) {
    //       return { id: "1", name: "User", email: "user@example.com" };
    //     }
    //     return null;
    //   },
    // }),
  ],
  callbacks: {},
  //   pages: {
  //     signIn: "/login",
  //     signOut: "/logout",
  //     error: "/error",
  //   },
  //   callbacks: {
  //     async jwt({ token, user }) {
  //       if (user) {
  //         token.id = user.id;
  //       }
  //       return token;
  //     },
  //     async session({ session, token }) {
  //       if (session.user) {
  //         session.user.id = token.id as string;
  //       }
  //       return session;
  //     },
  //   },
});
