export default defineNuxtConfig({
  imports: {
    dirs: ['composables'] // это должно быть!
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://cabinet.cryptogex.vip',
    },
  },
  css: ['@/assets/css/tailwind.css','@/assets/css/fonts.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
})
