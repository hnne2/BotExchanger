export default defineNuxtPlugin(async () => {
    const token = useCookie('access_token', {
        sameSite: 'lax',
        path: '/',
    });

    const config = useRuntimeConfig()

    // Проверка токена
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

    if (!import.meta.client) return;

    const tg = window.Telegram?.WebApp;
    tg?.ready(); // важно вызвать, чтобы Telegram корректно отдал initData

    const initData = tg?.initData ?? '';

    if (!initData) {
        // если нет initData → сразу редиректим на регистрацию
        return navigateTo('/registration');
    }

    try {
        const { data } = await useFetch(`${config.public.apiBase}/api/order`, {
            method: 'POST',
            headers: {
                'X-Telegram-Init-Data': initData,
            },
        });

        if (data.value?.access_token) {
            token.value = data.value.access_token;
        } else {
            return navigateTo('/registration');
        }
    } catch (err) {
        console.error('Ошибка получения токена:', err);
        return navigateTo('/registration');
    }
});
