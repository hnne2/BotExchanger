import { defineEventHandler, EventHandler } from 'h3'

interface City {
    id: number
    name: string
}

export default defineEventHandler<City[]>(async () => {
    const config = useRuntimeConfig()
    return await $fetch(`${config.public.apiBase}/api/city`)
})
