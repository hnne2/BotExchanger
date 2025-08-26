export default defineNuxtPlugin(async (nuxtApp) => {
    const token = useCookie('auth_token', {
        sameSite: 'lax',
        path: '/',
    });

    const config = useRuntimeConfig()

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
        // если initData нет → сразу на регистрацию
        return navigateTo('/registration');
    }

    const { data } = await useFetch(`${config.public.apiBase}/api/order`, {
        method: 'POST',
        headers: {
            'X-Telegram-Init-Data': initData,
        },
    });

    if (data.value?.access_token) {
        token.value = data.value.access_token;
    } else {
        // если не получили токен → на регистрацию
        return navigateTo('/registration');
    }
});
