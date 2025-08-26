// server/api/city/[id]/branches.ts
import { defineEventHandler, getRouterParam } from 'h3'

interface Branch {
    id: number
    city_id: number
    address: string
    working_hours: string
    coords: {
        latitude: number
        longitude: number
    }
}

export default defineEventHandler<Branch[]>(async (event) => {
    const config = useRuntimeConfig()
    const cityId = getRouterParam(event, 'id')

    if (!cityId) {
        throw createError({ statusCode: 400, statusMessage: 'City ID is required' })
    }

    return await $fetch(`${config.public.apiBase}/api/city/${cityId}/branches`)
})
