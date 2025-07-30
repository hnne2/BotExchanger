<template>
  <NuxtLink
      :to="to"
      class="flex flex-col items-center justify-center bg-[#1F1B23] rounded-2xl p-4 text-center hover:bg-[#2a242e] transition-all"
  >
    <div class="text-3xl mb-2">{{ icon }}</div>
    <div class="text-sm font-medium">{{ label }}</div>
  </NuxtLink>
</template>

<script setup>
defineProps({
  icon: String,
  label: String,
  to: {
    type: String,
    default: '#'
  }
})
</script>

<style scoped>
</style>
