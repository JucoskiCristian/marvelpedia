import type { Metadata } from 'next'
import { Bangers } from 'next/font/google'
import './globals.css'

const mainFontFamily = Bangers({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-family-main',
})

export const metadata: Metadata = {
  title: 'Marvel App',
  description: 'Marvel Hero List',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${mainFontFamily.variable} antialiased h-dvw`}>
      <body className="bg-hero-pattern">{children}</body>
    </html>
  )
}
