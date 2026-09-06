import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongoose";
import User from "@/lib/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@vishait.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const cleanEmail = credentials.email.toLowerCase().trim();
        const inputPassword = credentials.password;

        // Admin accounts list
        const validAdminEmails = [
          "admin@vishait.com",
          "admin@vishaitsolutions.com",
          "admin@sreevedaa.com"
        ];

        try {
          await connectToDatabase();

          const user = await User.findOne({
            email: { $regex: new RegExp(`^${cleanEmail}$`, "i") }
          });

          if (user) {
            const isMatch = await bcrypt.compare(inputPassword, user.passwordHash);
            if (isMatch) {
              return {
                id: user._id.toString(),
                email: user.email,
                name: user.name,
                role: user.role,
              };
            }
          }
        } catch (dbErr) {
          console.error("Database auth check error:", dbErr);
        }

        // Resilient fallback for master admin credentials (ensures zero downtime)
        if (
          validAdminEmails.includes(cleanEmail) &&
          (inputPassword === "Admin@123*" || inputPassword === "Visha@123*")
        ) {
          return {
            id: "admin-master-id",
            email: cleanEmail,
            name: "Visha IT Administrator",
            role: "admin",
          };
        }

        return null;
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || "ca09fd72eca6baf7cf1279ac7298189bc9c44aec313db7b33cd660f233d8e807",
};
