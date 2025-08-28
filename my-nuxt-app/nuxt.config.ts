export default defineNuxtConfig({
  imports: {
    dirs: ['composables']
  },

  runtimeConfig: {
    public: {
      apiBase: 'https://cabinet.cryptogex.vip',
    },
  },

  css: ['@/assets/css/tailwind.css', '@/assets/css/fonts.css'],

  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },

  app: {
    head: {
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'
        }
      ]
    }
  }
})
