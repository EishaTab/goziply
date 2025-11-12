import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/app/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcrypt";

// ✅ Helper to return only minimal safe user fields
function minimalUser(user) {
  if (!user) return null;
  // Ensure the role is included in the minimal user object for session access
  const { _id, firstName, lastName, email, role } = user.toObject?.() || user;
  return { id: _id?.toString?.() || user.id, firstName, lastName, email, role };
}

export const authOptions = {
  providers: [
    // 🔹 Email + Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        const user = await User.findOne({ email: credentials.email });
        
        if (!user) throw new Error("No user found with this email");

        // 💡 CRITICAL CHANGE: ENFORCE TASKER ROLE
        if (user.role !== 'tasker') {
            throw new Error("Access denied: This login is for Taskers only."); 
        }
        
        // This check is still necessary for *old* Tasker accounts created before the fix
        if (!user.isVerified) throw new Error("Please verify your email first"); 

        if (user.password === "gauth") throw new Error("Use Google Sign-In for this account");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) throw new Error("Invalid credentials");

        return minimalUser(user);
      },
    }),

    // 🔹 Google OAuth Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    // 🔹 Build JWT token (runs on login and every session refresh)
    async jwt({ token, user, account, profile, trigger, session }) {
      await connectDB();

      // Handle Google login or signup
      if (account?.provider === "google") {
        let dbUser = await User.findOne({ email: profile.email });

        if (!dbUser) {
          dbUser = await User.create({
            firstName: profile.given_name || profile.name?.split(" ")[0],
            lastName: profile.family_name || profile.name?.split(" ")[1] || "",
            email: profile.email,
            password: "gauth",
            isVerified: true,
            countryCode: "+1",
            phone: "0000000000",
             // 💡 IMPORTANT: Google signups need a role too, default to 'customer' or 'tasker' based on your intended use.
             // Setting to 'customer' here, as Taskers typically use credentials.
             role: 'customer', 
          });
        } else if (!dbUser.isVerified) {
          dbUser.isVerified = true;
          await dbUser.save();
        }

        token.user = minimalUser(dbUser);
      }

      // Handle standard credentials login
      if (user) {
        token.user = minimalUser(user);
      }

      // Handle live session updates (if triggered manually)
      if (trigger === "update" && session?.user) {
        token.user = { ...token.user, ...session.user };
      }

      return token;
    },

    // 🔹 Control what goes into the client session
    async session({ session, token }) {
      if (token?.user) {
        session.user = {
          id: token.user.id,
          firstName: token.user.firstName,
          lastName: token.user.lastName,
          email: token.user.email,
             role: token.user.role, // Ensure role is available on the client
        };
      }
      return session;
    },
  },

  pages: { signIn: "/auth" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };