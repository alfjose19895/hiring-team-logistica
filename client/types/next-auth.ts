import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    // New access token field for the session
    accessToken: string
    user: DefaultSession['user'] & {
      id: string
      username: string
      last_login: Date
    }
  }

  interface User {
    username: string
    last_login: Date
  }
}
