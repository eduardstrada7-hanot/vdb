import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Velvet Bridal Makeovers | Indian Bridal Makeup & Hair Artist',
    template: '%s | Velvet Bridal Makeovers',
  },
  description:
    'Luxury Indian bridal makeup and hair by Divya. Specializing in South Asian weddings, Sangeet, Mehandi, Haldi, Engagement, Reception, and all celebrations. Book your bridal look today.',
  keywords: [
    'Indian bridal makeup',
    'South Asian bridal hair',
    'wedding makeup artist',
    'bridal makeover',
    'mehandi makeup',
    'sangeet glam',
    'haldi look',
    'reception makeup',
    'Indian wedding beauty',
    'Divya makeup artist',
  ],
  authors: [{ name: 'Divya — Velvet Bridal Makeovers' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://velvetbridalmakeovers.com',
    siteName: 'Velvet Bridal Makeovers',
    title: 'Velvet Bridal Makeovers | Indian Bridal Makeup & Hair Artist',
    description:
      'Luxury Indian bridal makeup and hair by Divya. Where Every Celebration Begins with Beauty.',
    images: [
      {
        url: 'https://www.instagram.com/velvet_bridal_makeovers',
        width: 1200,
        height: 630,
        alt: 'Velvet Bridal Makeovers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Velvet Bridal Makeovers',
    description: 'Luxury Indian Bridal & Event Hair + Makeup by Divya',
  },
  metadataBase: new URL('https://velvetbridalmakeovers.com'),
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
