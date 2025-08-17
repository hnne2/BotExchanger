<template>
  <NuxtLink :to="`/orders/${order.id}`" class="no-underline">
    <div class="w-full bg-[#120E1447] rounded-[12px] px-[16px] py-[12px] mb-[12px] cursor-pointer hover:bg-[#2A2630] transition">
      <!-- Первая строка -->
      <div class="flex justify-between items-center mb-[8px]">
        <span
            :class="statusClass"
            class="text-[12px] px-[6px] py-[2px] rounded-[6px] font-medium"
        >
          {{ order.status }}
        </span>
        <span class="text-[14px] text-[#F5F5F5] opacity-80">
          {{ order.type }}
        </span>
      </div>

      <!-- Вторая строка -->
      <div class="flex justify-between items-center mb-[8px]">
        <p class="text-[16px] font-semibold text-[#F5F5F5]">
          Заявка {{ order.id }}
        </p>
        <p class="text-[16px] font-semibold text-[#F4B44D]">
          ${{ order.usd }} / {{ order.usdt }} USDT
        </p>
      </div>

      <!-- Третья строка -->
      <div class="flex justify-between items-center">
        <p class="text-[12px] text-[#9C9C9C]">
          {{ order.date }}
        </p>
        <span class="text-[12px] text-[#9C9C9C]">отдаю / получаю</span>
      </div>
    </div>
  </NuxtLink>
</template>



<script setup lang="ts">
const { order } = defineProps<{
  order: {
    id: number
    status: string
    date: string
    type: string
    usd: number
    usdt: number
  }
}>()

const statusClass = computed(() => {
  switch (order.status) {
    case 'Новая':
      return 'bg-[#F4B44D] text-[#231F25]'
    case 'Подтверждена':
      return 'bg-[#78E052] text-[#231F25]'
    case 'Отклонена':
      return 'bg-[#FF542A] text-[#231F25]'
    default:
      return 'bg-[#9C9C9C] text-[#231F25]'
  }
})
</script>

