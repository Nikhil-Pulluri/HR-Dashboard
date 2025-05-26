'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type BookmarkContextType = {
  bookmarkedUserIds: number[]
  toggleBookmark: (userId: number) => void
  bookmarksLoaded: boolean
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined)

const BookmarkProvider = ({ children }: { children: ReactNode }) => {
  const [bookmarkedUserIds, setBookmarkedUserIds] = useState<number[]>([])
  const [bookmarksLoaded, setBookmarksLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('bookmarkedUserIds')
    if (stored) {
      setBookmarkedUserIds(JSON.parse(stored))
    }
    setBookmarksLoaded(true)
  }, [])

  useEffect(() => {
    if (bookmarksLoaded) {
      localStorage.setItem('bookmarkedUserIds', JSON.stringify(bookmarkedUserIds))
    }
  }, [bookmarkedUserIds, bookmarksLoaded])

  const toggleBookmark = (userId: number) => {
    setBookmarkedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return <BookmarkContext.Provider value={{ bookmarkedUserIds, toggleBookmark, bookmarksLoaded }}>{children}</BookmarkContext.Provider>
}

const useBookmarks = () => {
  const context = useContext(BookmarkContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}

export { BookmarkProvider, useBookmarks }
