// Import required dependencies
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbconnect from "@/lib/dbConnect";
import UserModel from "@/model/user";

// Define and export NextAuth configuration options
export const authOptions: NextAuthOptions = {
  providers: [
    // Configure credentials provider for email/password authentication
    CredentialsProvider({
      // Unique identifier for this provider
      id: "credentials",
      // Display name for the provider
      name: "Credentials",
      // Define the credentials fields that will be shown in the login form
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Authorization function that validates credentials and returns user data
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any): Promise<any> {
        try {
          // Establish connection to MongoDB database
          await dbconnect();

          // Search for user by email or username in the database
          // The identifier can be either email or username
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { username: credentials.identifier },
            ],
          });

          // If no user is found, throw an error
          if (!user) {
            throw new Error("User not found");
          }

          // Check if user has verified their email address
          if (!user.isVerified) {
            throw new Error("Please verify your email to login");
          }

          // Compare provided password with hashed password in database
          const passwordsMatch = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          // If passwords don't match, throw authentication error
          if (!passwordsMatch) {
            throw new Error("Invalid credentials");
          }

          // Return user object if authentication is successful
          // This will be encoded in the JWT token
          return user;
        } catch (error) {
          // Re-throw any errors that occur during authorization
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
