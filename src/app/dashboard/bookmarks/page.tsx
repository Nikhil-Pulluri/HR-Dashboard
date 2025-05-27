'use client'

import { useEffect, useState } from 'react'
import UserCard, { User } from '@/components/card'
import { useBookmarks } from '@/context/useBookmarks'
import SkeletonCard from '@/components/skeletonCard'
import { useBookmarkPresence } from '@/context/useBookmarkPresence'

export default function Bookmarks() {
  const { bookmarkedUserIds, bookmarksLoaded } = useBookmarks()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const { setIsFromBookmark } = useBookmarkPresence()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: User[] = await Promise.all(
          bookmarkedUserIds.map(async (id) => {
            const res = await fetch(`https://dummyjson.com/users/${id}`)
            const data = await res.json()
            return data
          })
        )
        setUsers(fetchedUsers)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch bookmarked users', err)
      }
    }

    if (bookmarksLoaded && bookmarkedUserIds.length > 0) {
      fetchUsers()
    } else {
      setUsers([])
      setLoading(false)
    }
  }, [bookmarkedUserIds, bookmarksLoaded])

  if (!bookmarksLoaded || loading) return <SkeletonCard />

  return (
    <div className="overflow-auto p-6 flex flex-col space-y-4">
      <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">Bookmarks</div>
      <div onClick={() => setIsFromBookmark(true)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.length > 0 ? users.map((user) => <UserCard key={user.id} user={user} />) : <SkeletonCard />}
      </div>
    </div>
  )
}
