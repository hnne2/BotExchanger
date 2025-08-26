export default defineNuxtRouteMiddleware((to, from) => {
    //const token = useCookie('access_token')
    const accessToken = useCookie('access_token')

   // Если токена нет и пользователь НЕ на странице регистрации
    if (!accessToken.value && to.path !== '/registration') {
        return navigateTo('/registration')
    }

})
