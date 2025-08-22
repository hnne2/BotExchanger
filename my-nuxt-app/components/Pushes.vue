<template>
  <div class="  menu min-h-screen text-[#F5F5F5] ">
    <!-- Шапка -->
    <div class="bg-gradient-to-b from-[#231F25] to-[#2d2830] w-full h-[50px] flex items-center justify-center relative">
      <!-- Центрированный заголовок -->
      <h2 class="text-[16px] font-semibold font-vela text-center leading-tight">
        Уведомления
      </h2>

      <!-- Крестик справа -->
      <button
          @click="$emit('close')"
          class="absolute right-[20px] top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none focus:outline-none"
      >
        <img src="/img/krestik.svg" alt="Закрыть" class="w-[16px] h-[16px]" />
      </button>
    </div>
    <div class="flex flex-col gap-[12px] p-[16px]">
      <PushItem
          v-for="(push, idx) in sortedPushes"
          :key="idx"
          :title="push.title"
          :description="push.description"
          :read="push.read"
      />
    </div>

<div class="py-[24px] px-[6px]">
      <!-- Основное -->



    </div>
  </div>
</template>
<script setup>
import PushItem from './PushItem.vue'

const pushes = [
  { title: 'Новый курс обмена', description: 'Узнайте свежие курсы валют прямо сейчас', read: false },
  { title: 'Заявка выполнена', description: 'Ваша заявка №123 успешно завершена', read: true },
  { title: 'Скидка 10%', description: 'Акция на обмен USDT до конца недели', read: false }
]
const sortedPushes = computed(() =>
    [...pushes].sort((a, b) => Number(a.read) - Number(b.read))
)
</script>
