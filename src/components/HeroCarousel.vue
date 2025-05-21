<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Carousel Images -->
    <div
      v-for="(slide, index) in slides"
      :key="index"
      class="absolute inset-0 transition-opacity duration-1000"
      :class="{
        'opacity-100 z-20': index === currentIndex,
        'opacity-0 z-10': index !== currentIndex
      }"
    >
      <img
        :src="slide.image"
        alt="Slide"
        class="w-full h-full object-cover"
      />

      <!-- Overlay Content -->
      <div class="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-4">
        <h1
          class="text-white text-4xl md:text-6xl font-bold mb-4"
          data-aos="fade-down"
        >
          {{ slide.title }}
        </h1>
        <p
          class="text-white text-lg md:text-xl mb-6"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          {{ slide.subtitle }}
        </p>
        <router-link
          to="/reservation"
          class="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
          data-aos="zoom-in"
          data-aos-delay="500"
        >
          Reservasi Sekarang
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Import gambar langsung
import hero1 from '@/assets/images/hero1.webp'
import hero2 from '@/assets/images/hero2.webp'
import hero3 from '@/assets/images/hero3.webp'

const slides = [
  {
    image: hero1,
    title: 'CutsProject Barbershop',
    subtitle: 'Gaya rambut modern untuk pria masa kini',
  },
  {
    image: hero2,
    title: 'Pelayanan Premium',
    subtitle: 'Stylist profesional dan suasana nyaman',
  },
  {
    image: hero3,
    title: 'Reservasi Mudah',
    subtitle: 'Cukup klik, duduk, dan tampil keren!',
  }
]

const currentIndex = ref(0)
let intervalId = null

onMounted(() => {
  intervalId = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  clearInterval(intervalId)
})
</script>

<style scoped>
/* Optional: smooth transition on opacity */
</style>

