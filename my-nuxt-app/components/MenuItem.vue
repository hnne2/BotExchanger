<template>
  <NuxtLink
      v-if="!soon" :to="to"
      class="no-underline flex items-center justify-between bg-[#1F1B23] py-3 pl-4 pr-[1rem] [border-radius:8px] hover:bg-[#2a242e] transition-all text-[#F5F5F5] text-[13px]"
  >
    <div class="flex items-center gap-3">
      <img :src="icon" alt="icon" class="w-[3rem] object-contain" />
      <div class="text-[11px] font-normal leading-[15.4px] tracking-normal">{{ label }}</div>
    </div>
    <img src="/img/arrow_right.png" alt="icon" class="w-[1.5rem]" />
  </NuxtLink>


  <div
      v-else
      class="flex items-center  bg-[#1F1B23] px-4 py-3 rounded-xl opacity-70 cursor-not-allowed"
  >
    <div class="flex items-center gap-[4px]">
      <img :src="icon" alt="icon" class="w-[3rem] object-contain" />
      <div class="text-[11px] font-normal leading-[15.4px] tracking-normal pl-[5px]">{{label }}</div>
      <img src="/img/skoro_fon.svg" alt="icon" class="w-6 h-6 object-contain" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    required: true
  },
  label: String,
  to: {
    type: String,
    default: '#'
  },
  soon: Boolean
})
</script>

<style scoped>
</style>
