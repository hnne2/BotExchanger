<template>
  <div class="bg-white min-h-screen text-black p-4">
    <HeaderBar />
    <TabsSwitcher v-model="tab" />
    <TabsFilter v-model="filter" />

    <div v-if="filteredOrders.length" class="space-y-4 mt-4">
      <OrderItem
          v-for="order in filteredOrders"
          :key="order.id"
          :order="order"
      />
    </div>
    <div v-else class="text-gray-400 p-4">Заявок не найдено.</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderBar from '@/components/HeaderBar.vue'
import TabsSwitcher from '@/components/TabsSwitcher.vue'
import TabsFilter from '@/components/TabsFilter.vue'
import OrderItem from '@/components/OrderItem.vue'

const tab = ref('Активные')
const filter = ref('Все')

const orders = ref([
  { id: 1, type: 'покупка', number: '123456', amount: '$ 450 / 45 USDT', date: '12.07.2025', status: 'Статус' },
  { id: 2, type: 'продажа', number: '654321', amount: '$ 1200 / 120 USDT', date: '13.07.2025', status: 'Статус' },
])

const filteredOrders = computed(() => {
  if (filter.value === 'Все') return orders.value
  return orders.value.filter(o => (filter.value === 'Купить' ? o.type === 'покупка' : o.type === 'продажа'))
})
</script>
