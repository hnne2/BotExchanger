// server/api/user/auth.post.ts
import { defineEventHandler, getHeader, createError } from 'h3'

interface AuthResponse {
    access_token: string
    refresh_token?: string
}

export default defineEventHandler(async (event): Promise<AuthResponse> => {
    const initData = getHeader(event, 'x-telegram-init-data')

    if (!initData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Init data is required',
        })
    }

    const config = useRuntimeConfig()

    try {
        const response = await $fetch<AuthResponse>(`${config.public.apiBase}/api/user/auth`, {
            method: 'POST',
            headers: {
                'X-Telegram-Init-Data': initData,
            },
        })

        return response
    } catch (err: any) {
        throw createError({
            statusCode: err?.response?.status || 500,
            statusMessage: err?.message || 'Ошибка запроса',
        })
    }
})
