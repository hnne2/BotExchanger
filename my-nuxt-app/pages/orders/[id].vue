<template>
  <div class="bg-[#231F25] min-h-screen text-[#F5F5F5] font-sans p-4">
    <div class="flex flex-col">
      <AppHeader
          :title="`Заявка ${orderId}`"
          @toggle-menu="toggleMenu"
          @toggle-pushes="togglePushes"
      />
      <MenuDrawer :visible="menuOpen">
        <Menu @close="toggleMenu" />
      </MenuDrawer>

      <MenuDrawer :visible="pushesOpen">
        <Pushes @close="togglePushes" />
      </MenuDrawer>

      <div v-if="order" class="rounded-[12px] px-[16px] mt-[1.5rem] mb-6">
        <span class="inline-block text-[12px] px-[6px] py-[2px] rounded-[6px] font-medium"
              :class="statusClass">
          {{ statusLabel }}
        </span>
        <div class="flex items-center">
          <p class="text-[25px] text-[#F5F5F5] my-[1rem]">
            Заявка {{ order.id }}
          </p>
          <button
              class="ml-2 bg-transparent p-0 border-0"
              @click="copy(order.id)"
          >
            <img
                src="/img/copy_order.svg"
                alt="copy"
                class="w-[24px] h-[24px] pr-[4px] pt-[6px] pointer-events-none"
            />
          </button>
        </div>

        <!-- Дата -->
        <div class="flex items-center text-[12px] text-[#9C9C9C] mb-[1rem]">
          <span class="mr-2">Дата создания</span>
          <span class="text-[#F5F5F5] mx-[1rem]">
            {{ formatDate(order.created_at) }}
          </span>
        </div>
      </div>

      <div v-if="order" class="space-y-[12px] mx-[1rem]">
        <!-- Блок суммы -->
        <div class="flex bg-[#1e1a20] rounded-[1rem] shadow-md">
          <!-- Если покупка -->
          <template v-if="order.type === 'buy'">
            <div class="flex-1 ms-[1rem] border-r border-[#231f25]">
              <p class="text-[#fbbf24] font-semibold">
                {{ order.amount }} руб.
              </p>
              <p class="text-[14px] text-[#9C9C9C]">
                Сумма валюты для покупки
              </p>
            </div>
            <div class="flex-1 ms-[1rem] rounded-[1rem]">
              <p class="text-[#fbbf24] font-semibold">
                {{ order.crypto_amount }} USDT
              </p>
              <p class="text-[14px] text-[#9C9C9C]">
                Сумма валюты для получения
              </p>
            </div>
          </template>

          <!-- Если продажа -->
          <template v-else>
            <div class="flex-1 ms-[1rem] border-r border-[#231f25]">
              <p class="text-[#fbbf24] font-semibold">
                {{ order.crypto_amount }} USDT
              </p>
              <p class="text-[14px] text-[#9C9C9C]">
                Сумма валюты для продажи
              </p>
            </div>
            <div class="flex-1 ms-[1rem] rounded-[1rem]">
              <p class="text-[#fbbf24] font-semibold">
                {{ order.amount }} руб.
              </p>
              <p class="text-[14px] text-[#9C9C9C]">
                Сумма валюты для получения
              </p>
            </div>
          </template>
        </div>

        <div class="flex border-b border-[#404040] pb-[8px]">
          <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Тип заявки</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">
            {{ order.type === 'buy' ? 'Покупка' : 'Продажа' }}
          </span>
        </div>

        <div class="flex border-b border-[#404040] pb-[8px]">
          <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Курс</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.rate }}</span>
        </div>

        <div class="flex border-b border-[#404040] pb-[8px]">
          <span class="text-[14px] text-[#9C9C9C] w-1/2">Комиссия</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.commission }}</span>
        </div>

        <div class="flex justify-between border-b border-[#404040] pb-[8px]">
          <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Адрес обменника</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.address }}</span>
        </div>
        <div class="flex justify-between border-b border-[#404040] pb-[8px]">
          <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">ФИО получателя</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.fullName }}</span>
        </div>

        <div class="flex justify-between">
          <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Кошелек</span>
          <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.wallet || 'Не указан' }}</span>
        </div>

        <!-- Кнопка -->
        <a
            href="https://t.me/garex_support"
            target="_blank"
            rel="noopener noreferrer"
            class="block mt-[5rem] mb-[1rem] no-underline w-full border border-[#F4B44D] text-center text-[#F4B44D] hover:bg-[#e0a73f] hover:text-black font-medium py-[10px] rounded-[8px] text-[14px]"
        >
          Написать в поддержку
        </a>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

function formatDate(dateString: string) {
  const d = new Date(dateString)

  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0') // месяцы с 0
  const yyyy = d.getFullYear()

  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')

  return `${dd}.${mm}.${yyyy} ${hh}.${min}`
}

interface Order {
  id: number
  user_id: number
  branch_id: number
  order_type_id: number
  order_status_id: number
  amount: number
  type: 'buy' | 'sell'
  created_at: string
  crypto_amount: number
  rate: number
  commission: string
  commission_amount: number
  address: string
  fullName: string
  wallet: string | null
  rejectReason: string | null
}

const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}

const route = useRoute()
const orderId = route.params.id

// Заглушка под запрос
const order = ref<any | null>(null)

onMounted(async () => {
  try {
    const data = await $fetch<Order[]>(`/api/order/${orderId}`, { query: { id: 1 } })
    order.value = data
  } catch (e) {
    console.error('Ошибка при загрузке заявок:', e)
  }
})
const statusLabel = computed(() => {
  switch (order.value.order_status_id) {
    case 1:
      return 'Новая'
    case 2:
      return 'Подтверждена'
    case 3:
      return 'Отклонена'
    case 4:
      return 'Исполнена'
    default:
      return 'Неизвестно'
  }
})

// класс для статуса
const statusClass = computed(() => {
  switch (order.value.order_status_id) {
    case 1:
      return 'bg-[#F4B44D] text-[#231F25]' // новая
    case 2:
      return 'bg-[#78E052] text-[#231F25]' // подтверждена
    case 3:
      return 'bg-[#FF542A] text-[#231F25]' // отклонена
    default:
      return 'bg-[#9C9C9C] text-[#231F25]' // неизвестно
  }
})

// копирование в буфер
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    alert(`ID заявки ${text} скопирован!`)
  } catch (err) {
    console.error('Ошибка копирования: ', err)
  }
}
</script>
