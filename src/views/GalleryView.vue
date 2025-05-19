<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">Galeri</h2>
      <p class="text-gray-400 text-lg">Lihat beberapa karya dan gaya terbaik dari barber kami.</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative group overflow-hidden rounded-lg shadow-lg"
      >
        <img
          :src="image.src"
          :alt="image.alt"
          class="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
        />
        <div
          class="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition"
        >
          <span class="text-white text-sm">{{ image.alt }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const images = ref([
  { src: '/gallery1.jpeg', alt: 'Style 1' },
  { src: '/gallery2.jpeg', alt: 'Style 2' },
  { src: '/gallery3.jpeg', alt: 'Style 3' },
  { src: '/gallery4.jpeg', alt: 'Style 4' },
])
</script>
