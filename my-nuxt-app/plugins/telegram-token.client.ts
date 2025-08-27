// plugins/telegram-token.client.ts
import { defineNuxtPlugin, useCookie } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
    const token = useCookie('access_token', { path: '/' })
    const tg = window.Telegram?.WebApp ?? null
    tg?.ready()

    const initData = tg?.initData ?? '';


    const fetchToken = async () => {
        if (!initData) return false

        try {
            const res = await fetch('/api/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Telegram-Init-Data': initData,
                },
            })

            if (!res.ok) {
                if (res.status === 404) {
                    token.value = null
                    return navigateTo('/registration')
                }
                throw new Error(`Ошибка ${res.status}`)
            }

            const data = await res.json()
            if (data.access_token) {
                token.value = data.access_token
            }
        } catch (err) {
            console.error('Ошибка получения токена:', err)
            token.value = null
        }
    }

    // Получаем токен сразу при загрузке
    fetchToken()

    // Обновляем токен
    setInterval(fetchToken, 10000)
})
