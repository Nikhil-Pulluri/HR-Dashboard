'use client'

import { FC, useMemo } from 'react'
// import Image from 'next/image'
import { FaStar, FaBookmark, FaEye, FaArrowUp } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useBookmarks } from '@/context/useBookmarks'
import { usePromotions } from '@/context/usePromotions'

export type User = {
  id: number
  firstName: string
  lastName: string
  email: string
  age: number
  gender: 'male' | 'female'
  image?: string
  company: {
    department: string
  }
}

type Props = {
  user: User
}

const UserCard: FC<Props> = ({ user }) => {
  const fullName = `${user.firstName} ${user.lastName}`
  const router = useRouter()
  const rating = useMemo(() => Math.floor(Math.random() * 5) + 1, [])
  const { bookmarkedUserIds, toggleBookmark } = useBookmarks()
  const { promotedUserIds, togglePromotion } = usePromotions()

  const imageUrl = useMemo(() => {
    const genderPath = user.gender === 'female' ? 'women' : 'men'
    const imageId = user.id % 100
    return `https://randomuser.me/api/portraits/${genderPath}/${imageId}.jpg`
  }, [user.gender, user.id])

  return (
    <div className="max-w-sm w-full bg-white rounded-xl shadow-md border border-gray-700 dark:bg-neutral-800 hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden">
      <div className="p-6 space-y-5">
        <div onClick={() => router.push(`/dashboard/employee/${user.id}`)} className="flex items-center cursor-pointer gap-4">
          <img src={imageUrl} alt={fullName} width={56} height={56} className="rounded-full border object-cover" />
          <div>
            <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{fullName}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>

        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-1">
          <p>
            <strong>Age:</strong> {user.age}
          </p>
          <p>
            <strong>Department:</strong> {user.company.department}
          </p>
        </div>

        <div className="flex items-center gap-1 pl-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
          ))}
        </div>

        <div className="flex justify-end gap-4 pt-2 text-gray-600 dark:text-gray-300">
          <button title="View">
            <FaEye className="hover:text-blue-500 transition" />
          </button>
          <button title="Bookmark">
            <FaBookmark onClick={() => toggleBookmark(user.id)} className={`hover:text-yellow-500 ${bookmarkedUserIds && bookmarkedUserIds.includes(user.id) ? 'text-yellow-500' : ''} transition`} />
          </button>
          <button title="Promote">
            <FaArrowUp onClick={() => togglePromotion(user.id)} className={`hover:text-green-500 transition ${promotedUserIds && promotedUserIds.includes(user.id) ? 'text-green-500' : ''}`} />
          </button>
        </div>
      </div>
      <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </div>
  )
}

export default UserCard
