import { defineEventHandler } from 'h3'

interface RatesResponse {
    buy: number
    sell: number
}

export default defineEventHandler<RatesResponse>(async (event) => {
    const config = useRuntimeConfig()

    try {
        const rates = await $fetch<RatesResponse>(`${config.public.apiBase}/api/rates`)
        return rates
    } catch (error) {
        console.error('Ошибка при получении курсов:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось получить курсы',
        })
    }
})
