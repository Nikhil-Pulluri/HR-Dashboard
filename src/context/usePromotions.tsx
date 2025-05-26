'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type PromotionType = {
  promotedUserIds: number[]
  togglePromotion: (userId: number) => void
  promotionsLoaded: boolean
}

const PromotionContext = createContext<PromotionType | undefined>(undefined)

const PromotionProvider = ({ children }: { children: ReactNode }) => {
  const [promotedUserIds, setPromotedUserIds] = useState<number[]>([])
  const [promotionsLoaded, setPromotionsLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('promotedUserIds')
    if (stored) {
      setPromotedUserIds(JSON.parse(stored))
    }
    setPromotionsLoaded(true)
  }, [])

  useEffect(() => {
    if (promotionsLoaded) {
      localStorage.setItem('promotedUserIds', JSON.stringify(promotedUserIds))
    }
  }, [promotedUserIds, promotionsLoaded])

  const togglePromotion = (userId: number) => {
    setPromotedUserIds((prev) => (prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]))
  }

  return <PromotionContext.Provider value={{ promotedUserIds, togglePromotion, promotionsLoaded }}>{children}</PromotionContext.Provider>
}

const usePromotions = () => {
  const context = useContext(PromotionContext)
  if (context === undefined) {
    throw new Error('useBookmarks must be used within a BookmarkProvider')
  }
  return context
}

export { PromotionProvider, usePromotions }
