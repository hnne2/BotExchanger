<template>
  <div class="register-page">
    <AppHeader title="Регистрация" />

    <div class="background-wrapper">
      <div class="container">
        <h1 class="title">Завершите процесс<br />регистрации</h1>

        <form @submit.prevent="submitForm" class="form">
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

          <label class="checkbox">
            <input v-model="form.agree" type="checkbox" required />
            <span>
              Я соглашаюсь с
              <a href="#" class="link">Условиями использования мини-приложения</a>
            </span>
          </label>

          <button type="submit" class="submit-button">Продолжить</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

const form = reactive({
  lastName: '',
  firstName: '',
  middleName: '',
  agree: false,
})

const submitForm = () => {
  if (form.agree) {
    console.log('Форма отправлена', form)
    // Здесь можно добавить отправку данных на сервер
  }
}
</script>

<style scoped>
.register-page {
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
  padding: 3rem 1rem 5rem;
  background-image: url('/img/lines-bg.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
}

.container {
  width: 100%;
  max-width: 400px;
}

.title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-style: normal;
  font-size: 20px;
  line-height: 120%;
  letter-spacing: 0;
  text-align: center;
  margin-bottom: 2rem;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input {
  padding: 0.75rem;
  border: 1px solid #f9b233;
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

.submit-button {
  background-color: #f9b233;
  color: black;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #e6a424;
}
</style>
