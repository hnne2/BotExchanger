import { defineEventHandler, readBody, createError, H3Event, getCookie } from 'h3'

interface OrderRequest {
    type: 'buy' | 'sell'
    user_id: number
    branch_id: number
    order_type_id: number
    rate: number
    amount: number
    crypto_amount: number
    commission: number
    commission_amount: number
    wallet: string
    name: string
    surname: string
    patronymic: string
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
        console.log(token)

        const response: OrderResponse = await $fetch(`${config.public.apiBase}/api/order`, {
            method: 'POST',
            body,
            headers: token
                ? { 'X-Telegram-Api-Key': `Bearer ${token}` }
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
