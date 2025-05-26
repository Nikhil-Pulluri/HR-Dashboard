import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      // Persist the OAuth access_token and refresh_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token ?? '';       // fallback to empty string if undefined
        token.refreshToken = account.refresh_token ?? '';     // fallback to empty string if undefined
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      // Send properties to the client
      session.user.id = token.id as string; // cast token.id to string
      session.accessToken = token.accessToken as string; // cast token.accessToken to string
      return session
    },
  },
}




// import { NextAuthOptions } from 'next-auth'
// import GoogleProvider from 'next-auth/providers/google'

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code"
//         }
//       }
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, user }) {
//       // Persist the OAuth access_token and refresh_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//         token.refreshToken = account.refresh_token
//       }
//       if (user) {
//         token.id = user.id
//       }
//       return token
//     },
//     async session({ session, token }) {
//       // Send properties to the client
//       session.user.id = token.id as string
//       session.accessToken = token.accessToken as string
//       return session
//     },
//     async signIn({ user, account, profile }) {
//       // You can add custom logic here
//       // Return true to allow sign in, false to deny
//       if (account?.provider === 'google') {
//         return true
//       }
//       return false
//     },
//   },
//   pages: {
//     signIn: '/auth/signin', // Custom sign-in page (optional)
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   debug: process.env.NODE_ENV === 'development',
// }
