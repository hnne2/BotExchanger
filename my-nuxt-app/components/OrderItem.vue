<template>
  <div class="border border-gray-200 rounded-xl p-4 shadow-sm">
    <div class="flex justify-between items-center">
      <span class="text-sm text-gray-500">{{ order.type }}</span>
      <span class="bg-green-400 text-white px-3 py-1 rounded-full text-sm">{{ order.status }}</span>
    </div>
    <div class="font-semibold text-lg mt-1">Заявка {{ order.number }}</div>
    <div class="text-md font-medium text-gray-800">{{ order.amount }}</div>
    <div class="text-sm text-gray-500 mt-1">отдаю / получаю</div>
    <div class="text-sm text-gray-500 mt-2 text-right">{{ order.date }}</div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  order: {
    id: number
    type: string
    number: string
    amount: string
    date: string
    status: string
  }
}>()
</script>
