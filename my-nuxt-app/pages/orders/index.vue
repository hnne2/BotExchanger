<template>
  <div class="orders-page bg-[#231F25] min-h-screen text-[#F5F5F5]">
    <AppHeader title="Купить/Продажа" />

    <div class="mx-[1rem]">

      <div class="toggle-group  mt-[1rem]">
        <button
            :class="{ active: mode === 'active' }"
            @click="mode = 'active'"
        >Активные</button>
        <button
            :class="{ active: mode === 'archive' }"
            @click="mode = 'archive'"
        >Архив</button>
      </div>
      <div class="flex mb-[12px] space-x-[16px]">
        <button
            class="text-[18px] px-[10px] py-[4px] bg-transparent border-none transition-colors duration-200 inline-block"
            :class="filter === 'all'
      ? 'text-[#F4B44D] underline decoration-[#F4B44D] underline-offset-4'
      : 'text-[#9C9C9C]'"
            @click="filter = 'all'"
        >
          Все
        </button>
        <button
            class="text-[18px] px-[10px] py-[4px] bg-transparent border-none transition-colors duration-200 inline-block"
            :class="filter === 'buy'
      ? 'text-[#F4B44D] underline decoration-[#F4B44D] underline-offset-4'
      : 'text-[#9C9C9C]'"
            @click="filter = 'buy'"
        >
          Покупка
        </button>
        <button
            class="text-[18px] px-[10px] py-[4px] bg-transparent border-none transition-colors duration-200 inline-block"
            :class="filter === 'sell'
      ? 'text-[#F4B44D] underline decoration-[#F4B44D] underline-offset-4'
      : 'text-[#9C9C9C]'"
            @click="filter = 'sell'"
        >
          Продажа
        </button>
      </div>
      <div class="mr-[2rem]">
        <OrderCard
            v-for="order in filteredOrders"
            :key="order.id"
            :order="order"
        />
      </div>
    </div>
  </div>
</template>


<script setup>
import OrderCard from '~/components/OrderCard.vue'
import { useOrders } from '~/composables/useOrders'
import {ref} from "vue";

const mode = ref('active')
const { orders } = useOrders()
const filter = ref('all')

const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesTab = mode.value === 'active' ? !order.archived : order.archived
    const matchesFilter =
        filter.value === 'all' ||
        (filter.value === 'buy' && order.type === 'Покупка') ||
        (filter.value === 'sell' && order.type === 'Продажа')
    return matchesTab && matchesFilter
  })
})
</script>
<style scoped>
.toggle-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}
.toggle-group button {
  flex: 1;
  padding: 12px;
  background: #120e14;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #F5F5F5;
}
.toggle-group button.active {
  background: #F4B44D;
  color: #120e14;
}
</style>
