<template>
  <div class="bg-[#231F25] min-h-screen text-[#F5F5F5] font-sans p-4">
    <AppHeader :title="`Заявка ${orderId}`" />
    <div v-if="order" class="  rounded-[12px] px-[16px] mt-[1.5rem] mb-6">
      <span class="inline-block text-[12px] px-[6px] py-[2px] rounded-[6px] font-medium mb-0px]"
            :class="statusClass"
      >{{ order.status }}
      </span>
      <div class="flex items-center ">
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
        <span class="text-[#F5F5F5]  mx-[1rem]">{{ order.date }}</span>
      </div>
    </div>

    <div v-if="order" class="space-y-[12px] mx-[1rem]">
      <div v-if="order" class=" flex   bg-[#1e1a20]  rounded-[1rem] shadow-md">
        <!-- Левая часть -->
        <div class="flex-1 ms-[1rem] border-r border-[#231f25]">
          <p class="text-[#fbbf24]   font-semibold">
            $ {{ order.payAmount }}
          </p>
          <p class=" text-[14px] text-[#9C9C9C] ">
            Сумма валюты для покупки
          </p>
        </div>

        <!-- Правая часть -->
        <div class="flex-1 ms-[1rem] rounded-[1rem]">
          <p class="text-[#fbbf24]  font-semibold">
            {{ order.receiveAmount }} USDT
          </p>
          <p class=" text-[14px] text-[#9C9C9C] ">
            Сумма валюты для получения
          </p>
        </div>
      </div>
      <div class="flex border-b border-[#404040] pb-[8px]">
        <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Тип заявки</span>
        <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.type }}</span>
      </div>

      <div class="flex  border-b border-[#404040] pb-[8px]">
        <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Курс</span>
        <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.rate }}</span>
      </div>

      <div class="flex  border-b border-[#404040] pb-[8px]">
        <span class="text-[14px] text-[#9C9C9C] w-1/2 ">Комиссия</span>
        <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.fee }}</span>
      </div>

      <div class="flex justify-between border-b border-[#404040] pb-[8px]">
        <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">Адрес обменника</span>
        <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left ">{{ order.address }}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-[14px] text-[#9C9C9C] w-1/2 text-left">ФИО получателя</span>
        <span class="text-[14px] text-[#F5F5F5] w-1/2 text-left">{{ order.recipient }}</span>
      </div>

      <!-- Кнопка -->
      <button
          class="w-full mt-[1rem] bg-transparent m border border-[#F4B44D] text-[#F4B44D]  font-medium py-[10px] rounded-[8px] text-[14px]"
          @click="$emit('go-to-my-requests')"
      >
        Написать в поддержку
      </button>
    </div>


  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { ref, onMounted, computed } from 'vue'

const route = useRoute()
const orderId = route.params.id

// Заглушка под запрос
const order = ref<any | null>(null)

onMounted(() => {
  // имитация ответа API
  order.value = {
    id: orderId,
    status: 'Новая',
    date: '12.07.2025 20:33',
    type: 'Продажа',
    rate: '1 USDT = 12345789 $',
    fee: '0,3%',
    address: 'г. Пенза,\nСоциалистическая, 21,\nофис 210, 2 этаж',
    recipient: 'Иванов Иван Иванович',
    payAmount: 450,
    receiveAmount: 45
  }
})

const statusClass = computed(() => {
  switch (order.value?.status) {
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
