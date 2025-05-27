'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

type BookmarkPresenceContextType = {
  isFromBookmark: boolean
  setIsFromBookmark: (value: boolean) => void
}

const BookmarkPresenceContext = createContext<BookmarkPresenceContextType>({
  isFromBookmark: false,
  setIsFromBookmark: () => {},
})

export const BookmarkPresenceProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFromBookmark, setIsFromBookmark] = useState(false)
  const params = useParams() as { params?: string[] }

  useEffect(() => {
    const fromBookmark = params?.params?.includes('bookmarks') ?? false
    setIsFromBookmark(fromBookmark)
  }, [params])

  return <BookmarkPresenceContext.Provider value={{ isFromBookmark, setIsFromBookmark }}>{children}</BookmarkPresenceContext.Provider>
}

export const useBookmarkPresence = () => useContext(BookmarkPresenceContext)
