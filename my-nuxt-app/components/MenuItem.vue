<template>
  <NuxtLink
      v-if="!soon"
      :to="to"
      class="flex items-center justify-between bg-[#1F1B23] px-4 py-3 rounded-xl hover:bg-[#2a242e] transition-all"
  >
    <div class="flex items-center gap-3">
      <div class="text-xl">{{ icon }}</div>
      <div class="text-sm">{{ label }}</div>
    </div>
    <div class="text-gray-400">›</div>
  </NuxtLink>

  <div
      v-else
      class="flex items-center justify-between bg-[#1F1B23] px-4 py-3 rounded-xl opacity-70 cursor-not-allowed"
  >
    <div class="flex items-center gap-3">
      <div class="text-xl">{{ icon }}</div>
      <div class="text-sm">{{ label }}</div>
    </div>
    <span class="text-xs bg-yellow-500 text-black px-2 py-0.5 rounded-full font-semibold">Скоро</span>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
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
