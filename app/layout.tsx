import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  variable: '--font-geist-sans', 
  subsets: ['latin'],
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'DE-MAIZE | Digital Excellence in Marketing, Analytics, Innovation, Zeal & Engagement',
  description: 'Transforming businesses through strategic digital marketing, innovative web design, and cutting-edge software solutions. Your trusted partner for digital transformation.',
  keywords: ['DE-MAIZE', 'digital agency', 'web development', 'digital marketing', 'software solutions', 'digital transformation', 'analytics', 'innovation'],
  authors: [{ name: 'DE-MAIZE' }],
  openGraph: {
    title: 'DE-MAIZE | Digital Excellence in Marketing, Analytics, Innovation, Zeal & Engagement',
    description: 'Transforming businesses through strategic digital marketing, innovative web design, and cutting-edge software solutions.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a1628',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
