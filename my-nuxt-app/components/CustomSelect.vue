<script setup>
import { ref, defineProps, defineEmits } from "vue"

const props = defineProps({
  options: { type: Array, required: true }, // [{ id, name }]
  modelValue: { type: [String, Number, Object], default: null }
})

const emit = defineEmits(["update:modelValue"])

const wrapper = ref(null)
const open = ref(false)

const position = ref({ top: 0, left: 0, width: 0 })

function toggle() {
  open.value = !open.value
  if (open.value && wrapper.value) {
    const rect = wrapper.value.getBoundingClientRect()
    position.value = {
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
      width: rect.width
    }
  }
}

function select(option) {
  emit("update:modelValue", option) // обновляем v-model
  open.value = false
}
</script>

<template>
  <div ref="wrapper" class="inline-block">
    <!-- Кнопка -->
    <div
        @click="toggle"
        class="h-[2.3rem]  bg-[#1a171d] border border-[#404040] rounded-[0.5rem] px-[15px] flex items-center justify-between cursor-pointer select-none"
    >
      <span
          :class="modelValue ? 'text-[#f5f5f5] text-[0.8rem]' : 'text-[#9c9c9c] text-[0.8rem]'"
      >
        {{ modelValue?.name || 'Выберите...' }}
      </span>
      <img src="/img/pticka_down.svg" class="w-4 h-4 ml-2" />
    </div>
  </div>

  <!-- Выпадающее меню -->
  <teleport to="body">
    <ul
        v-if="open"
        class="absolute w-full z-50 bg-[#1a171d] border border-[#404040] rounded-[0.5rem] shadow-lg list-none"
        :style="{
        top: position.top + 'px',
        left: position.left + 'px',
        width: position.width + 'px'
      }"
    >
      <li
          v-for="t in props.options"
          :key="t.id"
          @click="select(t)"
          class="px-[0.8rem] py-[0.3rem] text-[#9C9C9C] cursor-pointer hover:bg-[#2a272d]"
      >
        {{ t.name }}
      </li>
    </ul>
  </teleport>
</template>
