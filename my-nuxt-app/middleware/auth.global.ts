export default defineNuxtRouteMiddleware((to, from) => {
    const token = useCookie('access_token')

    // Если токена нет и пользователь НЕ на странице регистрации
    if (!token.value && to.path !== '/registration') {
        return navigateTo('/registration')
    }
})
