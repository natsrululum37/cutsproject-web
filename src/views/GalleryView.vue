<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-extrabold mb-4 tracking-tight">Galeri</h2>
      <p class="text-gray-400 text-lg">Lihat beberapa karya dan gaya terbaik dari barber kami.</p>
    </div>

    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500"
      >
        <div class="aspect-w-1 aspect-h-1 w-full">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div
          class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
        >
          <span class="text-white text-sm font-medium tracking-wide">{{ image.alt }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  { src: '/gallery1.webp', alt: 'Style 1' },
  { src: '/gallery2.webp', alt: 'style 2' },
  { src: '/gallery3.webp', alt: 'style 3' },
  { src: '/gallery4.webp', alt: 'style 4' },
  { src: '/gallery5.webp', alt: 'style 5' },
  { src: '/gallery6.webp', alt: 'style 6' },
  { src: '/gallery7.webp', alt: 'style 7' },
  { src: '/gallery8.webp', alt: 'style 8' },
  { src: '/gallery9.webp', alt: 'style 9' },
])
</script>

<style scoped>
/* Maintain 1:1 aspect ratio */
.aspect-w-1 {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
.aspect-w-1 img {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
