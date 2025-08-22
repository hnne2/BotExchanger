// server/api/branch/[id]/order-types.ts
import { defineEventHandler, getRouterParam } from 'h3'

interface OrderType {
    id: number
    name: string
    title: string
    description: string
    rates: {
        sell_rate: number
        buy_rate: number
    }
}

export default defineEventHandler<OrderType[]>(async (event) => {
    const config = useRuntimeConfig()
    const branchId = getRouterParam(event, 'id')

    if (!branchId) {
        throw createError({ statusCode: 400, statusMessage: 'Branch ID is required' })
    }

    return await $fetch(`${config.public.apiBase}/api/branch/${branchId}/order-types`)
})
