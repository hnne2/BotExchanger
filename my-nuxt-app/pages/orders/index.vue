<template>
  <div class="orders-page bg-[#231F25] min-h-screen text-[#F5F5F5]">
    <div class=" flex flex-col">
      <AppHeader
          title="Мои заявки"
          @toggle-menu="toggleMenu"
          @toggle-pushes="togglePushes"
      />
      <MenuDrawer :visible="menuOpen">
        <Menu @close="toggleMenu" />
      </MenuDrawer>

      <MenuDrawer :visible="pushesOpen">
        <Pushes @close="togglePushes" />
      </MenuDrawer>

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
  </div>
</template>

<script setup lang="ts">
import OrderCard from '~/components/OrderCard.vue'
import { ref, computed, watch, onMounted } from 'vue'

const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => (menuOpen.value = !menuOpen.value)
const togglePushes = () => (pushesOpen.value = !pushesOpen.value)

const mode = ref<'active' | 'archive'>('active')
const filter = ref<'all' | 'buy' | 'sell'>('all')

const orders = ref<Order[]>([])
const loading = ref(false)

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

// функция загрузки
const loadOrders = async () => {
  loading.value = true
  try {
    const url = mode.value === 'active' ? '/api/order/' : '/api/order/archive'
    const data = await $fetch<Order[]>(url)
    orders.value = data
  } catch (e) {
    console.error('Ошибка при загрузке заявок:', e)
  } finally {
    loading.value = false
  }
}

// загружаем при первом монтировании
onMounted(loadOrders)
// и при переключении вкладки
watch(mode, loadOrders)

// фильтрация
const filteredOrders = computed(() => {
  return orders.value.filter(order => {
    const matchesFilter =
        filter.value === 'all' || order.type === filter.value
    return matchesFilter
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
