<template>
  <NuxtLink :to="`/orders/${order.id}`" class="no-underline">
    <div
        class="w-full bg-[#120E1447] rounded-[12px] px-[16px] py-[12px] mb-[12px] cursor-pointer hover:bg-[#2A2630] transition"
    >
      <!-- Первая строка -->
      <div class="flex justify-between items-center">
        <span
            :class="statusClass"
            class="text-[12px] px-[6px] py-[2px] rounded-[6px] font-medium"
        >
          {{ statusLabel }}
        </span>
        <span class="text-[14px] text-[#F5F5F5] opacity-80 ">
          {{ typeLabel }}
        </span>
      </div>

      <!-- Вторая строка -->
      <div class="flex justify-between items-center">
        <p class="text-[16px] font-semibold text-[#F5F5F5]">
          Заявка {{ order.id }}
        </p>
        <p class="text-[16px] font-semibold text-[#F4B44D] text-right break-words max-w-[60%]">
          <template v-if="order.type === 'buy'">
            {{ order.amount }} ₽ / {{ order.crypto_amount }} USDT
          </template>
          <template v-else>
            {{ order.crypto_amount }} USDT / {{ order.amount }} ₽
          </template>
        </p>
      </div>

      <!-- Третья строка -->
      <div class="flex justify-between items-center">
        <p class="text-[12px] text-[#9C9C9C]">
          {{ formattedDate }}
        </p>
        <span class="text-[12px] text-[#9C9C9C]">отдаю / получаю</span>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const { order } = defineProps<{
  order: {
    id: number
    user_id: number
    order_status_id: number
    amount: number
    type: 'buy' | 'sell'
    created_at: string
    crypto_amount: number
  }
}>()

// мапим статус по order_status_id
const statusLabel = computed(() => {
  switch (order.order_status_id) {
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
  switch (order.order_status_id) {
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

// формат даты (только dd.mm.yyyy)
const formattedDate = computed(() => {
  const d = new Date(order.created_at)
  return d.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
})

// перевод типа заявки
const typeLabel = computed(() => {
  return order.type === 'buy' ? 'Покупка' : 'Продажа'
})
</script>
