<template>
  <div class="exchange-page bg-[#231F25] min-h-screen text-[#F5F5F5]">
    <div class="mx-[1rem]">
      <!-- переключатели Buy/Sell -->
      <div>
        <RequestConfirmation
            v-if="isSuccess"
            :request-number="requestNumber"
            @create-another="resetForm"
            @go-to-my-requests="$router.push('/my-requests')"
        />
        <form v-else @submit.prevent="submit">
          <AppHeader title="Купить/Продажа" />

          <div class="toggle-group  mt-[1rem]">
            <button
                :class="{ active: mode === 'buy' }"
                @click="mode = 'buy'"
            >Купить</button>
            <button
                :class="{ active: mode === 'sell' }"
                @click="mode = 'sell'"
            >Продать</button>
          </div>
        <div class="form-group my-[13px]">
          <select
              v-model="form.type"
              class="h-[40px]  w-full bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-[20px] appearance-none focus:outline-none"
          >
            <option disabled value="">Город</option>
            <option v-for="t in types" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <div class="form-group my-[13px]">
          <select
              v-model="form.type"
              class="h-[40px] w-full bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md appearance-none focus:outline-none"
          >
            <option disabled value="">Адрес обменника</option>
            <option v-for="t in types" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <div class="form-group my-[13px]">
          <select
              v-model="form.type"
              class="h-[40px] w-full bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md appearance-none focus:outline-none"
          >
            <option disabled value="">Тип заявки</option>
            <option v-for="t in types" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
        </div>

        <div class="bg-[#18141a] rounded-[12px] px-[16px] pt-[16px] pb-[24px] l text-[#F5F5F5] text-[14px] font-inter">
          <!-- Верхняя строка -->
          <div class="flex justify-between items-center mb-[12px]">
            <span class="text-[#F4B44D] font-medium text-[13px]">Отдаю</span>
            <span class="text-[#AAAAAA] text-[12px]">1 RUB = 0,12345678 USDT</span>
          </div>

          <!-- Поле ввода + select -->
          <div class="flex items-center gap-[8px]">
            <input type="number" placeholder="0"
                   class="flex-1 bg-[#120E14] border border-[#3E3A40] rounded-[8px] px-[14px] py-[12px] text-[#F5F5F5] placeholder-[#F5F5F5] text-[15px] outline-none w-full" />
            <div class="relative">
              <select
                  class="bg-[#231F25] text-[#F5F5F5] text-[14px] pr-[32px] pl-[14px] py-[12px] rounded-[8px] appearance-none outline-none border-none">
                <option>RUB</option>
                <option>USD</option>
                <option>EUR</option>
              </select>
              <!-- Иконка стрелки -->
              <div class="pointer-events-none absolute right-[12px] top-1/2 -translate-y-1/2">
                <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L6 5L11 1" stroke="white" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Метка "Получаю" -->
          <div class="text-[#F4B44D] font-medium text-[13px] mt-[20px] mb-[12px]">
            Получаю
          </div>


          <div class="flex items-center gap-[8px]">
            <input
                type="number"
                placeholder="0"
                class="flex-1 bg-[#120E14] border border-[#3E3A40] rounded-[8px] px-[14px] py-[12px] text-[#F5F5F5] placeholder-[#F5F5F5] text-[15px] outline-none w-full"
            />
            <div
                class="min-w-[48px] bg-[#231F25] text-[#F5F5F5] text-[14px] px-[14px] py-[12px] rounded-[8px] text-center border-none">
              UZDT
            </div>
          </div>

        </div>
        <div class="flex items-center  my-[20px] [gap:5px]">
          <input
              v-model="wallet"
              type="text"
              placeholder="Кошелек TRC-20"
              class="flex-1 bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-[8px] [padding-left:16px] [padding-right:16px] [padding-top:13px] [padding-bottom:13px] outline-none"
          />
          <button
              @click="pasteFromClipboard"
              class="bg-transparent border-none outline-none hover:bg-[#e0a73f] text-[#1a171d]  rounded-[15px]"
          >
            <!-- Иконка clipboard -->
            <img src="/img/copy_button.svg" alt="вставить">
          </button>
        </div>

        <div class=" flex form-group my-[13px]  ">
          <input
              v-model="form.type"
              type="text"
              placeholder="Фамилия"
              class="h-[30px]  bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />
        </div>

        <div class=" flex form-group my-[13px]  ">
          <input
              v-model="form.type"
              type="text"
              placeholder="Имя"
              class="h-[30px]  bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />
        </div>

        <div class=" flex form-group my-[13px]  ">
          <input
              v-model="form.type"
              type="text"
              placeholder="Отчество"
              class="h-[30px]  bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />
        </div>

        <div class="form-group checkboxes flex flex-col [gap:12px]">
          <div class="flex items-center [gap:8px]">
            <div>
              <button
                  type="button"
                  @click="form.checked.terms = !form.checked.terms"
                  :class="form.checked.terms ? 'bg-[url(/img/checkbox-on.svg)]' : 'bg-[url(/img/checkbox-off.svg)]'"
                  class="w-[16px] h-[16px] bg-no-repeat bg-center bg-contain bg-transparent border-none outline-none"
              ></button>
            </div>
            <div class="text-[#F5F5F5] text-[10px] leading-[140%] max-w-[220px]">
              Я соглашаюсь с Условиями использования мини-приложения
            </div>
          </div>

          <div class="flex items-center [gap:8px]">
            <div>
              <button
                  type="button"
                  @click="form.checked.pp = !form.checked.pp"
                  :class="form.checked.pp ? 'bg-[url(/img/checkbox-on.svg)]' : 'bg-[url(/img/checkbox-off.svg)]'"
                  class="w-[16px] h-[16px] bg-no-repeat bg-center bg-contain bg-transparent border-none outline-none"
              ></button>
            </div>
            <div class="text-[#F5F5F5] text-[10px] leading-[140%] max-w-[220px]">
              Я соглашаюсь с Условиями обработки ПД
            </div>
          </div>
        </div>


          <button type="submit" class="submit-btn bg-[#F4B44D]">Создать заявку</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import RequestConfirmation from '@/components/RequestConfirmation.vue'

const isSuccess = ref(false)         // Показывать ли страницу подтверждения
const requestNumber = ref('')        // Номер заявки

const wallet = ref('')
const mode = ref('buy')

const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    wallet.value = text
  } catch (err) {
    console.error('Ошибка чтения из буфера обмена:', err)
  }
}

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

const commission = '1.5%'

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
  // Здесь можно вызвать API и получить настоящий номер заявки
  requestNumber.value = String(Math.floor(100000 + Math.random() * 900000))
  isSuccess.value = true
}

function resetForm() {
  isSuccess.value = false
  requestNumber.value = ''
  form.value = {
    city: '',
    address: '',
    type: '',
    rub: null,
    name: '',
    contact: '',
    wallet: '',
    checked: { terms: false, pp: false },
  }
  wallet.value = ''
}
</script>

<style scoped>

.toggle-group {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 24px;
}
.toggle-group button {
  flex: 1;
  padding: 12px;
  background: #120e14;
  border: none;
  cursor: pointer;
  font-weight: 500;
  color: #F5F5F5;
}
.toggle-group button.active {
  background: #F4B44D;
  color: #120e14;
}
.form-group {
  background-color: transparent;
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
  border: 1px solid #404040;
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
  background: #F4B44D;
  border: none;
  color: #231F25;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
}
.submit-btn:hover {
  background: #2673cc;
}
</style>
