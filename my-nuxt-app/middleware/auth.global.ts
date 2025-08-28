export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.client) return // сервер не трогаем

    const accessToken = useCookie('access_token')

    // Если токен уже есть, ничего делать не нужно
    if (accessToken.value) return

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
                    accessToken.value = null
                    return false
                }
                throw new Error(`Ошибка ${res.status}`)
            }

            const data = await res.json()
            if (data.access_token) {
                accessToken.value = data.access_token
                return true
            }
        } catch (err) {
            console.error('Ошибка получения токена:', err)
            accessToken.value = null
        }
        return false
    }

    const gotToken = await fetchToken()

    if (!gotToken && to.path !== '/registration') {
        // если токен не получили — редирект на регистрацию
        return navigateTo('/registration')
    }
})
