/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './components/**/*.{vue,js,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './app.vue',
        './nuxt.config.{js,ts}',
    ],
    safelist: [
        'pr-1', 'pr-2', 'pr-3', 'pr-4', 'pr-5', 'pr-6',
        'pl-1', 'pl-2', 'pl-3', 'pl-4', 'pl-5', 'pl-6',
        'px-4', 'py-3',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
export default {
    theme: {
        extend: {
            fontFamily: {
                vela: ['"Vela Sans"', 'sans-serif'],
            },
        },
    },
}
