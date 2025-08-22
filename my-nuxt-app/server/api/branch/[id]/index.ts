// server/api/branch/[id]/index.ts
import { defineEventHandler, getRouterParam } from 'h3'

interface BranchDetail {
    id: number
    city_id: number
    address: string
    working_hours: string
    order_limit: number
    coords: {
        latitude: number
        longitude: number
    }
}

export default defineEventHandler<BranchDetail>(async (event) => {
    const config = useRuntimeConfig()
    const branchId = getRouterParam(event, 'id')

    if (!branchId) {
        throw createError({ statusCode: 400, statusMessage: 'Branch ID is required' })
    }

    return await $fetch(`${config.public.apiBase}/api/branch/${branchId}`)
})
