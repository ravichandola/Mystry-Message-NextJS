# Mystery Message Application Implementation Documentation

## Changelog

### Documentation Updates (Latest)

1. **Authentication System**

   - Added Custom AuthProvider context implementation
   - Specified NextAuth route details
   - Added URI encoding for username security

2. **Validation Schemas**

   - Added Message Schema
     - Content validation rules
     - Timestamp validation specifications
   - Added Accept Message Schema
     - Message acceptance toggle functionality
     - User verification requirements

3. **API Routes**

   - Enhanced username availability check details
   - Added message acceptance toggle endpoint
   - Specified complete auth route path (`/api/auth/[...nextauth]`)

4. **Security Enhancements**

   - Added URI encoding for usernames
   - Added reusable verification for unverified users
   - Enhanced error type documentation

5. **Environment Configuration**

   - Added specific required variables:
     - NEXTAUTH_URL
     - DATABASE_URL
     - RESEND_API_KEY
   - Added development/production flags

6. **Project Structure**
   - Added core directory organization:
     - `/src/app` - Next.js 13+ app directory
     - `/src/lib` - Utility functions
     - `/src/model` - Database models
     - `/src/schemas` - Validation schemas
     - `/src/types` - TypeScript types
     - `/src/helpers` - Helper functions
     - `/emails` - Email templates
     - `/docs` - Project documentation

## 1. Database Schema (User Model)

### User Schema

- Username (String, unique, required)
- Email (String, unique, required, with email validation)
- Password (String, hashed, required)
- Verification Code (String, required)
- Verification Code Expiry (Date, required)
- Verification Status (Boolean, default: false)
- Message Acceptance Status (Boolean, default: false)
- Messages Array (Array of Message subdocuments)

### Message Schema (Subdocument)

- Content (String, required)
- Creation Timestamp (Date, auto-set to current time)

## 2. Authentication System

### Sign Up Process (`/api/sign-up`)

1. User Registration

   - Validates username, email, and password
   - Checks for existing users
   - Handles both new users and unverified existing users
   - Hashes passwords using bcrypt
   - Generates 6-digit verification code
   - Sets 1-hour expiry for verification code

2. Email Verification
   - Sends verification email using Resend
   - Custom React email template
   - Includes username and verification code

### Verification System (`/api/verify-code`)

- Validates verification codes
- Checks code expiration
- Updates user verification status
- Handles various error cases:
  - Invalid codes
  - Expired codes
  - User not found

### Sign In System (NextAuth)

- Credentials Provider implementation
- JWT-based authentication
- Custom session handling
- Protected route middleware
- Supports both email and username login
- Custom AuthProvider context

## 3. Validation Schemas (Zod)

### Sign Up Schema

- Username: 3-20 characters, alphanumeric only
- Email: Valid email format
- Password: Minimum 8 characters

### Sign In Schema

- Username: Minimum 3 characters
- Password: Minimum 8 characters

### Verify Schema

- Code: 6 characters validation

### Message Schema

- Content validation
- Timestamp validation

### Accept Message Schema

- Toggle message acceptance status
- User verification check

## 4. API Routes

### Username Availability Check (`/api/check-username-unique`)

- Checks if username is available
- Validates username format
- Returns availability status
- Handles unverified user cases

### Authentication Routes

- Sign In (`/api/auth/[...nextauth]`)
- Sign Up
- Verify Code
- Protected API endpoints
- Message acceptance toggle

## 5. Middleware Implementation

### Route Protection

- Protects dashboard routes
- Redirects authenticated users from auth pages
- Handles JWT token verification
- Custom auth context provider

## 6. Email System

### Verification Email

- Custom React email template (emails/verificationEmail.tsx)
- Sends via Resend API
- Includes:
  - Username
  - Verification code
  - Styling and formatting
- Error handling for email sending

## 7. Security Features

### Password Security

- Bcrypt hashing for passwords
- JWT for session management
- Secure route protection
- URI encoding for usernames

### Verification System

- Time-limited verification codes
- One-time use verification
- Expiry handling
- Reusable verification for unverified users

## 8. Error Handling

- Comprehensive error messages
- HTTP status codes
- Error logging
- User-friendly responses
- Custom error types

## 9. Type Definitions

### Extended NextAuth Types

- Custom User interface
- Extended Session interface
- Custom JWT interface
- Additional authentication properties
- API Response types

## 10. Database Connection

- MongoDB connection handling
- Connection pooling
- Error handling
- Model compilation protection
- Reusable connection utility

## 11. Environment Configuration

Required Environment Variables:

- NEXTAUTH_SECRET
- NEXTAUTH_URL
- DATABASE_URL
- RESEND_API_KEY
- Email service configuration
- Development/Production environment flags

## 12. Project Structure

### Core Directories

- `/src/app` - Next.js 13+ app directory
- `/src/lib` - Utility functions
- `/src/model` - Database models
- `/src/schemas` - Validation schemas
- `/src/types` - TypeScript types
- `/src/helpers` - Helper functions
- `/emails` - Email templates
- `/docs` - Project documentation
