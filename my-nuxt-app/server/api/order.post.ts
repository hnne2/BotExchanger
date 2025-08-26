import { defineEventHandler, readBody, createError, H3Event, getCookie } from 'h3'

interface OrderRequest {
    user_id: number
    branch_id: number
    order_type_id: number
    amount: number
    type: 'buy' | 'sell'
}

interface OrderResponse {
    order_id: number
}

export default defineEventHandler<OrderResponse>(async (event: H3Event) => {
    const config = useRuntimeConfig()

    try {
        const body = await readBody<OrderRequest>(event)

        // читаем токен из куки
        const token = getCookie(event, 'access_token')

        const response: OrderResponse = await $fetch(`${config.public.apiBase}/api/order`, {
            method: 'POST',
            body,
            headers: token
                ? { Authorization: `Bearer ${token}` }
                : {},
        })

        return response
    } catch (error) {
        console.error('Ошибка при создании заявки:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось создать заявку',
        })
    }
})
