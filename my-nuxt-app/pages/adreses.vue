<template>
  <div class="bg-[#231F25] min-h-screen text-[#F5F5F5]">
    <div class=" flex flex-col">
      <AppHeader
          title="Адреса обменников"
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
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
            />
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

      <!-- ПЕРЕКЛЮЧАТЕЛЬ -->
      <div class="toggle-group mt-[1rem]">
        <button
            :class="{ active: mode === 'cart' }"
            @click="mode = 'cart'"
        >
          На карте
        </button>
        <button
            :class="{ active: mode === 'list' }"
            @click="mode = 'list'"
        >
          Списком
        </button>
      </div>

      <!-- СПИСОК -->
      <div v-if="mode === 'list' && selectedCity" class="flex flex-col gap-[1rem]">
        <adres-info
            v-for="branch in branches"
            :key="branch.id"
            :title="selectedCity.name"
            :workingHours="branch.working_hours"
            :branch_id="branch.id"
            :city_id="selectedCity.id"
        />
      </div>

      <!-- КАРТА -->

    </div>
    <div v-if="mode === 'cart' && selectedCity" class="" >
      <Cart
          v-if="mode === 'cart' && selectedCity && branches.length > 0"
          :branches="branches"
          :key="selectedCity.id"
      />    </div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const pushesOpen = ref(false)
const menuOpen = ref(false)

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}
const togglePushes = () => {
  pushesOpen.value = !pushesOpen.value
}

const isCityDropdownOpen = ref(false)
const cities = ref([])
const branches = ref([]) // ← теперь это ref([])

const selectedCity = ref(null)
const selectedBranch = ref(null)
const mode = ref('cart')

// ▼ TOGGLE ▼
const toggleCities = () => {
  isCityDropdownOpen.value = !isCityDropdownOpen.value
}

// ▼ ВЫБОР ▼
const selectCity = async (city) => {
  selectedCity.value = city
  selectedBranch.value = null
  isCityDropdownOpen.value = false
  await fetchBranches(city.id)
}

// ▼ ЗАГРУЗКА ГОРОДОВ ▼
const fetchCities = async () => {
  try {
    cities.value = await $fetch('/api/city')
  } catch (e) {
    console.error('Ошибка загрузки городов', e)
    cities.value = []
  }
}

//  ЗАГРУЗКА ФИЛИАЛОВ
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
    }
  }
  document.addEventListener('click', close)
  onUnmounted(() => document.removeEventListener('click', close))
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
  color: #f5f5f5;
}
.toggle-group button.active {
  background: #f4b44d;
  color: #120e14;
}
</style>
