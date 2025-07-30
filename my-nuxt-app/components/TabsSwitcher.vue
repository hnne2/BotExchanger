<template>
  <div class="flex gap-2 mt-4">
    <button
        v-for="item in ['Активные', 'Архив']"
        :key="item"
        @click="$emit('update:modelValue', item)"
        :class="[
        'flex-1 py-2 rounded-full border text-sm',
        modelValue === item
          ? 'bg-yellow-400 border-yellow-400 text-black font-semibold'
          : 'bg-white border-gray-300 text-gray-500'
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
