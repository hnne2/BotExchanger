<template>
  <div
      class="info flex flex-col"
  >
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

  <div class=" min-h-screen flex justify-center text-white px-[16px]">
    <div class="min-h-screen flex flex-col justify-between w-full ">

      <!-- Текст -->
      <div class="text-[1rem] w-full mb-[2rem] text-left text-[#F5F5F5] leading-[1.5]">
        <p class="mb-[1rem]">
          Занимаемся обменом криптовалют более 3х лет. Работаем 24/7. При первом визите необходимо иметь паспорт. Работаем только за наличные рубли. Мы работаем стол в стол, т.е. не храним ваши средства у себя. У нас вы можете купить USDT без комиссии по самому лучшему курсу в Москве
        </p>
        <p class="mb-[1rem]">
          Наш адрес:
          г. Москва, Пресненская набережная 12, Башня Федерация. Восток, этаж 11
        </p>
        <p class="mb-[1rem]">
          Для получения пропуска к нам в офис и покупки USDT, вам нужно создать заявку через бота
        </p>
        <p class="mb-[1rem]">
          Гостевой пропуск выдается на ресепшене:
          На минус первом этаже с 8.00 до 19.00
          На первом этаже c 19.00 до 8.00.
        </p>


      </div>


    </div>
  </div>
  </div>
</template>



<script setup>
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
