import { defineEventHandler, getQuery, getCookie, createError } from 'h3'

interface Order {
    id: number
    user_id: number
    order_status_id: number
    amount: number
    type: 'buy' | 'sell'
    created_at: string
    crypto_amount: number
}

export default defineEventHandler<Order>(async (event) => {
    const config = useRuntimeConfig()

    // достаём токен из куки
    const token = getCookie(event, 'access_token')
    if (!token) {
        throw createError({
            statusCode: 401,
            statusMessage: 'Не авторизован',
        })
    }

    return await $fetch<Order>(`${config.public.apiBase}/api/order`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
})
