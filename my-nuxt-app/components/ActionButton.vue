<template>
  <NuxtLink
      :to="to"
      class="no-underline flex flex-col items-center justify-start gap-3 bg-[#120E14A8] [border-radius:8px] px-4 py-4 text-center hover:bg-[#2a242e] transition-all text-[#F5F5F5]"
  >
    <img
        :src="icon"
        alt="icon"
        class="w-10 h-10 mb-2 object-contain"
    />
    <div class="text-[15px] font-semibold text-center leading-[140%] tracking-normal">{{ label }}</div>
  </NuxtLink>
</template>


<script setup>
defineProps({
  icon: {
    type: String,
    required: true // путь к изображению
  },
  label: String,
  to: {
    type: String,
    default: '#'
  }
})
</script>

<style scoped>
</style>
