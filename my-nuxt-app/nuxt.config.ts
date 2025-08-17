export default defineNuxtConfig({
  imports: {
    dirs: ['composables'] // это должно быть!
  },
  css: ['@/assets/css/tailwind.css','@/assets/css/fonts.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
})
