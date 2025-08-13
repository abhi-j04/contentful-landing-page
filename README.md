
# Contentful Landing Page

A modern landing page built with Next.js 14, TypeScript, Tailwind CSS, and Contentful CMS.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Contentful CMS** for content management
- **Responsive design**
- **SEO optimized**

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Contentful account

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abhi-j04/contentful-landing-page.git
   cd contentful-landing-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Fill in your Contentful credentials
   ```

4. **Set up Contentful content models**
   ```bash
   npm run contentful:setup
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm run contentful:setup` - Create Contentful content models
- `npm run contentful:export` - Export existing content models

## 📁 Project Structure
├── src/
│ ├── app/ # Next.js App Router pages
│ ├── components/ # Reusable React components
│ ├── lib/ # Utility functions and configurations
│ ├── types/ # TypeScript type definitions
│ ├── hooks/ # Custom React hooks
│ └── utils/ # Utility functions
├── scripts/ # Build and deployment scripts
├── contentful/ # Contentful-related files
└── public/ # Static assets

## 🎨 Content Models

- **Hero Section**: Main landing page hero with title, subtitle, and CTA
- **Feature**: Individual features with icon, title, and description

## 🚀 Deployment

This project can be deployed to Vercel, Netlify, or any platform supporting Next.js.

### Vercel Deployment

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

## 📝 License

This project is licensed under the MIT License.