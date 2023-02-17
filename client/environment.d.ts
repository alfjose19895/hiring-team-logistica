declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NUXT_ORIGIN: string
      NUXT_SECRET: string
      NODE_ENV: 'development'
      PORT?: string
      PWD: string
      BACKEND_BASEURL: string
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
