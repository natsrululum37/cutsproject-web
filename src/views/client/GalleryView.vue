<template>
  <div class="min-h-screen bg-black">
    <section class="view-section text-white py-12 sm:py-16">
      <div class="text-center mb-10 sm:mb-14">
        <h2 class="text-3xl sm:text-4xl font-extrabold mb-3 text-yellow-400 drop-shadow-md">Galeri</h2>
        <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
          Lihat beberapa karya dan gaya terbaik dari barber kami.
        </p>
      </div>

      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto"
      >
        <button
          v-for="(image, index) in images"
          :key="index"
          type="button"
          class="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 fade-up-gallery focus:outline-none focus:ring-2 focus:ring-yellow-400"
          :style="{ animationDelay: (0.1 + index * 0.1) + 's' }"
          @click="openModal(image)"
          :aria-label="`Perbesar gambar: ${image.alt}`"
        >
          <div class="aspect-square w-full relative">
            <img
              :src="image.src"
              :alt="image.alt"
              class="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
              decoding="async"
              @error="handleImageError($event, index)"
            />
          </div>
          <div
            class="absolute inset-0 bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
          >
            <span class="text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded bg-black/40 drop-shadow-lg">
              {{ image.alt }}
            </span>
          </div>
        </button>
      </div>

      <!-- Modal Lightbox -->
      <div
        v-if="modalImage"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
        @click.self="closeModal"
      >
        <div class="relative max-w-lg w-full mx-4">
          <button
            class="absolute top-2 right-2 text-white bg-black/60 rounded-full p-2 hover:bg-yellow-400 hover:text-black transition"
            @click="closeModal"
            aria-label="Tutup"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <img
            :src="modalImage.src"
            :alt="modalImage.alt"
            class="w-full rounded-xl shadow-2xl"
          />
          <div class="text-center mt-4 text-white text-base font-semibold">{{ modalImage.alt }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const baseUrl = import.meta.env.BASE_URL

const handleImageError = (event, index) => {
  event.target.src = `${baseUrl}images/service-1.webp`
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

const modalImage = ref(null)
function openModal(image) {
  modalImage.value = image
}
function closeModal() {
  modalImage.value = null
}
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

/* Fade-up animation for gallery card */
.fade-up-gallery {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeUpGallery 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}
@keyframes fadeUpGallery {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
