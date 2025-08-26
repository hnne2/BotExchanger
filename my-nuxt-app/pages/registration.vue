<template>
  <div class="register-page">
    <div class=" flex flex-col ">
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

    <div class="background-wrapper">
      <div class="container ">
        <h1 class="title text-left">Завершите процесс<br />регистрации</h1>

        <form @submit.prevent="submitForm" class="form ">
          <input
              v-model="form.lastName"
              type="text"
              placeholder="Фамилия*"
              class="input"
              required
          />

          <input
              v-model="form.firstName"
              type="text"
              placeholder="Имя*"
              class="input"
              required
          />

          <input
              v-model="form.middleName"
              type="text"
              placeholder="Отчество (при наличии)"
              class="input"
          />

          <div class="flex items-center gap-[8px]">
            <div>
              <div
                  @click="form.checked.pp = !form.checked.pp"
                  :class="[
        'w-[16px] h-[16px] rounded-[4px] flex items-center justify-center cursor-pointer border',
        form.checked.pp ? 'bg-[#F4B44D] border-[#F4B44D]' : 'bg-transparent border-[#F4B44D]'
      ]"
              >
                <img
                    v-if="form.checked.pp"
                    src="/img/ptichka.svg"
                    alt="✔"
                    class="w-[12px] h-[12px]"
                />
              </div>
            </div>
            <div class="text-[#F5F5F5] text-[13px] pl-[0.1rem]">
              Я соглашаюсь с Условиями использования мини-приложения            </div>
          </div>
          <button
              type="submit"
              class="submit-button fixed left-1/2 transform -translate-x-1/2 bottom-[2rem] w-[90%] max-w-[400px]"
          >
            Продолжить
          </button>        </form>
      </div>
    </div>
  </div>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}

const form = reactive({
  lastName: '',
  firstName: '',
  middleName: '',
  checked: { terms: false, pp: false },
})

const submitForm = async () => {
  if (!form.checked.pp) {
    alert('Необходимо согласиться с условиями использования')
    return
  }

  if (!import.meta.client) return

  const tg = window.Telegram?.WebApp
  tg?.ready() // важно вызвать, иначе initData может быть пустым
  const initData = tg?.initData ?? ''

  if (!initData) {
    console.error('initData пустое — форма должна открываться в Telegram Mini App')
    return
  }

  try {
    const { data, error } = await useFetch('/api/user', {
      method: 'POST',
      headers: {
        'X-Telegram-Init-Data': initData,
      },
      body: {
        last_name: form.lastName,
        first_name: form.firstName,
        middle_name: form.middleName,
      },
    })

    if (error.value) {
      console.error('Ошибка регистрации:', error.value)
    } else {
      console.log('Успешная регистрация:', data.value)
    }
  } catch (err) {
    console.error('Ошибка запроса:', err)
  }
}
</script>



<style scoped>
.register-page {
  background: #231F25 url('/img/bg_index.svg') no-repeat center 60px; /* сдвиг сверху */
  background-size: cover;
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
  padding: 6rem 1rem;
}

.title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  text-align: left; /* заголовок слева */
  margin-bottom: 2rem;
}



.title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 22px;
  line-height: 120%;
  letter-spacing: 0;
  text-align: left;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 0.75rem;
  border: 1px solid #404040; /* цвет бордера изменен */
  border-radius: 0.5rem;
  background: transparent;
  color: white;
}
.input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.checkbox {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.checkbox input {
  margin-top: 0.2rem;
}

.link {
  color: #f9b233;
  text-decoration: underline;
}

.form-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: flex-end; /* кнопка внизу контейнера */
  height: 100%; /* занимает весь доступный блок */
  gap: 2rem; /* отступ между формой и кнопкой */
}

.submit-button {
  background-color: #f9b233;
  color: #231F25;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500; /* тоньше текста */
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e6a424;
}
</style>
