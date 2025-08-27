import { defineEventHandler, getCookie, createError } from 'h3'

interface IndexGet {
    id: number
    telegram_name: string
    telegram_id: number
    wallet: string | null
    name: string
    surname: string
    patronymic: string
}

export default defineEventHandler<IndexGet>(async (event) => {
    const config = useRuntimeConfig()
    // достаём токен из куки
    const token = getCookie(event, 'access_token')

    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Не авторизован',
        })
    }

    // делаем GET-запрос к внешнему API
    return await $fetch<IndexGet>(`${config.public.apiBase}/api/user`, {
        method: 'GET',
        headers: {
            'X-Telegram-Api-Key': `Bearer ${token}`,
        },
    })
})
