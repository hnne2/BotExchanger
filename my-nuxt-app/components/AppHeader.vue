<template>
  <div class="relative">
    <header class="app-header bg-gradient-to-b from-[#231F25] to-[#2d2830] shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
      <!-- Кнопка меню -->
      <button class="menu-btn ml-[20px]" @click="$emit('toggle-menu')">
        <img src="/img/menu.svg" alt="Меню" class="icon" />
      </button>

      <!-- Заголовок / логотип -->
      <div class="header-title ">
        <slot v-if="title">{{ title }}</slot>
        <img v-else src="/img/header_criptogex.svg" alt="Crypto Gex" class="logo" />
      </div>

      <!-- Кнопка пушей -->
      <button class="notify-btn mr-[20px]" @click="$emit('toggle-pushes')">
        <img src="/img/notifi.svg" alt="Уведомления" class="icon" />
      </button>
    </header>

    <!-- Градиентный переход -->
    <div class="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#2d2830] to-transparent"></div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 5px;
  color: white;
  position: relative;
  z-index: 10;
}

.menu-btn,
.notify-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

.header-title {
  font-size: 1rem;
  font-weight: bold;
}

.logo {
  width: 80px;
}
</style>
