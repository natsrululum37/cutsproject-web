<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-6xl mx-auto text-center mb-12" data-aos="fade-up">
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
        data-aos="zoom-in"
        :data-aos-delay="index * 100"
      >
        <div class="aspect-square w-full relative">
          <img
            :src="image.src"
            :alt="image.alt"
            class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 absolute top-0 left-0"
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
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  })
})

const images = ref([
  { src: '/gallery1.webp', alt: 'Style 1' },
  { src: '/gallery2.webp', alt: 'Style 2' },
  { src: '/gallery3.webp', alt: 'Style 3' },
  { src: '/gallery4.webp', alt: 'Style 4' },
  { src: '/gallery5.webp', alt: 'Style 5' },
  { src: '/gallery6.webp', alt: 'Style 6' },
  { src: '/gallery7.webp', alt: 'Style 7' },
  { src: '/gallery8.webp', alt: 'Style 8' },
  { src: '/gallery9.webp', alt: 'Style 9' },
])
</script>

<style scoped>
.aspect-square {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
}
.aspect-square img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
