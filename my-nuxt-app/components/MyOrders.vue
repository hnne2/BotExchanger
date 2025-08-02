<template>
  <NuxtLink
      :to="to"
      class="no-underline flex flex-col items-center justify-start bg-[#120E14A8] [border-radius:8px] p-2 text-center hover:bg-[#2a242e] transition-all text-[#F5F5F5] "
  >
    <img
        :src="icon"
        alt="icon"
        class="w-10 h-10 mb-2 object-contain"
    />
    <div class="text-[15px] font-semibold text-center leading-[140%] tracking-normal mb-[1rem]">{{ label }}</div>
  </NuxtLink>
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
  }
})
</script>
