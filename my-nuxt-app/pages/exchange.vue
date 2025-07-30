<template>
  <div class="exchange-page">
    <!-- header/menu -->
    <header class="header">
      <NuxtLink to="/" class="logo">Моно</NuxtLink>
      <h1>Купить / Продать</h1>
    </header>

    <!-- переключатели Buy/Sell -->
    <div class="toggle-group">
      <button
          :class="{ active: mode === 'buy' }"
          @click="mode = 'buy'"
      >Купить</button>
      <button
          :class="{ active: mode === 'sell' }"
          @click="mode = 'sell'"
      >Продать</button>
    </div>

    <!-- форма заявки -->
    <form @submit.prevent="submit">
      <div class="form-group">
        <label>Адрес обменника (Город)</label>
        <input v-model="form.city" type="text" placeholder="Город" required/>
      </div>
      <div class="form-group">
        <label>Адрес обменника</label>
        <input v-model="form.address" type="text" placeholder="Улица, дом" required/>
      </div>
      <div class="form-group">
        <label>Тип заявки</label>
        <select v-model="form.type">
          <option disabled value="">Выберите тип...</option>
          <option v-for="t in types" :key="t.value" :value="t.value">
            {{ t.label }}
          </option>
        </select>
        <small>{{ currentTypeDesc }}</small>
      </div>
      <div class="form-group">
        <label>Сумма (₽)</label>
        <input v-model.number="form.rub" type="number" placeholder="0" required/>
      </div>
      <div class="info-row">
        <span>Курс:</span><span>{{ rate }}</span>
      </div>
      <div class="info-row">
        <span>Комиссия:</span><span>{{ commission }}</span>
      </div>
      <div class="info-row">
        <span>Получите (USDT):</span><span>{{ calcUSDT }}</span>
      </div>
      <div class="form-group">
        <label>ФИО</label>
        <input v-model="form.name" type="text" placeholder="Имя Фамилия" required/>
      </div>
      <div class="form-group">
        <label>Телефон или email</label>
        <input v-model="form.contact" type="text" placeholder="+7..." required/>
      </div>
      <div class="form-group">
        <label>Кошелёк TRC‑20</label>
        <input v-model="form.wallet" type="text" placeholder="Адрес кошелька" required/>
      </div>
      <div class="form-group checkboxes">
        <label><input type="checkbox" v-model="form.checked.terms" required /> Ознакомлен с условиями</label>
        <label><input type="checkbox" v-model="form.checked.pp" required /> Согласен на обработку персональных данных</label>
      </div>

      <button type="submit" class="submit-btn">Отправить заявку</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const mode = ref('buy')

const types = [
  { value: 'fast', label: 'Быстрый обмен', desc: 'Для быстрых транзакций ~10 мин' },
  { value: 'best', label: 'Лучший курс', desc: 'Ожидаем подходящий курс' },
  { value: 'instant', label: 'Мгновенный', desc: 'Мгновенный перевод' },
]

const form = ref({
  city: '',
  address: '',
  type: '',
  rub: null,
  name: '',
  contact: '',
  wallet: '',
  checked: { terms: false, pp: false },
})

const rate = '₽ / USDT 75.00'     // можно получать из API
const commission = '1.5%'        // тоже из API

const calcUSDT = computed(() => {
  if (!form.value.rub) return '0'
  const rub = form.value.rub
  const pct = 1 + parseFloat(commission) / 100
  return (rub / 75 / pct).toFixed(4)
})

const currentTypeDesc = computed(() => {
  const sel = types.find(t => t.value === form.value.type)
  return sel ? sel.desc : ''
})

function submit() {
  alert(
      `Заявка: ${mode.value}\n` +
      `Город: ${form.value.city}, Адрес: ${form.value.address}\n` +
      `Тип: ${form.value.type}\n` +
      `Сумма: ${form.value.rub} ₽ → ${calcUSDT.value} USDT\n` +
      `ФИО: ${form.value.name}\nКонтакт: ${form.value.contact}\n` +
      `Тр‑20 кошелек: ${form.value.wallet}`
  )
  // здесь — отправка на backend API
}
</script>

<style scoped>
.exchange-page {
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: #fff;
  border-radius: 12px;
  color: #333;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.logo {
  font-weight: 600;
  color: #3390ff;
}
.toggle-group {
  display: flex;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}
.toggle-group button {
  flex: 1;
  padding: 12px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  font-weight: 500;
}
.toggle-group button.active {
  background: #3390ff;
  color: #fff;
}
.form-group {
  margin-bottom: 16px;
}
.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
}
.form-group input,
.form-group select {
  width: 100%;
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
  font-size: 0.95rem;
}
.checkboxes label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  margin-bottom: 4px;
}
.submit-btn {
  width: 100%;
  padding: 12px;
  background: #3390ff;
  border: none;
  color: #fff;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.submit-btn:hover {
  background: #2673cc;
}
</style>
