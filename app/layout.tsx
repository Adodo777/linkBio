import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { getSiteData } from '@/lib/site-data'

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

const data = getSiteData()
const { profile, links, trustPoints, theme } = data


export const metadata: Metadata = {
  title: profile.name,
  description: profile.slogan,
  icons: {
    icon: [
      {
        url: profile.avatarUrl,
        media: '(prefers-color-scheme: light)',
      },
      {
        url: profile.avatarUrl,
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: profile.avatarUrl,
  },
}

export const viewport: Viewport = {
  themeColor: '#1a1525',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body
        className={`${dmSans.variable} ${playfair.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
