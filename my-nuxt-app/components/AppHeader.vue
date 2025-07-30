<template>
  <header class="app-header">
    <button class="menu-btn" @click="$emit('toggle-menu')">
      ☰
    </button>
    <div class="header-title">
      <slot>{{ title }}</slot>
    </div>
    <button class="notify-btn">
      🔔
    </button>
  </header>
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
  padding: 1rem;
  color: white;
  background-color: #0e0c11;
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
  font-size: 1.2rem;
  font-weight: bold;
}
</style>
