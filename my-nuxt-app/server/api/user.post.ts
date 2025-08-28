// server/api/user.post.ts
import { defineEventHandler, readBody, getHeader, createError } from 'h3'

interface UserRequestBody {
    last_name: string
    first_name: string
    middle_name?: string
    phone: string
}

interface AuthResponse {
    access_token: string
    refresh_token: string
}

export default defineEventHandler(async (event): Promise<AuthResponse> => {
    const body = await readBody<UserRequestBody>(event)
    const initData = getHeader(event, 'x-telegram-init-data')

    if (!initData) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Init data is required',
        })
    }

    const config = useRuntimeConfig()

    try {
        const response = await $fetch<AuthResponse>(`${config.public.apiBase}/api/user`, {
            method: 'POST',
            headers: {
                'X-Telegram-Init-Data': initData,
            },
            body: {
                last_name: body.last_name,
                first_name: body.first_name,
                middle_name: body.middle_name,
                phone: body.phone
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
