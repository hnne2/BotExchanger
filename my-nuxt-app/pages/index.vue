  <template>
    <div class="homepage text-[#F5F5F5]">
      <AppHeader @toggle-menu="toggleMenu" />
      <MenuDrawer :visible="menuOpen">
        <Menu @close="toggleMenu" />
      </MenuDrawer>
      <div class="background-wrapper">
        <div class="container">
          <div class="logo-block">
            <img src="/img/crypto_gex.svg" alt="Crypto Gex" class="logo" />
            <p class="text-[15px] font-semibold text-center leading-[140%] tracking-normal">Безопасный и выгодный обмен с AML-проверкой</p>
          </div>

          <div class="action-buttons">
            <ActionButton icon="/img/pokupka_prodaja.svg" label="Покупка и продажа" />
            <MyOrders icon="/img/moi_zayavki.svg" label="Мои заявки" to="/orders" />
          </div>

          <div class="menu-items">
            <MenuItem icon="/img/kurs_komissii.svg" label="Курс и комиссии" to="/rates" />
            <MenuItem icon="/img/adressObmennika.svg" label="Адреса обменников" to="/locations" />
            <MenuItem icon="/img/referalProgram.svg" label="Реферальная программа" soon />
            <MenuItem icon="/img/podderjka.svg" label="Поддержка" to="/support" />
          </div>
        </div>
      </div>
    </div>
  </template>

  <script setup>
  import AppHeader from '@/components/AppHeader.vue'
  import ActionButton from '@/components/ActionButton.vue'
  import MenuItem from '@/components/MenuItem.vue'
  import MyOrders from '@/components/MyOrders.vue'
  import MenuDrawer from '@/components/MenuDrawer.vue'
  import Menu from '@/components/Menu.vue'


  const menuOpen = ref(false)
  const toggleMenu = () => {
    menuOpen.value = !menuOpen.value
  }
  </script>

  <style scoped>
  .homepage {
    background: #231F25;
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
    padding: 2rem 1rem 5rem;
    background-image: url('/img/bg_index.svg');
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
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
    width: 150px;
    height: 150px;
    margin: -10rem auto -4rem auto;
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
    grid-template-columns: 8fr 5fr; /* или 70fr 30fr — работает одинаково */
    gap: 10px;
    width: 100%;
    margin-bottom: 2rem;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  </style>
