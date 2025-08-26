<template>
  <div ref="mapRef" class="ymap-container" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = defineProps<{
  branches: {
    id: number
    name: string
    address: string
    working_hours: string
    coords: [number, number]
  }[]
}>()

const mapRef = ref<HTMLElement | null>(null)

onMounted(() => {
  const waitForYmaps = () => {
    if ((window as any).ymaps) {
      (window as any).ymaps.ready(() => {
        const ymaps = (window as any).ymaps

        const map = new ymaps.Map(mapRef.value, {
          center: props.branches[0].coords,
          zoom: 12,
          controls: ['zoomControl'],
        })

        props.branches.forEach((branch) => {
          const placemark = new ymaps.Placemark(
              branch.coords,
              {
                balloonContent: `
        <div style="
          background-color: #1e1e1e;
          color: white;
          padding-bottom: 10px;
          padding-left: 10px;
          padding-right: 2px;
          border-radius: 16px;
          width: 100%;
          max-width: 400px;
          box-sizing: border-box;
        ">
           <h3 style="margin-bottom: 8px; font-size: 16px;">${branch.name}</h3>
          <h3 style="margin-bottom: 8px; font-size: 16px;">${branch.address}</h3>
          <p style="margin-bottom: 16px; color: #ccc; font-size: 14px;">
            <b>Время работы:</b> ${branch.working_hours}
          </p>
          <div style="display: flex; gap: 10px;">
            <button style="
              flex: 1;
              padding: 10px;
              background-color: #F4B44D;
              color: #231F25;
              font-weight: 500;
              border: none;
              border-radius: 8px;
              cursor: pointer;
            ">
              Создать заявку
            </button>
            <button style="
              flex: 1;
              padding: 10px;
              background-color: transparent;
              color: #F4B44D;
              border: 1px solid #F4B44D;
              border-radius: 8px;
              cursor: pointer;
            ">
              Подробнее
            </button>
          </div>
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

