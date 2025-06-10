<template>
  <div class="min-h-screen bg-black">
    <section class="view-section text-white py-20">
      <div class="text-center mb-12" data-aos="fade-up">
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
              loading="lazy"
              decoding="async"
              @error="handleImageError($event, index)"
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
  </div>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = import.meta.env.BASE_URL

// Error handler untuk gambar
const handleImageError = (event, index) => {
  console.warn(`Failed to load image ${index + 1}:`, event)
  event.target.src = `${baseUrl}images/service-1.webp` // Fallback image
}

const images = ref([
  { src: `${baseUrl}images/gallery/gallery1.webp`, alt: 'Classic Fade Cut' },
  { src: `${baseUrl}images/gallery/gallery2.webp`, alt: 'Modern Pompadour' },
  { src: `${baseUrl}images/gallery/gallery3.webp`, alt: 'Textured Crop' },
  { src: `${baseUrl}images/gallery/gallery4.webp`, alt: 'Clean Fade' },
  { src: `${baseUrl}images/gallery/gallery5.webp`, alt: 'Slick Back Style' },
  { src: `${baseUrl}images/gallery/gallery6.webp`, alt: 'Vintage Cut' },
  { src: `${baseUrl}images/gallery/gallery7.webp`, alt: 'Modern Quiff' },
  { src: `${baseUrl}images/gallery/gallery8.webp`, alt: 'Messy Textured' },
  { src: `${baseUrl}images/gallery/gallery9.webp`, alt: 'Classic Taper' },
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
