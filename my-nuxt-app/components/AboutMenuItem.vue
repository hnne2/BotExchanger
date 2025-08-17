<template>
  <div
      class="bg-[#120E1447] flex items-center justify-between px-[16px] py-[12px] mx-[16px] rounded-xl hover:bg-[#2a242e] transition-all mb-[8px]"
  >
    <span class="text-[#F5F5F5] text-[14px]">{{ title }}</span>
    <img
        :src="iconSrc"
        alt="icon"
        class="w-[16px] h-[16px]"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  iconType: {
    type: String,
    default: 'arrow', // 'arrow' или 'bird'
  }
})

const iconSrc = computed(() =>
    props.iconType === 'bird' ? '/img/telegram.svg' : '/img/arrow_right.svg'
)
</script>
