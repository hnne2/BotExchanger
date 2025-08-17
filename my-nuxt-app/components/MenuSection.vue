<template>
  <div
      class="flex items-center justify-between  px-[6px] py-[6px] [border-radius:8px] mb-[8px] mx-[16px] transition-all"
      :class="disabled ? 'bg-[#120E1447]' : 'bg-[#120E1447] hover:bg-[#2a242e] '"
  >
    <div class="flex items-center gap-[8px]">
      <img :src="icon" alt="icon" class="w-[34px] h-[34px]" />
      <span
          class="text-[#F5F5F5] text-[14px]"
          :class="{ 'opacity-50': disabled }"
      >
        {{ title }}
      </span>
    </div>
    <img
        v-if="!disabled"
        src="/img/arrow_right.svg"
        alt="arrow"
        class="w-[12px] h-[12px]"
    />
  </div>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  disabled: { type: Boolean, default: false }
})
</script>
