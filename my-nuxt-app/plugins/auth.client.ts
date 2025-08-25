export default defineNuxtPlugin(async () => {
    const token = useCookie('auth_token', {
        sameSite: 'lax',
        path: '/',
    });

    const config = useRuntimeConfig()

    // Функция для проверки валидности токена
    const isTokenValid = async () => {
        if (!token.value) return false;

        try {
            const { data, error } = await useFetch(`${config.public.apiBase}/api/branch`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            return !!(data.value && !error.value);
        } catch {
            return false;
        }
    };

    if (token.value && (await isTokenValid())) {
        return;
    }

    token.value = null;

    let initData: string = '';

    if (import.meta.client) {
        const tg = window.Telegram?.WebApp;
        initData = tg?.initData ?? '';
    }

    if (!initData) {
        return;
    }

    const { data } = await useFetch(`${config.public.apiBase}/api/order`, {
        method: 'POST',
        headers: {
            'X-Telegram-Init-Data': initData,
        },
    });
    if (data.value?.access_token) {
        token.value = data.value.access_token;
    }
});
