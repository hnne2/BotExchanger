<template>
  <div class="info flex flex-col">
    <AppHeader
        @toggle-menu="toggleMenu"
        @toggle-pushes="togglePushes"
    />

    <MenuDrawer :visible="menuOpen">
      <Menu @close="toggleMenu" />
    </MenuDrawer>

    <MenuDrawer :visible="pushesOpen">
      <Pushes @close="togglePushes" />
    </MenuDrawer>

    <div class="min-h-screen flex justify-center text-white px-[16px]">
      <div class="min-h-screen flex flex-col justify-between w-full">

        <!-- Текст -->
        <div class="text-[1rem] w-full mb-[1rem] text-left text-[#F5F5F5] leading-[1]">
          <p class="mb-[1rem] ml-[0.7rem] text-[#9C9C9C]">
            ФИО
          </p>
          <p class=" ml-[0.7rem] text-[#F5F5F5]">
            {{ fullName }}
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import MenuDrawer from '@/components/MenuDrawer.vue'
import Menu from '@/components/Menu.vue'
import Pushes from '@/components/Pushes.vue'

const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}

defineProps({
  requestNumber: String
})
defineEmits(['create-another', 'go-to-my-requests'])

// Данные пользователя
const user = ref({
  name: '',
  surname: '',
  patronymic: ''
})

// Полное ФИО
const fullName = computed(() => {

  return [user.value.surname, user.value.name, user.value.patronymic].filter(Boolean).join(' ')
})

// Запрос к API при монтировании
onMounted(async () => {
  try {
    const userData = await $fetch('/api/user', { method: 'GET' })
    if (userData) {
      user.value = userData
    }
  } catch (err) {
    console.error('Ошибка запроса:', err)
  }
})
</script>

<style>
.info {
  background-image: url('/img/bg_succses.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #231F25; /* базовый тёмный фон */
}
</style>
