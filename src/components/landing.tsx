'use client'

import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Landing() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status, router])

  const handleLogin = () => {
    signIn('google') // Triggers NextAuth Google sign-in
  }

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Left Side */}
      <div className="w-1/2 flex items-center justify-center bg-white p-10">
        <div className="max-w-md text-left space-y-4">
          <h2 className="text-3xl font-semibold text-gray-800">Welcome to HR Dashboard</h2>
          <p className="text-gray-600 text-lg text-justify">
            Streamline your hiring, onboarding, and employee management with our modern, easy-to-use HR platform. Gain insights and simplify HR tasks—all in one place.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">HR Dashboard</h1>

          {/* Google Sign-In Button */}
          <button onClick={handleLogin} className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-md shadow hover:shadow-lg transition">
            <Image src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google Logo" width={24} height={24} />
            <span className="text-gray-700 font-medium">Sign in with Google</span>
          </button>

          {/* Optional loading feedback */}
          {status === 'loading' && <p className="text-gray-500">Checking session...</p>}
        </div>
      </div>
    </div>
  )
}

// 'use client'

// import Image from 'next/image'
// // import { signIn } from 'next-auth/react'
// import { useState } from 'react'
// import { useRouter } from 'next/navigation'

// export default function Landing() {
//   const [login, setLogin] = useState(false)
//   const router = useRouter()
//   const handleLogin = async () => {
//     // await signIn('google')
//     setTimeout(() => {
//       setLogin(true)
//     }, 2000)
//   }

//   if (login) {
//     router.push('/dashboard')
//   }

//   return (
//     <div className="flex h-screen w-screen bg-gray-100">
//       {/* Left Side */}
//       <div className="w-1/2 flex items-center justify-center bg-white p-10">
//         <div className="max-w-md text-left space-y-4">
//           <h2 className="text-3xl font-semibold text-gray-800">Welcome to HR Dashboard</h2>
//           <p className="text-gray-600 text-lg text-justify">
//             Streamline your hiring, onboarding, and employee management with our modern, easy-to-use HR platform. Gain insights and simplify HR tasks—all in one place.
//           </p>
//         </div>
//       </div>

//       {/* Right Side */}
//       <div className="w-1/2 flex items-center justify-center p-10">
//         <div className="text-center space-y-6">
//           <h1 className="text-4xl font-bold text-gray-800">HR Dashboard</h1>
//           <button onClick={handleLogin} className="flex items-center gap-3 px-6 py-3 bg-white border border-gray-300 rounded-md shadow hover:shadow-lg transition">
//             <Image src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" alt="Google Logo" width={24} height={24} />
//             <span className="text-gray-700 font-medium">Sign in with Google</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }
