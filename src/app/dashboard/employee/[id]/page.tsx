'use client'
import React, { useEffect, useState } from 'react'
import { User, MapPin, Building2, CreditCard, Coins, GraduationCap, Shield, Phone, Mail, Calendar, Eye, Palette, Ruler, Weight, ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

const UserProfile = () => {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const id = useParams().id
  const router = useRouter()

  useEffect(() => {
    if (!id) return

    const fetchUser = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/users/${id}`)
        const data = await response.json()

        const gender = data.gender === 'female' ? 'women' : 'men'
        const imageUrl = `https://randomuser.me/api/portraits/${gender}/${data.id}.jpg`

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
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading user details...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 dark:bg-neutral-800 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-xl text-gray-300">User not found.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full overflow-auto bg-neutral-800">
      <div className="bg-gray-800 border-b border-gray-700 dark:bg-neutral-800">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg border border-gray-600 hover:border-gray-500"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <div className="border-b dark:bg-neutral-800 border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative">
              <img src={user.image} alt="User photo" className="w-40 h-40 rounded-full border-4 border-indigo-500 shadow-2xl object-cover" />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-gray-800"></div>
            </div>
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-2 text-white">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-xl text-gray-300 mb-4">{user.company?.title || 'Professional'}</p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-gray-700/70 px-4 py-2 rounded-full border border-gray-600">
                  <Mail className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-gray-200">{user.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-gray-700/70 px-4 py-2 rounded-full border border-gray-600">
                  <Phone className="w-4 h-4 text-indigo-400" />
                  <span className="text-sm text-gray-200">{user.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <SectionBox title="Personal Information" icon={<User className="w-6 h-6" />} accentColor="indigo">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard icon={<Calendar className="w-5 h-5 text-blue-400" />} label="Age" value={`${user.age} years`} />
              <InfoCard icon={<User className="w-5 h-5 text-purple-400" />} label="Gender" value={user.gender} />
              <InfoCard icon={<Calendar className="w-5 h-5 text-green-400" />} label="Birth Date" value={user.birthDate} />
              <InfoCard icon={<Shield className="w-5 h-5 text-red-400" />} label="Blood Group" value={user.bloodGroup} />
              <InfoCard icon={<Ruler className="w-5 h-5 text-indigo-400" />} label="Height" value={`${user.height} cm`} />
              <InfoCard icon={<Weight className="w-5 h-5 text-orange-400" />} label="Weight" value={`${user.weight} kg`} />
              <InfoCard icon={<Eye className="w-5 h-5 text-cyan-400" />} label="Eye Color" value={user.eyeColor} />
              <InfoCard icon={<Palette className="w-5 h-5 text-pink-400" />} label="Hair" value={`${user.hair?.color} ${user.hair?.type}`} />
            </div>
          </SectionBox>

          {/* Address Information */}
          <SectionBox title="Address Information" icon={<MapPin className="w-6 h-6" />} accentColor="green">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Street" value={user.address?.address} />
                <InfoCard label="City" value={user.address?.city} />
                <InfoCard label="State" value={user.address?.state} />
                <InfoCard label="Country" value={user.address?.country} />
                <InfoCard label="Postal Code" value={user.address?.postalCode} />
              </div>
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700 mt-4">
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <p className="text-sm">Coordinates</p>
                  <p className="text-xs">Lat: {user.address?.coordinates?.lat}</p>
                  <p className="text-xs">Lng: {user.address?.coordinates?.lng}</p>
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Company Information */}
          <SectionBox title="Company Information" icon={<Building2 className="w-6 h-6" />} accentColor="purple">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard label="Company" value={user.company?.name} />
                <InfoCard label="Department" value={user.company?.department} />
                <InfoCard label="Title" value={user.company?.title} />
              </div>
              <div className="border-t border-gray-700 pt-4">
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Office Address</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InfoCard label="Address" value={user.company?.address?.address} />
                  <InfoCard label="City" value={user.company?.address?.city} />
                  <InfoCard label="State" value={user.company?.address?.state} />
                  <InfoCard label="Country" value={user.company?.address?.country} />
                </div>
              </div>
            </div>
          </SectionBox>

          {/* Banking Information */}
          <SectionBox title="Banking Information" icon={<CreditCard className="w-6 h-6" />} accentColor="amber">
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

          {/* Crypto Wallet */}
          <SectionBox title="Crypto Wallet" icon={<Coins className="w-6 h-6" />} accentColor="cyan">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoCard label="Coin" value={user.crypto?.coin} />
              <InfoCard label="Network" value={user.crypto?.network} />
            </div>
            <div className="mt-4">
              <InfoCard label="Wallet Address" value={user.crypto?.wallet} className="text-xs font-mono" />
            </div>
          </SectionBox>

          {/* Additional Information */}
          <SectionBox title="Additional Information" icon={<GraduationCap className="w-6 h-6" />} accentColor="rose" className="lg:col-span-2">
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

// Helper Components
const SectionBox = ({ title, icon, accentColor, children, className = '' }: { title: string; icon: React.ReactNode; accentColor: string; children: React.ReactNode; className?: string }) => {
  const colorMap: Record<string, string> = {
    indigo: 'border-indigo-500 text-indigo-400',
    green: 'border-green-500 text-green-400',
    purple: 'border-purple-500 text-purple-400',
    amber: 'border-amber-500 text-amber-400',
    cyan: 'border-cyan-500 text-cyan-400',
    rose: 'border-rose-500 text-rose-400',
  }

  return (
    <div className={`bg-gray-800 rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors ${className}`}>
      <div className={`border-l-4 ${colorMap[accentColor]} px-6 py-4 border-b border-gray-700`}>
        <div className="flex items-center gap-3">
          <div className={colorMap[accentColor]}>{icon}</div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

const InfoCard = ({ icon, label, value, className = '' }: { icon?: React.ReactNode; label: string; value: string | number | undefined; className?: string }) => (
  <div className="bg-gray-700/50 rounded-lg p-3 hover:bg-gray-700 transition-colors border border-gray-600/50">
    <div className="flex items-start gap-3">
      {icon && <div className="mt-1 flex-shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-400 mb-1">{label}</p>
        <p className={`text-gray-100 font-medium break-words ${className}`}>{value || 'Not provided'}</p>
      </div>
    </div>
  </div>
)

export default UserProfile
