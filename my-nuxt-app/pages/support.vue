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

    <div class="bg-[#231F25] min-h-screen flex justify-center text-white px-[16px]">
      <div class="min-h-screen flex flex-col justify-between w-full ">

        <!-- Текст -->
        <div class="text-[1rem] w-full mb-[2rem] text-left text-[#F5F5F5] leading-[1.5]">
          <p class="mb-[1rem]">
            Наши операторы на связи 24/7. Готовы<br class="sm:hidden" />
            ответить на любые вопросы.
          </p>
          <p class="mb-[1rem]">
            Для получения пропуска в наш офис и покупки<br class="sm:hidden" />
            USDT, вам нужно создать заявку через бота.
          </p>
          <p class="mb-[1rem]">
            Для связи с нами напишите<br class="sm:hidden" />
            — <span class="font-medium">@Mosca67_Support</span>
          </p>

          <div class="pt-[0.25rem]">
            <p class="mb-[0.25rem]">Чат с поддержкой:</p>
            <p class="flex items-center gap-[0.4rem]">
              <img src="/img/telegram.svg" alt="Telegram" class="w-[18px] h-[18px]" />
              <a
                  href="https://t.me/garex_support"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-[#F4B44D] underline hover:text-[#e0a73f]"
              >
                @cryptogex_support
              </a>
            </p>
          </div>
        </div>

        <!-- Кнопка -->
        <div class="pt-[2rem] pb-[1rem]">
          <a
              href="https://t.me/garex_support"
              target="_blank"
              rel="noopener noreferrer"
              class="block w-full bg-[#F4B44D] no-underline border border-[#F4B44D] text-center text-[#231F25] hover:bg-[#e0a73f] hover:text-black font-medium py-[10px] rounded-[8px] text-[14px]"
          >
            Написать в поддержку
          </a>
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
