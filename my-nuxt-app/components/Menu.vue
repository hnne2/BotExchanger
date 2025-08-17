<template>
  <div class="  menu min-h-screen text-[#F5F5F5]">
    <!-- Шапка -->
    <div class="bg-gradient-to-b from-[#231F25] to-[#2d2830] w-full h-[50px] flex items-center justify-center relative">
      <!-- Крестик слева -->
      <button
          @click="$emit('close')"
          class="absolute left-[20px] top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none focus:outline-none"
      >
        <img src="/img/krestik.svg" alt="Закрыть" class="w-[16px] h-[16px]" />
      </button>

      <!-- Центрированный заголовок -->
      <h2 class="text-[16px] font-semibold font-vela text-center leading-tight">
        Меню
      </h2>
    </div>
    <div class="py-[24px] px-[6px]">
      <!-- Основное -->
      <section class="mt-[32px]">
        <p class="font-vela font-normal text-[#999] text-[14px] mb-[16px] ml-[16px]">Основное</p>
        <div>
          <MenuSection title="Купить и продать" icon="/img/pokupka_prodaja.svg" :disabled="false" />
          <MenuSection title="Мои заявки" icon="/img/moi_zayavki.svg" :disabled="false" />
          <MenuSection title="Адреса обменников" icon="/img/adressObmennika.svg" :disabled="false" />
          <MenuSection title="Курс и комиссии" icon="/img/kurs_komissii.svg" :disabled="false" />
          <MenuSection title="Личные данные" icon="/img/licni_danii.svg" :disabled="false" />
        </div>
      </section>

      <!-- Скоро -->
      <section class="mb-[1rem]">
        <p class="text-[#999] text-[14px] mt-[30px]  ml-[16px]">Скоро</p>
        <div>
          <MenuSection title="Реферальная программа" icon="/img/referalProgram.svg" :disabled="true" />
          <MenuSection title="Мои активы" icon="/img/moi_activi_grey.svg" :disabled="true" />
          <MenuSection title="Онлайн обмен" icon="/img/online_obmen_grey.svg" :disabled="true" />
        </div>
      </section>

      <!-- О нас -->
      <section>
        <p class="text-[#999] text-[14px] mt-[30px]  ml-[16px]" >О нас</p>
        <div class="space-y-2">
          <AboutMenuItem title="О нас" iconType="arrow" />
          <AboutMenuItem title="Поддержка" iconType="arrow" />
          <AboutMenuItem title="Новостной канал" iconType="bird" />
          <AboutMenuItem title="Комьюнити" iconType="bird" />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
