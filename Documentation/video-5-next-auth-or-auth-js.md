---
description: >-
  Learn to implement secure authentication in Next.js using **Auth.js**,
  covering providers, callbacks, and route protection.
---

# Video 5 - Next Auth or Auth JS

Next.js Auth, now known as **Auth.js**, is a powerful solution for implementing authentication in Next.js applications. This guide delves into the more intricate aspects of setting it up, aiming to simplify what often appears complex in the official documentation.

***

### Installation and Core Structure

Getting started with Auth.js is straightforward. First, install it using npm:

Bash

```
npm install next-auth # or authjs
```

The core of your Auth.js setup resides within your Next.js project's `api` directory. You'll create an `auth` folder inside `api`, and within that, a dynamic route folder named `[...nextauth]`. This structure, similar to Next.js dynamic routing, will contain two crucial files:

* **`options.ts`** (or `.js`): This file houses all your Auth.js configuration. Separating this from the request handler is a best practice, especially for production environments.
* **`route.ts`** (or `.js`): This file handles the API requests for authentication.

***

### Key Concepts and Configuration

The backbone of Auth.js lies in understanding **Providers** and **Callbacks**.

**Providers** dictate the authentication methods available to your users. You can choose from:

* **Credentials**: Ideal for traditional email/password logins, requiring custom logic.
* **Email**: For passwordless authentication flows.
* **OAuth Providers**: Like Google, GitHub, and Facebook, which are generally simpler to set up, often just needing a **Client ID** and **Client Secret**.

**Callbacks** are essential for customizing Auth.js's behavior. The most important ones include:

* **`signIn`**: Executed during the sign-in process.
* **`redirect`**: Controls where users are redirected after authentication events.
* **`session`**: Crucial for managing user session data.
* **`jwt`**: Vital for handling JSON Web Tokens (JWTs).

You can also override default pages, such as `/auth/signin`, with custom paths using the **`pages`** option. For robust authentication, setting the **session strategy to "jwt"** is highly recommended. Finally, a **mandatory secret key** (e.g., `NEXTAUTH_SECRET` from environment variables) must be provided for secure token generation.

***

### Configuring `options.ts`: The Core Logic

The `options.ts` file is where you define your authentication strategy. You'll import `NextAuthOptions`, your chosen `Provider` (e.g., `CredentialsProvider`), and any database utilities (like `dbConnect` and your `User` model).

Within the exported `authOptions` object (typed as `NextAuthOptions`), you'll define your **providers array**.

#### Implementing a Credentials Provider

For a **Credentials Provider**, you'll:

1. **Define fields**: Specify the expected credentials (e.g., `email`, `password`) within the provider configuration. This helps Auth.js generate a basic UI form.
2. **Implement `authorize`**: This asynchronous method receives user-provided credentials. Here, you'll implement your custom authentication logic:
   * Connect to your database.
   * Find the user (e.g., by email or username).
   * Verify the user's existence and status (e.g., verified account).
   * Compare the provided password against the stored hashed password (using a library like `bcrypt`).
   * If authentication is successful, return the **user object**. Otherwise, return `null` or throw an error, which Auth.js will handle.

#### Customizing Callbacks for JWT

The `jwt` and `session` callbacks are paramount for JWT-based authentication:

* **`jwt` callback**: When a user successfully authenticates via the `authorize` method, the `user` object is passed to this callback along with the `token`. This is your opportunity to **inject additional user data** (like `_id`, `isVerified`, `isAcceptingMessages`, `username`) from your database user object directly into the token. Remember to **return the modified token**. This strategy reduces subsequent database queries by embedding essential user data in the token.
* **`session` callback**: This callback receives the `session` object and the previously modified `token`. Here, you **transfer the custom data from the token to the `session.user` object**. This makes your custom user data accessible via the `session` object throughout your application. Again, **return the modified session**.

***

### Modifying TypeScript Types

To leverage the custom fields you've added to the token and session, you need to extend Auth.js's default TypeScript types. Create a declaration file (e.g., `next-auth.d.ts`) and use `declare module "next-auth"` to extend the existing `User`, `Session`, and `JWT` interfaces with your custom fields (e.g., `_id`, `isVerified`), specifying their types.

***

### Configuring `route.ts`

The `route.ts` file is relatively straightforward:

1. Import `NextAuth` and your `authOptions` configuration.
2. Create a handler function by calling `NextAuth(authOptions)`.
3. Export this handler for both **`GET`** and **`POST`** requests, allowing Auth.js to manage the API routes.

***

### Implementing Middleware (`middleware.ts`)

Middleware is crucial for **protecting routes** and managing redirects based on authentication status. Create a `middleware.ts` file in your project's root or `src` directory.

1. Import `getToken` from `next-auth/jwt`.
2. Export a `config` object with a **`matcher` array** to specify the paths where the middleware should execute (e.g., `/signin`, `/dashboard/:path*`).
3. Implement the asynchronous default middleware function. Inside, retrieve the JWT token using `getToken`.
4. The middleware logic should handle redirects:
   * If a user **has a token** and attempts to access public authentication pages (like `/signin`), redirect them to a protected page (e.g., `/dashboard`).
   * If a user **lacks a token** and tries to access a protected route (e.g., `/dashboard`), redirect them to the sign-in page.

***

### Frontend Integration (Basic Example)

To enable client-side features of Auth.js, you'll need to wrap your application (typically in `layout.tsx`) with a **`SessionProvider`** from `next-auth/react`. You might create a custom component like `AuthProvider.tsx` to encapsulate this. This setup enables hooks like `useSession` and the generation of provider-based sign-in buttons.

***

### Conclusion

Implementing custom authentication with Auth.js, especially with custom callbacks and type modifications, requires careful attention to detail. However, by breaking it down into these components, the process becomes much more manageable. Always refer to the official documentation and review your code diligently to ensure a robust and secure authentication system.

Do you have a specific authentication flow in mind that you'd like to explore further, or perhaps a particular provider you're interested in implementing?
