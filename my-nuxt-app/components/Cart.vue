<template>
  <div ref="mapRef" class="ymap-container" />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const mapRef = ref<HTMLElement | null>(null)

// координаты центра Пензы
const PENZA_COORDS: [number, number] = [53.195873, 45.018316]

onMounted(() => {
  const waitForYmaps = () => {
    if ((window as any).ymaps) {
      (window as any).ymaps.ready(() => {
        const ymaps = (window as any).ymaps

        const map = new ymaps.Map(mapRef.value, {
          center: PENZA_COORDS,
          zoom: 12,
          controls: ['zoomControl'],
        })

        // тестовые плейсмарки в Пензе
        const branches = [
          {
            id: 1,
            name: 'Офис №1',
            address: 'ул. Московская, д. 10',
            working_hours: '09:00 - 18:00',
            coords: [53.195873, 45.018316],
          },
          {
            id: 2,
            name: 'Офис №2',
            address: 'пр. Строителей, д. 5',
            working_hours: '10:00 - 19:00',
            coords: [53.2034, 45.0128],
          },
        ]

        branches.forEach((branch) => {
          const placemark = new ymaps.Placemark(
              branch.coords,
              {
                balloonContent: `
                <div style="background:#1e1e1e;color:white;padding:10px;border-radius:12px;">
                  <h3 style="margin-bottom:8px;font-size:16px;">${branch.name}</h3>
                  <p style="margin-bottom:8px;font-size:14px;">${branch.address}</p>
                  <p style="margin-bottom:8px;color:#ccc;font-size:14px;">
                    <b>Время работы:</b> ${branch.working_hours}
                  </p>
                </div>
                 <div class="flex gap-[12px] w-full pb-[1rem]">
        <button
            @click="goToExchange"
            class="flex-1 px-[16px] py-[10px] bg-[#F4B44D] hover:bg-yellow-600 text-black font-medium rounded-[0.5rem] transition"
        >
          Создать заявку
        </button>
        <button
            @click="goToInfo"
            class="flex-1 px-[16px] py-[10px] bg-transparent border border-[#F4B44D] text-[#F4B44D] hover:bg-yellow-500 hover:text-black font-medium rounded-[0.5rem] transition"
        >
          Подробнее
        </button>
      </div>
              `,
              },
              {
                preset: 'islands#redIcon',
                balloonPanelMaxMapArea: 0,
              }
          )

          map.geoObjects.add(placemark)
        })
      })
    } else {
      setTimeout(waitForYmaps, 300)
    }
  }

  waitForYmaps()
})

</script>


<style scoped>
.ymap-container {
  width: 100%;
  height: 100vh;
}

/* Стилизация всех слоёв балуна */
:global(.ymaps-2-1-79-balloon__layout) {
  background-color: transparent !important;
}

:global(.ymaps-2-1-79-balloon__content) {
  background-color: #1E1E1E !important;
  color: #ffffff !important;
  border-radius: 8px;
  padding: 12px !important;
  width: 100% !important;
  box-sizing: border-box;
}

:global(.ymaps-2-1-79-balloon) {
  background-color: transparent !important;
  box-shadow: none !important;
}

:global(.ymaps-2-1-79-balloon__content-wrapper) {
  background-color: #1E1E1E !important;
  border-radius: 8px;
  padding: 0 !important;
}

:global(.ymaps-2-1-79-balloon__tail) {
  background-color: transparent !important;
}

:global(.ymaps-2-1-79-balloon__header) {
  color: #F4B44D !important;
}

:global(.ymaps-2-1-79-balloon__close-button) {
  filter: invert(1);
}
:global(.ymaps-2-1-79-balloon__content-wrapper) {
  background-color: #1E1E1E !important;
  border-radius: 8px;
  padding: 0 !important;
  overflow: hidden !important; /* 👈 ЭТО ВАЖНО */
}
:global(.ymaps-2-1-79-balloon__layout) {
  background-color: transparent !important;
  overflow: hidden !important; /* 👈 */
  border-radius: 8px !important; /* 👈 */
}
:global(.custom-balloon) {
  background-color: #1e1e1e;
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-family: sans-serif;
  width: 300px;
}

:global(.balloon-title) {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 6px;
}

:global(.balloon-hours) {
  font-size: 0.875rem;
  color: #cccccc;
  margin-bottom: 16px;
}

:global(.balloon-buttons) {
  display: flex;
  gap: 8px;
}

:global(.balloon-btn) {
  flex: 1;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
}

:global(.balloon-btn-yellow) {
  background-color: #F4B44D;
  color: black;
  border: none;
}

:global(.balloon-btn-yellow:hover) {
  background-color: #e0a53e;
}

:global(.balloon-btn-outline) {
  background: transparent;
  border: 1px solid #F4B44D;
  color: #F4B44D;
}

:global(.balloon-btn-outline:hover) {
  background-color: #F4B44D;
  color: black;
}

</style>
