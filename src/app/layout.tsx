import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Layout } from '@/components/layout'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Critical resource hints */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
        
        {/* Preload critical mobile hero image */}
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=75"
          media="(max-width: 768px)"
        />
      </head>
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
