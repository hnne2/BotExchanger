<template>
  <div class="flex gap-4 text-sm mt-4 px-1">
    <button
        v-for="item in ['Все', 'Купить', 'Продать']"
        :key="item"
        @click="$emit('update:modelValue', item)"
        :class="[
        'border-b-2 pb-1',
        modelValue === item
          ? 'border-yellow-400 text-black font-semibold'
          : 'border-transparent text-gray-500'
      ]"
    >
      {{ item }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>()
defineEmits(['update:modelValue'])
</script>
