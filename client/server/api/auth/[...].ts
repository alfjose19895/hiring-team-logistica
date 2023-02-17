import CredentialProviders from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

export default NuxtAuthHandler({
  pages: {
    signIn: '/auth',
  },
  secret: 'copchase',
  providers: [
    //@ts-ignore
    CredentialProviders.default({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any, req: any) {
        const response = await fetch('http://backend:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        })
        const user = await response.json()

        if (response.ok && user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ token, account, user }) => {
      if (account && user) {
        token.username = user.username
        token.last_login = user.last_login
      }
      return await token
    },

    session: async ({ token, session }) => {
      if (session?.user) {
        session.user.id = token.sub as string
        session.user.username = token.username as string
        session.user.last_login = token.last_login as Date
      }
      return await session
    },
  },
})
