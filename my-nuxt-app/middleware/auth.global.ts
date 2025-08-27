export default defineNuxtRouteMiddleware(async (to, from) => {
    if (!process.client) return // сервер не трогаем

    const accessToken = useCookie('access_token')

    // Если токен уже есть, ничего делать не нужно
    if (accessToken.value) return

    const tg = window.Telegram?.WebApp ?? null
    tg?.ready()

    // const initData = tg?.initData ?? '';
    const initData = 'query_id=AAEo8vo2AAAAACjy-jYbiqsk&user=%7B%22id%22%3A922415656%2C%22first_name%22%3A%22Gri%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22hnne2%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FzorMNnw2jONg3vEhC0fcCsKQVn4kFJP7tPDIWfMuEb8.svg%22%7D&auth_date=1756210764&signature=3ZryenTgue1dQydXiAFIic0U68emau-mCLmBXyqyVeuHAMKxikS24xV7YjWTxhsq7HtgqeTsgCItjkB0ByTMAA&hash=ef213e5cc3a8fc05e8cf6270e3e546867d02fb7b9ef1a621b76746331ea327e3'


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
