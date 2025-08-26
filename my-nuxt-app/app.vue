<!-- app.vue -->
<template>
  <div class="min-h-screen w-screen bg-[#231F25] text-[#F5F5F5]">
    <NuxtPage />
  </div>
</template>
<script setup>
useHead({
  script: [
    { src: 'https://telegram.org/js/telegram-web-app.js' }
  ]
})
</script>
<style>
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
