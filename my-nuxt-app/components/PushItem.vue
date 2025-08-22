<template>
  <div
      class="w-full h-[5rem] rounded-[0.7rem] flex items-center justify-between shadow-md transition"
      :class="read
      ? 'bg-transparent border-[1px] border-[#404040]'
      : 'bg-[#120E1447]'"
  >
    <div class="flex flex-col px-[16px] py-[12px]">
      <h3
          class="text-[16px] font-semibold leading-tight"
          :class="read ? 'text-[#9C9C9C]' : 'text-[#F5F5F5]'"
      >
        {{ title }}
      </h3>
      <p
          class="text-[13px] leading-snug mt-[-5px]"
          :class="read ? 'text-[#7a7a7a]' : 'text-[#9C9C9C]'"
      >
        {{ description }}
      </p>
    </div>

    <button
        v-if="!read"
        class="flex items-center justify-center w-[32px] h-[32px] border-transparent rounded-[0.3rem] transition mb-[1.4rem] mr-[16px]"
        :class="read ? 'bg-[#555]' : 'bg-[#fbbf24]'"
    >
      <img
          src="/img/arrow_right_black.svg"
          alt="Подробнее"
          class="w-[16px] h-[16px] bg-transparent"
      />
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Заголовок уведомления'
  },
  description: {
    type: String,
    default: 'Описание уведомления\n1-2 строки'
  },
  read: {
    type: Boolean,
    default: false
  }
})
</script>
