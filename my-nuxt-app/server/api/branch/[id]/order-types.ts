// server/api/branch/[id]/order-types.ts
import { defineEventHandler, getRouterParam } from 'h3'

interface OrderType {
    id: number
    name: string
    title: string
    description: string
    sell: {
        rate: number
        min: number
        max: number
    }
    buy: {
        rate: number
        min: number
        max: number
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
