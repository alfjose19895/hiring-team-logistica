import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // server side rendering mode
  ssr: false,

  // typescripts
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // css
  css: ['~/assets/sass/vendor.scss', '~/assets/sass/app.scss'],

  // plugins
  plugins: ['~/plugins/navbar.ts'],

  // build
  build: {
    transpile: ['@headlessui/vue'],
  },

  // modules
  modules: [
    'unplugin-icons/nuxt',
    '@sidebase/nuxt-auth',
    '@intlify/nuxt3',
    '@pinia/nuxt',
    '@nuxt/content',
    '@vueuse/nuxt',
    'nuxt-windicss',
    '@nuxtjs/google-fonts',
    '@huntersofbook/naive-ui-nuxt',
  ],

  //@ts-ignore
  googleFonts: {
    families: {
      Inter: [100, 300, 400, 500, 600, 700, 800, 900],
      Roboto: true,
      'Josefin+Sans': true,
      Lato: [100, 300],
      Raleway: {
        wght: [100, 400],
        ital: [100],
      },
      Poppins: true,
      Oxanium: true,
      'GT+Walsheim': true,
      'Red+Hat+Display': true,
    },
  },

  //@ts-ignore
  auth: {
    isEnabled: true,
    secret: process.env.NUXT_SECRET,
    origin: process.env.ORIGIN,
    basePath: '/api/auth',
    enableSessionRefreshPeriodically: false,
    enableSessionRefreshOnWindowFocus: true,
    enableGlobalAppMiddleware: false, // if enabled, you should be logged in to access the app
    defaultProvider: 'Credentials',
    globalMiddlewareOptions: {
      allow404WithoutAuth: true,
    },
  },

  // experimental features
  experimental: {
    reactivityTransform: false,
  },

  // auto import components
  components: true,

  // vite plugins
  vite: {
    plugins: [
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
  },

  // app config
  app: {
    // global transition
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },

  // localization - i18n config
  intlify: {
    localeDir: 'locales',
    vueI18n: {
      locale: 'en',
      fallbackLocale: 'en',
      availableLocales: ['en', 'es'],
    },
  },

  // vueuse
  vueuse: {
    ssrHandlers: true,
  },

  // windicss
  /*windicss: {
    analyze: {
      analysis: {
        interpretUtilities: false,
      },
      server: {
        port: 4000,
        open: false,
      },
    },
    scan: true,
  },*/

  // content
  content: {
    documentDriven: false,
    markdown: {
      mdc: true,
    },
    highlight: {
      theme: 'github-dark',
    },
  },

  runtimeConfig: {
    // https://v3.nuxtjs.org/docs/directory-structure/nuxt.config#runtimeconfig
    public: {
      apiBase: 'http://localhost:3000/api',
    },
  },
})
