<template>
  <div class="bg-[#1F1B23] min-h-screen flex flex-col">
    <!-- Header -->
    <div class="flex items-center justify-between h-[56px] px-[16px] border-b border-[#2C2830]">
      <h1 class="text-[16px] leading-[140%] font-medium text-[#F5F5F5]">
        Уведомления
      </h1>
      <button>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none">
          <path stroke="#F5F5F5" stroke-width="2" stroke-linecap="round" d="M5 5l10 10M15 5L5 15" />
        </svg>
      </button>
    </div>

    <!-- List -->
    <div class="flex flex-col gap-[12px] px-[16px] py-[16px]">
      <!-- Активные -->
      <div
          v-for="i in 3"
          :key="'active-' + i"
          class="flex items-center justify-between bg-gradient-to-r from-[#2B2731] to-[#403742] rounded-[8px] px-[12px] py-[12px]"
      >
        <div class="flex flex-col">
          <span class="text-[14px] leading-[140%] font-medium text-[#F5F5F5]">
            Заголовок уведомления
          </span>
          <span class="text-[12px] leading-[140%] text-[#9C9C9C]">
            Описание уведомления 1-2 строки
          </span>
        </div>
        <button
            class="flex items-center justify-center w-[32px] h-[32px] bg-[#F9A825] rounded-[6px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none">
            <path stroke="#1F1B23" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M5 3l5 4-5 4" />
          </svg>
        </button>
      </div>

      <!-- Неактивные -->
      <div
          v-for="i in 3"
          :key="'inactive-' + i"
          class="flex flex-col justify-center border border-[#403D45] rounded-[8px] px-[12px] py-[12px] opacity-50"
      >
        <span class="text-[14px] leading-[140%] font-medium text-[#F5F5F5]">
          Заголовок уведомления
        </span>
        <span class="text-[12px] leading-[140%] text-[#9C9C9C]">
          Описание уведомления 1-2 строки
        </span>
      </div>
    </div>
  </div>
</template>
