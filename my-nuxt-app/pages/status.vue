<template>
  <div class=" flex flex-col">
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
  <div

      class="min-h-screen h-screen flex items-center justify-center text-white px-[16px] bg-cover bg-center"
      :style="{ backgroundImage: `url(${success ? '/img/bg_succses.svg' : '/img/bg_error.svg'})` }"
  >
    <div class="rounded-[12px] p-[8px] shadow-lg ">
      <!-- Если успех -->
      <template v-if="success">
        <img src="/img/galochka.svg" class="w-[80px] h-[80px] mr-[12px]" />

        <div class="flex items-center mb-[24px]">
          <div class="text-left">
            <h2 class="text-[18px] mb-[4px] text-[#F5F5F5]">
              Заявка {{ orderId }} успешно создана!
            </h2>
            <p class="text-[14px] text-[#F5F5F5]">Ожидайте статуса "Подтверждена".</p>
          </div>
        </div>

        <div class="mes mt-[13px] space-y-[12px]">
          <button
              class="w-full bg-[#F4B44D] hover:bg-[#e0a73f] text-black  py-[10px] rounded-[8px] text-[14px]"
              @click="$router.push('/exchange')"
          >
            Создать ещё заявку
          </button>
          <button
              class="w-full bg-transparent border border-[#F4B44D] text-[#F4B44D] hover:bg-[#e0a73f] hover:text-black  py-[10px] rounded-[8px] text-[14px]"
              @click="$router.push('/orders')"
          >
            Перейти в мои заявки
          </button>
        </div>
      </template>

      <!-- Если ошибка -->
      <template v-else>
        <img src="/img/error.svg" class="w-[80px] h-[80px] mr-[12px]" />

        <div class="flex items-center mb-[24px]">
          <div class="text-left">
            <h2 class="text-[18px]  text-[#F5F5F5] mb-[4px]">
              Что-то пошло не так...
            </h2>
            <p class="text-[14px] text-[#F5F5F5]">
              Произошла ошибка во время создания заявки.<br />
              Пожалуйста, попробуйте ещё раз позднее.
            </p>
          </div>
        </div>

        <div class="mt-[24px] space-y-[12px]">
          <button
              class="w-full bg-[#F4B44D] hover:bg-[#e0a73f] border-transparent text-black  py-[10px] rounded-[8px] text-[14px]"
              @click="$router.push('/exchange')"
          >
            Попробовать ещё раз
          </button>
          <a
              href="https://t.me/garex_support"
              target="_blank"
              rel="noopener noreferrer"
              class="block no-underline w-full border border-[#F4B44D] text-center text-[#F4B44D] hover:bg-[#e0a73f] hover:text-black  py-[10px] rounded-[8px] text-[14px]"
          >
            Написать в поддержку
          </a>
        </div>
      </template>
    </div>
  </div>
  </div>
</template>

<script setup>
const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}
const route = useRoute()

const success = route.query.success===true
const orderId = route.query.order || ''
</script>
<style >
.homepage {
  background: #231F25;
  color: white;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

.mes{
  font-weight: 500;
}
</style>
