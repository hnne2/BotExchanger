<template>
  <div class="bg-[#231F25] min-h-screen text-[#F5F5F5]">

    <div class=" flex flex-col">
      <AppHeader
          title="Курс и комиссия"
          @toggle-menu="toggleMenu"
          @toggle-pushes="togglePushes"
      />
      <MenuDrawer :visible="menuOpen">
        <Menu @close="toggleMenu" />
      </MenuDrawer>

      <MenuDrawer :visible="pushesOpen">
        <Pushes @close="togglePushes" />
      </MenuDrawer>

    <div class="mx-[1rem] pt-[1rem]">

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

      <!-- СЕЛЕКТ АДРЕСОВ (всегда показываем) -->
      <div class="relative w-full dropdown-menu mt-[1rem]">
        <button
            @click="toggleBranches"
            class="flex h-[3rem] px-[1rem] justify-between items-center w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] text-[16px] text-[#C1BFC6]"
        >
          <span>{{ selectedBranch?.address || 'Адрес' }}</span>
          <svg
              class="w-[16px] h-[16px] text-[#C1BFC6] transform transition-transform"
              :class="{ 'rotate-180': isBranchDropdownOpen }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
            v-show="isBranchDropdownOpen"
            class="absolute left-0 top-[calc(100%+4px)] w-full bg-[#1C1B20] border border-[#3F3D45] rounded-[8px] z-50"
        >
          <div
              v-if="branches.length > 0"
              v-for="branch in branches"
              :key="branch.id"
              @click="selectBranch(branch)"
              class="px-[16px] py-[12px] text-[16px] text-[#C1BFC6] hover:bg-[#2A2930] cursor-pointer"
          >
            {{ branch.address }}
          </div>
          <div
              v-else
              class="px-[16px] py-[12px] text-[16px] text-[#6F6D74] italic"
          >
            Нет доступных адресов
          </div>
        </div>
      </div>
      <div v-if="!selectedBranch">
        <p class="text-left text-[13px] text-[#9C9C9C] pt-[5px]">Выберите город и адрес обменника, чтобы увидеть подробную информацию. </p>
      </div>

      <div v-if="orderTypes.length > 0" class="mt-[1rem] flex flex-col gap-[1rem]">
        <div
            v-for="type in orderTypes"
            :key="type.id"
            class=" text-[#F4B44D]"
        >
          <!-- Название заявки -->
          <h3 class="text-[16px] font-medium mb-[10px]">
            {{ type.title }}
          </h3>
          <div class="bg-[#120E1447] rounded-[12px] px-[1rem] py-[0.75rem] text-[14px] mb-[12px]">
            <!-- Заголовок -->
            <div class="text-left text-[#F5F5F5] text-[14px] font-medium mb-[0.75rem]">
              Комиссия
            </div>

            <!-- Комиссии -->
            <div class="relative h-[60px]">
              <!-- Покупка (в начале) -->
              <div class="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col items-center">
                <div class="text-[#F4B44D] text-[20px] font-semibold leading-none">
<!--                  {{ type.rates.buy_rate }}%-->
                  30%
                </div>
                <div class="text-[#C1BFC6] mt-[4px]">Покупка</div>
              </div>

              <!-- Продажа (чуть правее центра) -->
              <div class="absolute left-[55%] top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <div class="text-[#F4B44D] text-[20px] font-semibold leading-none">
<!--                  {{ type.rates.sell_rate }}%-->
                  30%
                </div>
                <div class="text-[#C1BFC6] mt-[4px]">Продажа</div>
              </div>
            </div>
          </div>



          <!-- Описание -->
          <p class="text-[14px] text-[#C1BFC6] leading-[1.4]">
            {{ type.description }}
          </p>
        </div>
      </div>



    </div>
  </div>
  </div>
</template>

<script setup>
import {ref, onMounted, onUnmounted} from 'vue'
const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}
// ▼ СТЕЙТ ▼
const isCityDropdownOpen = ref(false)
const isBranchDropdownOpen = ref(false)
const cities = ref([])
const branches = ref([])

const selectedCity = ref(null)
const selectedBranch = ref(null)

const orderTypes = ref([])

const fetchOrderTypes = async (branchId) => {
  orderTypes.value = []
  try {
    orderTypes.value = await $fetch(`/api/branch/${branchId}/order-types`)
  } catch (e) {
    console.error('Ошибка загрузки типов заявок', e)
    orderTypes.value = []
  }
}


// ▼ TOGGLE ▼
const toggleCities = () => {
  isCityDropdownOpen.value = !isCityDropdownOpen.value
}
const toggleBranches = () => {
  isBranchDropdownOpen.value = !isBranchDropdownOpen.value
}

// ▼ ВЫБОР ▼
const selectCity = async (city) => {
  selectedCity.value = city
  selectedBranch.value = null
  isCityDropdownOpen.value = false
  await fetchBranches(city.id)
}

const selectBranch = async (branch) => {
  selectedBranch.value = branch
  isBranchDropdownOpen.value = false
  await fetchOrderTypes(branch.id)
}

const fetchCities = async () => {
  try {
    cities.value = await $fetch('/api/city')
  } catch (e) {
    console.error('Ошибка загрузки городов', e)
    cities.value = []
  }
}

// ЗАГРУЗКА ФИЛИАЛОВ
const fetchBranches = async (cityId) => {
  branches.value = []
  try {
    branches.value = await $fetch(`/api/city/${cityId}/branches`)
  } catch (e) {
    console.error('Ошибка загрузки филиалов', e)
    branches.value = []
  }
}

// ▼ ОБРАБОТЧИК ЗАКРЫТИЯ ▼
onMounted(() => {
  fetchCities()

  const close = (e) => {
    if (!e.target.closest('.dropdown-menu')) {
      isCityDropdownOpen.value = false
      isBranchDropdownOpen.value = false
    }
  }

  document.addEventListener('click', close)
  onUnmounted(() => document.removeEventListener('click', close))
})
</script>
