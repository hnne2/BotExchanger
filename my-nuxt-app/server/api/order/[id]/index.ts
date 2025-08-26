import { defineEventHandler, getQuery, getRouterParam, getCookie } from 'h3'


interface Order {
    id: number
    user_id: number
    branch_id: number
    order_type_id: number
    order_status_id: number
    amount: number
    type: 'buy' | 'sell'
    created_at: string
    crypto_amount: number
    rate: number
    commission: string
    commission_amount: number
    address: string
    fullName: string
    wallet: string | null
    rejectReason: string | null
}

export default defineEventHandler<Order>(async (event) => {
    const config = useRuntimeConfig()
    const query = getQuery(event)
    const orderId = getRouterParam(event, 'id')

    if (!query.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing "id" parameter'
        })
    }

    // читаем токен из куки
    const token = getCookie(event, 'access_token')

    return await $fetch<Order>(`${config.public.apiBase}/api/order/${orderId}`, {
        headers: token
            ? { 'X-Telegram-Api-Key': `Bearer ${token}` }
            : {},
    })
})
