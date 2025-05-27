// 'use client'
import type { Metadata } from 'next'
// import { SessionProvider } from 'next-auth/react'
import AuthProvider from '@/components/providers/session-provider'
import { JetBrains_Mono } from 'next/font/google'
import '@radix-ui/themes/styles.css'
import { Theme } from '@radix-ui/themes'
import { BookmarkProvider } from '@/context/useBookmarks'
import { PromotionProvider } from '@/context/usePromotions'
import { BookmarkPresenceProvider } from '@/context/useBookmarkPresence'

import './globals.css'

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'HR Dashboard',
  description: 'built by Nikhil Pulluri',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} dark antialiased`}>
        <BookmarkPresenceProvider>
          <BookmarkProvider>
            <PromotionProvider>
              <Theme>
                <AuthProvider>{children}</AuthProvider>
              </Theme>
            </PromotionProvider>
          </BookmarkProvider>
        </BookmarkPresenceProvider>
      </body>
    </html>
  )
}
