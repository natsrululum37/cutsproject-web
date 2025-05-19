<template>
  <section class="relative h-screen overflow-hidden">
    <!-- Background gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-tr from-yellow-400 via-yellow-300 to-yellow-500"
      aria-hidden="true"
    ></div>

    <!-- Carousel arrows -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>
    <button
      @click="nextSlide"
      class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full text-white focus:outline-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Slide content -->
    <div
      v-for="(slide, i) in slides"
      :key="i"
      v-show="current === i"
      class="absolute inset-0 flex items-end"
    >
      <div class="p-8 max-w-md text-white">
        <h2 class="text-3xl font-bold mb-2">{{ slide.title }}</h2>
        <p class="text-sm">{{ slide.subtitle }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

// contoh data slide (anda ganti dengan gambar / konten asli)
const slides = ref([
  {
    title: 'CUTS & PROJECT',
    subtitle: 'Professional barber services at your fingertips',
  },
  {
    title: 'Modern Styles',
    subtitle: 'Trendy cuts & grooming for everyone',
  },
])

const current = ref(0)

function prevSlide() {
  current.value = (current.value + slides.value.length - 1) % slides.value.length
}
function nextSlide() {
  current.value = (current.value + 1) % slides.value.length
}
</script>

<style scoped>
/* Supaya fade antar slide halus */
section > div[v-show] {
  transition: opacity 0.5s ease;
}
</style>
