<template>
  <div class="exchange-page bg-[#231F25] min-h-screen text-[#F5F5F5]">
    <div class="flex flex-col">
      <AppHeader
          title="Покупка/Продажа"
          @toggle-menu="toggleMenu"
          @toggle-pushes="togglePushes"
      />
      <MenuDrawer :visible="menuOpen">
        <Menu @close="toggleMenu" />
      </MenuDrawer>

      <MenuDrawer :visible="pushesOpen">
        <Pushes @close="togglePushes" />
      </MenuDrawer>

    <div class="mx-[1rem]">
      <!-- переключатели Buy/Sell -->
      <div>
          <div class="toggle-group mt-[1rem]">
            <button
                :class="{ active: mode === 'buy' }"
                @click="changeMode('buy')"
            >Купить</button>
            <button
                :class="{ active: mode === 'sell' }"
                @click="changeMode('sell')"
            >Продать</button>
          </div>

        <!-- СЕЛЕКТ ГОРОДОВ -->
        <div class="relative w-full dropdown-menu mt-[1rem]">
          <button
              @click="toggleCities"
              class="flex h-[3rem] px-[1rem] justify-between items-center w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] text-[16px] text-[#C1BFC6]"
          >
            <span>{{ selectedCity?.name || 'Город' }}</span>
            <svg
                class="w-[16px] h-[16px] text-[#C1BFC6] transform transition-transform"
                :class="{ 'rotate-180': isCityDropdownOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
              v-show="isCityDropdownOpen"
              class="absolute left-0 top-[calc(100%+4px)] w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] z-50"
          >
            <div
                v-for="city in cities"
                :key="city.id"
                @click="selectCity(city)"
                class="px-[16px] py-[12px] text-[16px] text-[#C1BFC6] hover:bg-[#2A2930] cursor-pointer"
            >
              {{ city.name }}
            </div>
          </div>
        </div>


        <!-- СЕЛЕКТ АДРЕСОВ -->
        <div class="relative w-full dropdown-menu mt-[1rem]">
          <button
              @click="selectedCity && toggleBranches()"
              class="flex h-[3rem] px-[1rem] justify-between items-center w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] text-[16px] text-[#C1BFC6]"
          >
            <span>{{ selectedBranch?.address || 'Адрес обменника' }}</span>
            <svg
                class="w-[16px] h-[16px] text-[#C1BFC6] transform transition-transform"
                :class="{ 'rotate-180': isBranchDropdownOpen && selectedCity }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
              v-show="isBranchDropdownOpen && selectedCity"
              class="absolute left-0 top-[calc(100%+4px)] w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] z-50"
          >
            <div
                v-for="branch in branches"
                :key="branch.id"
                @click="selectBranch(branch)"
                class="px-[16px] py-[12px] text-[16px] text-[#C1BFC6] hover:bg-[#2A2930] cursor-pointer"
            >
              {{ branch.address }}
            </div>
          </div>
        </div>


        <!-- СЕЛЕКТ ТИПА ЗАЯВКИ -->
        <div class="relative w-full dropdown-menu mt-[1rem] mb-[1rem]">
          <button
              @click="selectedBranch && toggleTypes()"
              :disabled="!selectedBranch?.address"
              class="flex h-[3rem] px-[1rem] justify-between items-center w-full
             bg-[#1C1B20] border border-[#3F3D45] rounded-[8px]
             text-[16px] text-[#C1BFC6]"
          >
            <span>{{ selectedType?.title || 'Тип заявки' }}</span>
            <svg
                class="w-[16px] h-[16px] text-[#C1BFC6] transform transition-transform"
                :class="{ 'rotate-180': isTypeDropdownOpen }"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Выпадающий список -->
          <div
              v-show="isTypeDropdownOpen && selectedBranch"
              class="absolute left-0 top-[calc(100%+4px)] w-full
             bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] z-50"
          >
            <div
                v-for="type in types"
                :key="type.id"
                @click="selectType(type)"
                class="px-[16px] py-[12px] text-[16px] text-[#C1BFC6]
               hover:bg-[#2A2930] cursor-pointer"
            >
              {{ type.title }}
            </div>
          </div>


        </div>

        <p v-if="selectedType"
           class="text-[12px] text-[#F5F5F5] mt-[8px] pb-[0.5rem] ">
          Лимиты: от {{ currentLimits.min }} до {{ currentLimits.max }} RUB <br> Комиссия обменника : {{ currentLimits.rate * 100 }}%
        </p>


        <div class="bg-[#18141a] rounded-[12px] px-[16px] pt-[16px] pb-[24px] text-[#F5F5F5] text-[14px] font-inter">
          <!-- Верхняя строка -->
          <div class="flex justify-between items-center mb-[12px]">
            <span class="text-[#F4B44D] font-medium text-[13px]">Отдаю</span>
            <span class="text-[#AAAAAA] text-[12px]">
  1 RUB = {{ displayRate }} USDT
</span>          </div>

          <!-- Отдаю -->
          <div class="flex items-center gap-[8px]">
            <input
                v-model="fromAmount"
                type="number"
                placeholder="0"
                class="flex-1 bg-[#120E14] border border-[#3E3A40] rounded-[8px] px-[14px] py-[12px] text-[#F5F5F5] text-[15px] outline-none w-full"
            />

            <!-- справа — выпадашка -->
            <div
                class="bg-[#231F25] text-[#F5F5F5] w-[2.5rem] text-[14px] px-[12px] py-[12px] rounded-[8px] appearance-none outline-none border-none text-center "
            >
              {{ mode === 'buy' ? 'RUB' : 'USDT' }}
            </div>
          </div>
          <div v-if="errorMessage" class="text-red-500 text-[12px] mt-[10px]">
            {{ errorMessage }}
          </div>

          <!-- Получаю -->
          <div class="text-[#F4B44D] font-medium text-[13px] mt-[20px] mb-[12px]">
            Получаю
          </div>

          <div class="flex items-center gap-[8px]">
            <input
                :value="toAmount"
                type="number"
                readonly
                class="flex-1 bg-[#120E14] border border-[#3E3A40] rounded-[8px] px-[14px] py-[12px] text-[#AAAAAA] text-[15px] outline-none w-full"
            />

            <!-- справа фиксированная валюта -->
            <div
                class="min-w-[48px] bg-[#231F25] text-[#F5F5F5] text-[14px] px-[14px] py-[12px] rounded-[8px] text-center border-none">
              {{ mode === 'buy' ? 'USDT' : 'RUB' }}
            </div>
        </div>
        </div>
        <div class="flex items-center  my-[20px] [gap:5px]">
          <input
              v-model="wallet"
              type="text"
              placeholder="Кошелек TRC-20"
              @input="wallet = wallet.replace(/[^a-zA-Z0-9]/g, '')"
              class="flex-1 bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-[8px] px-[16px] py-[13px] outline-none"
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
              v-model="form.lastName"
              type="text"
              placeholder="Фамилия*"
              @input="form.lastName = form.lastName.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')"
              class="h-[30px] bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />

        </div>

        <div class=" flex form-group my-[13px]  ">
          <input
              v-model="form.firstName"
              type="text"
              placeholder="Имя*"
              @input="form.firstName = form.firstName.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')"
              class="h-[30px] bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />
        </div>

        <div class=" flex form-group my-[13px]">
          <input
              v-model="form.middleName"
              type="text"
              placeholder="Отчество (при наличии)"
              @input="form.middleName = form.middleName.replace(/[^a-zA-Zа-яА-ЯёЁ\s-]/g, '')"
              class="h-[30px] bg-[#1a171d] text-[#9C9C9C] border border-[#404040] rounded-md px-[6px] focus:outline-none"
          />
        </div>

        <div class="form-group checkboxes flex flex-col [gap:12px]">
          <div class="flex items-center gap-[8px]">
            <div>
              <div
                  @click="form.checked.terms = !form.checked.terms"
                  :class="[
          'w-[16px] h-[16px] rounded-[4px] flex items-center justify-center cursor-pointer border',
          form.checked.terms ? 'bg-[#F4B44D] border-[#F4B44D]' : 'bg-transparent border-[#F4B44D]'
        ]"
              >
                <img
                    v-if="form.checked.terms"
                    src="/img/ptichka.svg"
                    alt="✔"
                    class="w-[12px] h-[12px]"
                />
              </div>
            </div>
            <div class="text-[#F5F5F5] text-[13px] pl-[0.1rem] pt-[1rem]">
              Я соглашаюсь с
              <a
                  href="https://example.com/terms"
                  target="_blank"
                  class="text-[#F5F5F5] underline decoration-[#F4B44D] underline-offset-2"
              >
                Условиями использования
              </a>
              мини-приложения
            </div>
          </div>

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
              Я соглашаюсь с
              <a
                  href="https://example.com"
                  target="_blank"
                  class="text-[#F5F5F5] underline decoration-[#F4B44D] underline-offset-2 hover:text-[#F4B44D]"
              >
                Условиями обработки
              </a>
              ПД
            </div>
          </div>


        </div>

        <!-- кнопка -->
        <button
            type="button"
            class="submit-btn bg-[#F4B44D] mb-[2rem]"
            @click="submitOrder"
        >
          Создать заявку
        </button>
      </div>

    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
const pushesOpen = ref(false)
const menuOpen = ref(false)

const isCityDropdownOpen = ref(false)
const isBranchDropdownOpen = ref(false)
const isTypeDropdownOpen = ref(false)

const selectedCity = ref(null)


const toggleCities = () => isCityDropdownOpen.value = !isCityDropdownOpen.value
const toggleBranches = () => isBranchDropdownOpen.value = !isBranchDropdownOpen.value
const toggleTypes = () => isTypeDropdownOpen.value = !isTypeDropdownOpen.value

const selectCity = (city: any) => {
  selectedCity.value = city
  form.value.city = city.id
  isCityDropdownOpen.value = false
}

const selectBranch = (branch: any) => {
  selectedBranch.value = branch
  form.value.address = branch.id
  isBranchDropdownOpen.value = false
}

const selectType = (type: any) => {
  selectedType.value = type
  form.value.type = type.id
  isTypeDropdownOpen.value = false
}


const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}

const route = useRoute()


onMounted(async () => {
  try {
    // Загружаем города
    cities.value = await $fetch('/api/city')
    rates.value = await $fetch<RatesResponse>('/api/rates')

    // Если есть query
    if (route.query.city_id) {
      form.value.city = String(route.query.city_id)
      const city = cities.value.find(c => String(c.id) === String(route.query.city_id))
      if (city) {
        selectedCity.value = city
      }
    }
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
  }
})


const router = useRouter()

async function submitOrder() {
  if (errorMessage.value) {
    alert(errorMessage.value)
    return
  }

  if (
      !form.value.city ||
      !form.value.address ||
      !form.value.type ||
      !fromAmount.value ||
      !wallet.value ||
      !form.value.lastName ||
      !form.value.firstName ||
      !form.value.checked.terms ||
      !form.value.checked.pp
  ) {
    alert('Пожалуйста, заполните все обязательные поля и согласитесь с условиями')
    return
  }

  try {
    // вычисляем значения
    const rate = mode.value === 'buy' ? rates.value.buy : rates.value.sell
    const cryptoAmount =
        mode.value === 'buy'
            ? fromAmount.value / rate
            : fromAmount.value * rate

    const commission = currentLimits.value.rate // комиссия в долях (например 0.05)
    const commissionAmount = fromAmount.value * commission

    const payload = {
      type: mode.value, // "buy" или "sell"
      branch_id: form.value.address,
      order_type_id: form.value.type,
      rate: rate,
      amount: fromAmount.value,
      crypto_amount: Number(cryptoAmount.toFixed(6)),
      commission: commission * 100, // в процентах
      commission_amount: Number(commissionAmount.toFixed(2)),
      wallet: wallet.value,
      name: form.value.firstName,
      surname: form.value.lastName,
      patronymic: form.value.middleName || ''
    }

    console.log('Payload:', payload)

    const response = await $fetch<{ order_id: number }>('/api/order', {
      method: 'POST',
      body: payload,
    })

    router.push({
      path: '/status',
      query: { success: 'true', order: response.order_id.toString() },
    })
  } catch (err) {
    console.error('Ошибка при создании заявки:', err)

    router.push({
      path: '/status',
      query: { success: 'false' },
    })
  }
}



interface RatesResponse {
  buy: number
  sell: number
}

const props = defineProps<{
  options: string[]
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])
const selected = ref(props.modelValue)

watch(selected, (value) => {
  emit('update:modelValue', value)
})

/** =========================
 * 1. Состояние формы
 ========================== */
const form = ref({
  city: '',
  address: '',
  branch_id: '',
  type: '',
  rub: null as number | null,
  name: '',
  contact: '',
  wallet: '',
  lastName: '',
  firstName: '',
  middleName: '',
  checked: { terms: false, pp: false },
})

/** =========================
 * 2. Общие переменные / флаги
 ========================== */
const isSuccess = ref(false)
const requestNumber = ref('')
const wallet = ref('')
const mode = ref<'buy' | 'sell'>('buy')
const fromAmount = ref(0)

const fromCurrency = ref('fiat')   // Отдаю
const toCurrency = ref('crypto')  // Получаю

/** =========================
 * 3. Данные из API
 ========================== */
const cities = ref<any[]>([])
const branches = ref<any[]>([])
const types = ref<any[]>([])
const selectedBranch = ref<Record<string, any>>({})
const rates = ref<RatesResponse>({ buy: 0, sell: 0 }) // ✅ дефолтное значение

/** =========================
 * 4. Вычисляемые значения
 ========================== */
const displayRate = computed(() => {
  if (!rates.value) return '-'
  return mode.value === 'buy'
      ? rates.value.buy
      : rates.value.sell
})

const selectedType = computed(() => {
  return types.value.find(t => t.id === form.value.type)
})

const currentLimits = computed(() => {
  if (!selectedType.value) return { min: 0, max: 0 }

  return mode.value === 'sell'
      ? selectedType.value.sell
      : selectedType.value.buy
})

const toAmount = computed(() => {
  if (!fromAmount.value) return '0.00'

  const rate = mode.value === 'buy' ? rates.value.buy : rates.value.sell
  const commission = currentLimits.value?.rate || 0  // если не выбрали обменник, комиссия = 0

  let result = 0

  if (mode.value === 'buy') {
    // Покупка USDT за рубли → делим на курс и вычитаем комиссию
    result = (fromAmount.value / rate) * (1 - commission)
  } else {
    // Продажа USDT → умножаем на курс и вычитаем комиссию
    result = (fromAmount.value * rate) * (1 - commission)
  }

  return result.toFixed(2)
})

const errorMessage = ref('')

watch(fromAmount, (value) => {
  if (!selectedType.value) {
    errorMessage.value = ''
    return
  }

  const limits = currentLimits.value
  if (value < limits.min || value > limits.max) {
    errorMessage.value = `Сумма должна быть от ${limits.min} до ${limits.max} RUB`
  } else {
    errorMessage.value = ''
  }
})

/** =========================
 * 5. Методы
 ========================== */
const pasteFromClipboard = async () => {
  try {
    const text = await navigator.clipboard.readText()
    wallet.value = text
  } catch (err) {
    console.error('Ошибка чтения из буфера обмена:', err)
  }
}


function changeMode(newMode: 'buy' | 'sell') {
  mode.value = newMode
  isSuccess.value = false

  if (newMode === 'buy') {
    fromCurrency.value = 'fiat'
    toCurrency.value = 'crypto'
  } else {
    fromCurrency.value = 'crypto'
    toCurrency.value = 'fiat'
  }
}

const fetchOrderTypes = async (branchId: string | number) => {
  try {
    const data = await $fetch(`/api/branch/${branchId}/order-types`)
    types.value = data
  } catch (e) {
    console.error('Ошибка при загрузке типов заявок:', e)
    types.value = []
  }
}

const fetchBranch = async (branchId: string | number) => {
  try {
    const branch = await $fetch(`/api/branch/${branchId}`)
    selectedBranch.value = branch
  } catch (e) {
    console.error('Ошибка при получении филиала:', e)
  }
}

/** =========================
 * 6. Загрузка данных
 ========================== */
onMounted(async () => {
  try {
    cities.value = await $fetch('/api/city')
    rates.value = await $fetch<RatesResponse>('/api/rates')
    console.log('Курсы:', rates.value)
  } catch (error) {
    console.error('Ошибка при инициализации:', error)
  }
})

watch(() => form.value.city, async (newCityId) => {
  if (!newCityId) return

  // 🔄 сброс при смене города
  form.value.address = ''
  form.value.type = ''
  selectedBranch.value = {}
  types.value = []

  // загружаем новые адреса
  branches.value = await $fetch(`/api/city/${newCityId}/branches`)

  if (route.query.branch_id) {
    const branch = branches.value.find(b => b.id === Number(route.query.branch_id))
    if (branch) {
      form.value.address = String(branch.id)
      selectedBranch.value = branch
    }
  }
})
watch(() => form.value.address, (newBranchId) => {
  // 🔄 сброс типа заявки при смене адреса
  form.value.type = ''
  types.value = []

  if (newBranchId) {
    fetchOrderTypes(newBranchId)
    fetchBranch(newBranchId)
  }
})
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
  font-weight: 200;

}
.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 200;
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
