'use client'

import { useState, useEffect } from 'react'
import UserCard from '@/components/card'
import SkeletonCard from '@/components/skeletonCard'
import Select from 'react-select'
import { useBookmarks } from '@/context/useBookmarks'
import { usePromotions } from '@/context/usePromotions'

type Option = { label: string; value: string }

export type User = {
  id: number
  firstName: string
  lastName: string
  maidenName: string
  age: number
  gender: 'male' | 'female'
  email: string
  phone: string
  username: string
  password: string
  birthDate: string
  image: string
  bloodGroup: string
  height: number
  weight: number
  eyeColor: string
  hair: {
    color: string
    type: string
  }
  ip: string
  address: {
    address: string
    city: string
    state: string
    stateCode: string
    postalCode: string
    coordinates: {
      lat: number
      lng: number
    }
    country: string
  }
  macAddress: string
  university: string
  bank: {
    cardExpire: string
    cardNumber: string
    cardType: string
    currency: string
    iban: string
  }
  company: {
    department: string
    name: string
    title: string
    address: {
      address: string
      city: string
      state: string
      stateCode: string
      postalCode: string
      coordinates: {
        lat: number
        lng: number
      }
      country: string
    }
  }
  ein: string
  ssn: string
  userAgent: string
  crypto: {
    coin: string
    wallet: string
    network: string
  }
  role: string
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartments, setSelectedDepartments] = useState<Option[]>([])
  const [selectedRatings, setSelectedRatings] = useState<Option[]>([])

  const { bookmarksLoaded } = useBookmarks()
  const { promotionsLoaded } = usePromotions()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users?limit=20')
        const data = await response.json()
        setUsers(data.users)
        setFilteredUsers(data.users)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching users:', error)
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const departmentOptions: Option[] = Array.from(new Set(users.map((user) => user.company.department))).map((dept) => ({ label: dept, value: dept }))

  const ratingOptions: Option[] = [1, 2, 3, 4, 5].map((num) => ({
    label: `${num} Star${num > 1 ? 's' : ''}`,
    value: String(num),
  }))

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    const filtered = users.filter((user) => {
      const fullName = `${user.firstName} ${user.lastName}`.toLowerCase()
      const email = user.email.toLowerCase()
      const department = user.company.department.toLowerCase()
      const query = searchQuery.toLowerCase()

      const matchesQuery = fullName.includes(query) || email.includes(query) || department.includes(query)

      const matchesDepartment = selectedDepartments.length === 0 || selectedDepartments.some((opt) => opt.value === user.company.department)

      const userRating = (user.id % 5) + 1
      const matchesRating = selectedRatings.length === 0 || selectedRatings.some((opt) => Number(opt.value) === userRating)

      return matchesQuery && matchesDepartment && matchesRating
    })

    setFilteredUsers(filtered)
  }, [searchQuery, selectedDepartments, selectedRatings, users])

  return (
    <div className="p-6 overflow-auto">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search by name, email or department"
          value={searchQuery}
          onChange={handleSearch}
          className="p-2 border-gray-700 text-black dark:bg-neutral-800 rounded-md w-full"
        />

        <Select
          isMulti
          options={departmentOptions}
          placeholder="Filter by Department"
          onChange={(selected) => setSelectedDepartments(selected as Option[])}
          className="text-sm border-gray-700 text-black dark:bg-neutral-800"
        />

        <Select
          isMulti
          options={ratingOptions}
          placeholder="Filter by Rating"
          onChange={(selected) => setSelectedRatings(selected as Option[])}
          className="text-sm border-gray-700 text-black dark:bg-neutral-800"
        />
      </div>

      {bookmarksLoaded && promotionsLoaded && loading ? (
        <SkeletonCard />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredUsers.map((user) => (
            <div key={user.id}>
              <UserCard key={user.id} user={user} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
