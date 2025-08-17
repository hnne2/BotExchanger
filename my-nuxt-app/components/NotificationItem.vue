<template>
  <div class="bg-[#1F1B23] min-h-screen flex flex-col w-full max-w-[480px] mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between h-[56px] px-[16px] border-b border-[#2C2830]">
      <h1 class="text-[16px] leading-[140%] font-medium text-[#F5F5F5]">
        Уведомления
      </h1>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
          <path stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>
    </div>

    <!-- List -->
    <div class="flex flex-col gap-[12px] px-[16px] py-[16px]">
      <NotificationItem
          v-for="(item, index) in notifications"
          :key="index"
          :title="item.title"
          :description="item.description"
          :active="item.active"
      />
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import NotificationItem from '~/components/NotificationItem.vue'

const notifications = ref([])

onMounted(() => {
  // имитация API-запроса
  setTimeout(() => {
    notifications.value = [
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: true },
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: true },
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: true },
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: false },
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: false },
      { title: 'Заголовок уведомления', description: 'Описание уведомления 1-2 строки', active: false }
    ]
  }, 500)
})
</script>
