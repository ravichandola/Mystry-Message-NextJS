# Mystery Message

A modern Next.js application for secure message handling and email communications.

## 🚀 Features

- **Modern Stack**: Built with Next.js 15 and React 19
- **Type Safety**: Full TypeScript support
- **Styling**: Tailwind CSS for modern, responsive design
- **Email Integration**: React Email for beautiful email templates
- **Authentication**: Secure user authentication with bcryptjs
- **Database**: MongoDB integration with Mongoose
- **Validation**: Data validation using Zod
- **Performance**: Uses Turbopack for faster development
- **Font Optimization**: Optimized font loading with next/font
- **Dark Mode**: Built-in dark mode support

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (Latest LTS version recommended)
- npm or yarn or pnpm or bun

## 🛠 Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd mystry-message
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add necessary environment variables.

## 🚀 Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📦 Project Structure

```
mystry-message/
├── src/
│   ├── app/           # Next.js App Router components
│   ├── types/         # TypeScript type definitions
│   ├── helpers/       # Utility functions
│   ├── lib/          # Library code and configurations
│   ├── schemas/      # Zod validation schemas
│   ├── model/        # MongoDB models
│   └── emails/       # Email templates
├── public/           # Static assets
└── ...config files
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🛡 Security

This project implements several security best practices:

- Password hashing with bcryptjs
- Type-safe database operations
- Input validation with Zod
- Secure email handling

## 📚 Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB with Mongoose
- **Email**: React Email & Resend
- **Validation**: Zod
- **Authentication**: bcryptjs
- **Development**: Turbopack
- **Linting**: ESLint

## 🚀 Deployment

The application can be easily deployed on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/mystry-message)

For other deployment options, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## 📝 License

This project is licensed under the terms of the license included with this repository.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📧 Support

For support, email [your-email] or create an issue in the repository.
