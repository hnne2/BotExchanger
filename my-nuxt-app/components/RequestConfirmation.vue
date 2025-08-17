<template>
  <div class="bg-[] min-h-screen h-screen flex items-center justify-center bg-[#231F25] text-white px-[16px]">
    <div class=" rounded-[12px] p-[24px] text-center shadow-lg w-full max-w-[400px]">

      <!-- Иконка -->
      <div class="flex justify-center mb-[24px]">
        <img src="/img/galochka.svg" class="w-[48px] h-[48px]" />
      </div>

      <!-- Текст -->
      <h2 class="text-[18px] font-semibold mb-[8px]">
        Заявка {{ requestNumber }} успешно создана!
      </h2>
      <p class="text-[14px] text-[#AAAAAA]">Ожидайте статуса "Подтверждена".</p>

      <!-- Кнопки -->
      <div class="mt-[24px] space-y-[12px]">
        <button
            class="w-full bg-[#F4B44D] hover:bg-[#e0a73f] text-black font-medium py-[10px] rounded-[8px] text-[14px]"
            @click="$emit('create-another')"
        >
          Создать ещё заявку
        </button>
        <button
            class="w-full border border-[#F4B44D] text-[#F4B44D] hover:bg-[#e0a73f] hover:text-black font-medium py-[10px] rounded-[8px] text-[14px]"
            @click="$emit('go-to-my-requests')"
        >
          Перейти в мои заявки
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  requestNumber: String
})

defineEmits(['create-another', 'go-to-my-requests'])
</script>
