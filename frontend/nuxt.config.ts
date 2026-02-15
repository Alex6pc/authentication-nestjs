// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3000
  },
  css: ['vuetify/lib/styles/main.sass'],
  build: {
    transpile: ['vuetify']
  },
  modules: ['@pinia/nuxt'],
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          additionalData: '@use "@/assets/styles/variables.scss" as *\n'
        }
      }
    },
    server: {
      watch: {
        usePolling: true,
        interval: 1000
      }
    }
  },
  components: true,
  runtimeConfig: {
    baseUrl: process.env.BASE_URL_SERVER || 'http://localhost:3002/graphql',
    public: {
      baseUrl: process.env.BASE_URL_CLIENT || 'http://localhost:3002/graphql'
    }
  }
})
