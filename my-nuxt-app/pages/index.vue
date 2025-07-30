<template>
  <div class="homepage">
    <AppHeader title="garex" />

    <div class="background-wrapper">
      <div class="container">
        <div class="logo-block">
          <img src="/img/lines-bg.svg" alt="Crypto Gex" class="logo" />
          <h1 class="brand">Crypto Gex</h1>
          <p class="subtitle">Безопасный и выгодный обмен с AML-проверкой</p>
        </div>

        <div class="action-buttons">
          <ActionButton icon="💱" label="Покупка и продажа" />
          <ActionButton icon="📄" label="Мои заявки" to="/orders" />
        </div>

        <div class="menu-items">
          <MenuItem icon="📈" label="Курс и комиссии" to="/rates" />
          <MenuItem icon="📍" label="Адреса обменников" to="/locations" />
          <MenuItem icon="🎁" label="Реферальная программа" soon />
          <MenuItem icon="🛠️" label="Поддержка" to="/support" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import ActionButton from '@/components/ActionButton.vue'
import MenuItem from '@/components/MenuItem.vue'
</script>

<style scoped>
.homepage {
  background: #0e0c11;
  color: white;
  min-height: 100vh;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

.background-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 2rem 1rem 4rem;
  background-image: url('/img/lines-bg.svg');
  background-repeat: no-repeat;
  background-position: center top;
  background-size: cover;
}

.container {
  width: 100%;
  max-width: 420px;
}

.logo-block {
  text-align: center;
  margin-bottom: 2rem;
}

.logo {
  width: 72px;
  height: 72px;
  margin: 0 auto 1rem;
}

.brand {
  font-size: 20px;
  font-weight: 600;
  color: #f9b233;
}

.subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

.action-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
</style>
