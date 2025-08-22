<template>
  <transition name="slide">
    <div
        v-if="visible"
        class="fixed inset-0 z-[9999] w-screen h-screen bg-[#231f25] bg-no-repeat bg-cover bg-[url('/img/Rectangle.svg')] overflow-y-auto overflow-x-hidden"
    >
      <div class="min-h-screen w-full box-border">
        <slot />
      </div>
    </div>
  </transition>
</template>

<script setup>
import { watch } from 'vue'


const props = defineProps({
  visible: Boolean
})

watch(() => props.visible, (val) => {
  if (val) {
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0) // <--- ВАЖНО
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
