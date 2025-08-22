export default defineNuxtPlugin(() => {
    const scriptId = 'yandex-maps-script'
    if (process.client && !document.getElementById(scriptId)) {
        const script = document.createElement('script')
        script.id = scriptId
        script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=21e029d7-a4e5-44e9-88aa-d6ae2164ab2b'
        script.type = 'text/javascript'
        script.onload = () => {
            console.log('Yandex Maps API загружен')
        }
        document.head.appendChild(script)
    }
})
