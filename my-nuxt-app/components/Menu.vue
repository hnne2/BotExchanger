<template>
  <div class="  menu min-h-screen text-[#F5F5F5]">
    <!-- Шапка -->
    <div class="bg-gradient-to-b from-[#231F25] to-[#2d2830] w-full flex items-center justify-center relative shadow-[0_2px_10px_rgba(0,0,0,0.4)]">
      <!-- Крестик слева -->
      <button
          @click="$emit('close')"
          class="absolute left-[20px] top-1/2 -translate-y-1/2 p-0 m-0 bg-transparent border-none outline-none focus:outline-none"
      >
        <img src="/img/krestik.svg" alt="Закрыть" class="w-[20px] h-[20px] " />
      </button>

      <!-- Центрированный заголовок -->
      <h2 class="text-[16px] font-semibold font-vela text-center leading-tight">
        Меню
      </h2>
    </div>
    <div class="py-[15px] px-[6px]">
      <!-- Основное -->
      <section class="">
        <p class="font-vela font-normal text-[#999] text-[14px] mb-[16px] ml-[16px]">Основное</p>
        <div>
          <MenuSection title="Купить и продать" icon="/img/pokupka_prodaja.svg" :disabled="false" :link="'/exchange'" />
          <MenuSection title="Мои заявки" icon="/img/moi_zayavki.svg" :disabled="false" :link="'/orders'" />
          <MenuSection title="Адреса обменников" icon="/img/adressObmennika.svg" :disabled="false" :link="'/adreses'"/>
          <MenuSection title="Курс и комиссии" icon="/img/kurs_komissii.svg" :disabled="false" :link="'/course_and_commission'"/>
          <MenuSection title="Личные данные" icon="/img/licni_danii.svg" :disabled="false" :link="'/me'" />
        </div>
      </section>

      <!-- Скоро -->
      <section class="mb-[1rem]">
        <p class="text-[#999] text-[14px] mt-[30px]  ml-[16px]">Скоро</p>
        <div>
          <MenuSection title="Реферальная программа" icon="/img/referalProgram.svg" :disabled="true"  />
          <MenuSection title="Мои активы" icon="/img/moi_activi_grey.svg" :disabled="true" />
          <MenuSection title="Онлайн обмен" icon="/img/online_obmen_grey.svg" :disabled="true" />
        </div>
      </section>

      <!-- О нас -->
      <section>
        <p class="text-[#999] text-[14px] mt-[30px]  ml-[16px]" >О нас</p>
        <div class="space-y-2">
          <AboutMenuItem title="О нас" iconType="arrow" link="/o_nas" />
          <AboutMenuItem title="Поддержка" iconType="arrow" link="/support"  />
          <AboutMenuItem title="Новостной канал" iconType="bird" link="https://t.me/garex_support"/>
          <AboutMenuItem title="Комьюнити" iconType="bird" link="https://t.me/garex_support"  />
        </div>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
