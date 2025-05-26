'use client'
// import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { JetBrains_Mono } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { BookmarkProvider } from '@/context/useBookmarks'
import { PromotionProvider } from '@/context/usePromotions'

import './globals.css'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

// export const metadata: Metadata = {
//   title: 'HR Dashboard',
//   description: 'built by Nikhil Pulluri',
// }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} dark antialiased`}>
        <SessionProvider>
          <BookmarkProvider>
            <PromotionProvider>
              <Theme>{children}</Theme>
            </PromotionProvider>
          </BookmarkProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
