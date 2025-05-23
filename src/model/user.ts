// Import required dependencies from mongoose
import mongoose, { Schema, Document } from "mongoose";

// Interface representing a message document
export interface Message extends Document {
  content: string; // The content of the message
  createdAt: Date; // Timestamp when message was created
}

// Interface representing a user document with all properties
export interface User extends Document {
  username: string; // Unique username for the user
  email: string; // User's email address
  password: string; // Hashed password
  verifyCode: string; // Code sent for email verification
  verifyCodeExpiry: Date; // Expiration timestamp for verify code
  isVerified: boolean; // Whether email is verified
  isAcceptingMessages: boolean; // Whether user accepts new messages
  messages: Message[]; // Array of messages received by user
}

// Schema definition for Message subdocument
const MessageSchema: Schema<Message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now, // Automatically set to current timestamp
  },
});

// Main User schema definition
const UserSchema: Schema<User> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true, // Remove whitespace from both ends
    unique: true, // Ensure usernames are unique
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // Ensure emails are unique
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "Verify code is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false, // Users start unverified
  },
  isAcceptingMessages: {
    type: Boolean,
    default: false, // Users start with messages disabled
  },
  messages: {
    type: [MessageSchema],
    default: [], // Start with empty messages array
  },
});

// Create or retrieve the User model
// This prevents model recompilation errors in development
//You cannot compile a model with the same name more than once.
const User =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default User;
