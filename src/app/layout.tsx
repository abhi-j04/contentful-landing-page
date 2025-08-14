import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'
import { fetchFooterSection } from '@/lib/contentful-api'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  display: 'swap',
  preload: true
})

export const metadata: Metadata = {
  title: 'Landing Page | Built with Next.js & Contentful',
  description: 'A modern, responsive landing page showcasing professional web development skills',
  keywords: ['landing page', 'nextjs', 'contentful', 'typescript', 'tailwind'],
  authors: [{ name: 'Abhishek' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch footer data on server-side
  const footerResult = await fetchFooterSection();
  const footerData = footerResult.success ? footerResult.data : null;

  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://images.ctfassets.net" />
        <link rel="dns-prefetch" href="//images.ctfassets.net" />
      </head>
      <body className={inter.className}>
        <Layout footerData={footerData}>
          {children}
        </Layout>
      </body>
    </html>
  )
}
