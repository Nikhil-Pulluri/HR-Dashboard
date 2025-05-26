'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { ArrowLeft, Copy, Check } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { FaStar } from 'react-icons/fa'
// import type { User } from '@/components/card'

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

const UserProfile = () => {
  const [user, setUser] = useState<User>()
  const [loading, setLoading] = useState(true)
  const [copiedPhone, setCopiedPhone] = useState(false)
  const params = useParams()
  const id = params.id
  const router = useRouter()

  const rating = useMemo(() => Math.floor(Math.random() * 5) + 1, [])

  const getCountryFlag = (countryName: string) => {
    const countryToCode: { [key: string]: string } = {
      'United States': 'us',
      Canada: 'ca',
      'United Kingdom': 'gb',
      Germany: 'de',
      France: 'fr',
      Italy: 'it',
      Spain: 'es',
      Netherlands: 'nl',
      Belgium: 'be',
      Switzerland: 'ch',
      Austria: 'at',
      Poland: 'pl',
      Sweden: 'se',
      Norway: 'no',
      Denmark: 'dk',
      Finland: 'fi',
      Australia: 'au',
      'New Zealand': 'nz',
      Japan: 'jp',
      'South Korea': 'kr',
      China: 'cn',
      India: 'in',
      Brazil: 'br',
      Mexico: 'mx',
      Argentina: 'ar',
      Chile: 'cl',
      'South Africa': 'za',
      Russia: 'ru',
      Turkey: 'tr',
      Egypt: 'eg',
      Nigeria: 'ng',
      Kenya: 'ke',
      Morocco: 'ma',
      Israel: 'il',
      'Saudi Arabia': 'sa',
      UAE: 'ae',
      Thailand: 'th',
      Singapore: 'sg',
      Malaysia: 'my',
      Indonesia: 'id',
      Philippines: 'ph',
      Vietnam: 'vn',
      Portugal: 'pt',
      Greece: 'gr',
      'Czech Republic': 'cz',
      Hungary: 'hu',
      Romania: 'ro',
      Bulgaria: 'bg',
      Croatia: 'hr',
      Slovenia: 'si',
      Slovakia: 'sk',
      Estonia: 'ee',
      Latvia: 'lv',
      Lithuania: 'lt',
      Ireland: 'ie',
      Iceland: 'is',
      Luxembourg: 'lu',
      Malta: 'mt',
      Cyprus: 'cy',
    }

    const countryCode = countryToCode[countryName] || 'xx'
    return `https://flagcdn.com/24x18/${countryCode}.png`
  }

  const copyPhoneNumber = async () => {
    if (!user?.phone) return

    try {
      await navigator.clipboard.writeText(user.phone)
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    } catch (err) {
      console.error('Failed to copy phone number:', err)
    }
  }

  useEffect(() => {
    if (!id) return

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const data = await response.json()

        const gender = data.gender === 'female' ? 'women' : 'men'
        const imageId = data.id % 100
        const imageUrl = `https://randomuser.me/api/portraits/${gender}/${imageId}.jpg`

        setUser({ ...data, image: imageUrl })
        setLoading(false)
      } catch (err) {
        console.error('Error fetching user:', err)
        setLoading(false)
      }
    }

    fetchUser()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-1">
        <div className="flex h-full w-full flex-1 flex-col gap-2 rounded-tl-2xl border border-neutral-200 bg-white p-2 md:p-10 dark:border-neutral-700 dark:bg-neutral-900">
          <div className="flex gap-2">
            {[...new Array(4)].map((i, idx) => (
              <div key={'first-array-demo-1' + idx} className="h-20 w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
            ))}
          </div>
          <div className="flex flex-1 gap-2">
            {[...new Array(2)].map((i, idx) => (
              <div key={'second-array-demo-1' + idx} className="h-full w-full animate-pulse rounded-lg bg-gray-100 dark:bg-neutral-800"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-xl text-gray-600 dark:text-gray-300">User not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-auto w-full dark:bg-neutral-800">
      <div className="bg-white dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-gray-600 dark:text-gray-300  transition-colors dark:bg-neutral-800  px-4 py-2 rounded-lg border ">
            <ArrowLeft className="w-9 h-4" />
            <span>Dashboard</span>
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-neutral-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <img src={user.image} alt="User photo" className="w-40 h-40 shadow-lg object-cover" />
              {/* <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-white dark:border-neutral-800"></div> */}
            </div>
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-3 justify-center lg:justify-start mb-2">
                <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-100">
                  {user.firstName} {user.lastName}
                </h1>
                <img src={getCountryFlag(user.address?.country)} alt={`${user.address?.country} flag`} className="w-8 h-6 rounded-sm shadow-sm border border-gray-200 dark:border-gray-600" />
              </div>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">{user.company?.title || 'Professional'}</p>

              <div className="flex items-center gap-1 justify-center lg:justify-start mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} />
                ))}
              </div>

              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-700 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                  {/* <img src={getCountryFlag(user.address?.country)} alt={`${user.address?.country} flag`} className="w-5 h-4 rounded-sm shadow-sm border border-gray-200 dark:border-gray-500" /> */}
                  <span className="text-sm text-gray-700 dark:text-gray-200">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-100 dark:bg-neutral-700 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
                  {/* <img src={getCountryFlag(user.address?.country)} alt={`${user.address?.country} flag`} className="w-5 h-4 rounded-sm shadow-sm border border-gray-200 dark:border-gray-500" /> */}
                  <span className="text-sm text-gray-700 dark:text-gray-200">{user.phone}</span>
                  <button onClick={copyPhoneNumber} className="ml-2 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-600 transition-colors" title="Copy phone number">
                    {copiedPhone ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-gray-500 dark:text-gray-400" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SectionBox title="Personal Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard label="Age" value={`${user.age} years`} />
              <InfoCard label="Gender" value={user.gender} />
              <InfoCard label="Birth Date" value={user.birthDate} />
              <InfoCard label="Blood Group" value={user.bloodGroup} />
              <InfoCard label="Height" value={`${user.height} cm`} />
              <InfoCard label="Weight" value={`${user.weight} kg`} />
              <InfoCard label="Eye Color" value={user.eyeColor} />
              <InfoCard label="Hair" value={`${user.hair?.color} ${user.hair?.type}`} />
            </div>
          </SectionBox>

          <SectionBox title="Address Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Street" value={user.address?.address} />
                <InfoCard label="City" value={user.address?.city} />
                <InfoCard label="State" value={user.address?.state} />
                <InfoCard label="Country" value={user.address?.country} />
                <InfoCard label="Postal Code" value={user.address?.postalCode} />
              </div>
              <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 mt-4">
                <div className="text-center text-gray-600 dark:text-gray-300">
                  <p className="text-sm font-semibold mb-2">Coordinates</p>
                  <p className="text-xs">Lat: {user.address?.coordinates?.lat}</p>
                  <p className="text-xs">Lng: {user.address?.coordinates?.lng}</p>
                </div>
              </div>
            </div>
          </SectionBox>

          <SectionBox title="Company Information">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Company" value={user.company?.name} />
                <InfoCard label="Department" value={user.company?.department} />
                <InfoCard label="Title" value={user.company?.title} />
              </div>
              <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">Office Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard label="Address" value={user.company?.address?.address} />
                  <InfoCard label="City" value={user.company?.address?.city} />
                  <InfoCard label="State" value={user.company?.address?.state} />
                  <InfoCard label="Country" value={user.company?.address?.country} />
                </div>
              </div>
            </div>
          </SectionBox>

          <SectionBox title="Banking Information">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard label="Card Type" value={user.bank?.cardType} />
              <InfoCard label="Card Number" value={`**** **** **** ${user.bank?.cardNumber?.slice(-4)}`} />
              <InfoCard label="Expiry" value={user.bank?.cardExpire} />
              <InfoCard label="Currency" value={user.bank?.currency} />
            </div>
            <div className="mt-4">
              <InfoCard label="IBAN" value={user.bank?.iban} />
            </div>
          </SectionBox>

          <SectionBox title="Crypto Wallet">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard label="Coin" value={user.crypto?.coin} />
              <InfoCard label="Network" value={user.crypto?.network} />
            </div>
            <div className="mt-4">
              <InfoCard label="Wallet Address" value={user.crypto?.wallet} className="text-xs font-mono" />
            </div>
          </SectionBox>

          <SectionBox title="Additional Information" className="lg:col-span-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <InfoCard label="University" value={user.university} />
              <InfoCard label="Username" value={user.username} />
              <InfoCard label="Maiden Name" value={user.maidenName} />
              <InfoCard label="IP Address" value={user.ip} />
              <InfoCard label="MAC Address" value={user.macAddress} />
              <InfoCard label="EIN" value={user.ein} />
              <InfoCard label="SSN" value={`***-**-${user.ssn?.slice(-4) || '****'}`} />
            </div>
            <div className="mt-6">
              <InfoCard label="User Agent" value={user.userAgent} className="text-xs" />
            </div>
          </SectionBox>
        </div>
      </div>
    </div>
  )
}

const SectionBox = ({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`bg-white dark:bg-neutral-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${className}`}
    >
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
      <div className="h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
    </div>
  )
}

const InfoCard = ({ label, value, className = '' }: { label: string; value: string | number | undefined; className?: string }) => (
  <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-3 border border-gray-200 dark:border-gray-600">
    <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</p>
    <p className={`text-gray-800 dark:text-gray-100 font-medium break-words ${className}`}>{value || 'Not provided'}</p>
  </div>
)

export default UserProfile
