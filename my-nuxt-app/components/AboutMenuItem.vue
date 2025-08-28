<template>
  <component
      :is="!disabled && link ? 'a' : 'div'"
      :href="!disabled ? link : null"
      class=" no-underline bg-[#120E1447] flex items-center justify-between px-[16px] py-[12px] mx-[16px] rounded-xl hover:bg-[#2a242e] transition-all mb-[8px]"
      :class="{ 'opacity-50 pointer-events-none': disabled }"
  >
    <span class="text-[#F5F5F5] text-[14px]">{{ title }}</span>
    <img
        :src="iconSrc"
        alt="icon"
        class="w-[16px] h-[16px]"
    />
  </component>
</template>

<script setup>
const props = defineProps({
  title: String,
  link: String,
  disabled: {
    type: Boolean,
    default: false
  },
  iconType: {
    type: String,
    default: 'arrow' // 'arrow' или 'bird'
  }
})

const iconSrc = computed(() =>
    props.iconType === 'bird' ? '/img/telegram.svg' : '/img/arrow_right.png'
)
</script>
