export const useOrders = () => {
    const orders = ref([
        {
            id: '123456',
            date: '12.07.2025',
            type: 'Продажа',
            usd: 450,
            usdt: 45,
            status: 'Новая',
            archived: false
        },
        {
            id: '123457',
            date: '12.07.2025',
            type: 'Покупка',
            usd: 300,
            usdt: 30,
            status: 'Подтверждена',
            archived: false
        },
        {
            id: '123458',
            date: '11.07.2025',
            type: 'Покупка',
            usd: 500,
            usdt: 50,
            status: 'Подтверждена',
            archived: true
        },
        {
            id: '123458',
            date: '11.07.2025',
            type: 'Продажа',
            usd: 500,
            usdt: 50,
            status: 'Отклонена',
            archived: true
        },
        {
            id: '123458',
            date: '11.07.2025',
            type: 'Продажа',
            usd: 500,
            usdt: 50,
            status: 'Исполнена',
            archived: true
        }
    ])

    return { orders }
}
