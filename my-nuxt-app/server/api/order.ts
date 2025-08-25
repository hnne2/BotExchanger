import { defineEventHandler, getQuery } from 'h3'

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
    const query = getQuery(event)

    if (!query.id) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Missing "id" parameter'
        })
    }

    return await $fetch<Order>(`${config.public.apiBase}/api/order`, {
        query: { user_id: query.id }
    })
})
