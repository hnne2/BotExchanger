<template>
  <div class="flex justify-center mt-[1rem]">
    <div class="bg-[#120E1447] text-white px-[20px] rounded-[1rem] w-[400px]">
      <!-- Название -->
      <h3 class="text-[1rem] font-semibold mb-[6px]">{{ title }}</h3>
      <p class="text-[0.875rem] text-[#9C9C9C] mb-[12px]">
        {{ address }}
      </p>

      <!-- Время работы -->
      <p class="text-[0.875rem] font-semibold mb-[4px]">Время работы</p>
      <p class="text-[0.875rem] text-[#9C9C9C] mb-[20px]">
        {{ workingHours }}
      </p>

      <!-- Кнопки -->
      <div class="flex gap-[12px] w-full pb-[1rem]">
        <button
            class="flex-1 px-[16px] py-[10px] bg-[#F4B44D] hover:bg-yellow-600 text-black font-medium rounded-[0.5rem] transition"
        >
          Создать заявку
        </button>
        <button
            class="flex-1 px-[16px] py-[10px] bg-transparent border border-[#F4B44D] text-[#F4B44D] hover:bg-yellow-500 hover:text-black font-medium rounded-[0.5rem] transition"
        >
          Подробнее
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  address: string
  workingHours: string
}

defineProps<Props>()
</script>
