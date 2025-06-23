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
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-6 max-w-6xl mx-auto px-4"
      >
        <div v-if="loading" class="col-span-full text-center py-10 text-yellow-400 font-semibold">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-4"></div>
          <div>Memuat galeri...</div>
        </div>
        
        <div v-else-if="error" class="col-span-full text-center py-10 text-red-400 font-semibold">
          <div class="mb-4">❌ {{ error }}</div>
          <button 
            @click="loadGallery" 
            class="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition"
          >
            Coba Lagi
          </button>
        </div>

        <div v-else-if="images.length === 0" class="col-span-full text-center py-10 text-gray-400 font-semibold">
          <div class="mb-4">📷 Belum ada gambar di galeri</div>
          <p class="text-sm">Silakan tambahkan gambar melalui panel admin</p>
        </div>

        <button
          v-for="(image, index) in images"
          :key="image.id || index"
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
              @load="handleImageLoad($event, index)"
            />
            <!-- Loading placeholder -->
            <div 
              v-if="image.loading" 
              class="absolute inset-0 bg-gray-800 flex items-center justify-center"
            >
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-400"></div>
            </div>
            <!-- Error placeholder -->
            <div 
              v-if="image.error" 
              class="absolute inset-0 bg-gray-800 flex items-center justify-center"
            >
              <div class="text-center text-gray-400">
                <div class="text-2xl mb-2">🖼️</div>
                <div class="text-xs">Gambar tidak tersedia</div>
              </div>
            </div>
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
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        @click.self="closeModal"
        @keydown.esc="closeModal"
      >
        <div class="relative max-w-4xl w-full mx-4">
          <button
            class="absolute top-2 right-2 z-10 text-white bg-black/60 rounded-full p-2 hover:bg-yellow-400 hover:text-black transition"
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
            class="w-full max-h-[80vh] object-contain rounded-xl shadow-2xl"
          />
          <div class="text-center mt-4 text-white">
            <div class="text-base font-semibold">{{ modalImage.alt }}</div>
            <div v-if="modalImage.description" class="text-sm text-gray-300 mt-2">
              {{ modalImage.description }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { getGalleryItems } from '@/services/api.js'

const baseUrl = import.meta.env.BASE_URL

const images = ref([])
const loading = ref(true)
const error = ref(null)
const modalImage = ref(null)

// Function to determine if a string is a valid URL
const isValidUrl = (string) => {
  try {
    new URL(string)
    return true
  } catch (error) {
    console.error('Error parsing URL:', error)
    return false
  }
}

// Function to process image path
const processImagePath = (imagePath) => {
  if (!imagePath) return `${baseUrl}images/service-1.webp` // Default fallback
  
  // If it's already a full URL, return as is
  if (isValidUrl(imagePath)) {
    return imagePath
  }
  
  // If it starts with http or https but isn't a valid URL, treat as relative
  if (imagePath.startsWith('http')) {
    return `${baseUrl}images/gallery/${imagePath}`
  }
  
  // If it's a relative path, construct full path
  if (imagePath.startsWith('/')) {
    return `${baseUrl}${imagePath.substring(1)}`
  }
  
  // Default: assume it's a filename in gallery folder
  return `${baseUrl}images/gallery/${imagePath}`
}

const handleImageError = (event, index) => {
  console.warn(`Failed to load image at index ${index}:`, event.target.src)
  
  // Mark image as error
  images.value[index].error = true
  images.value[index].loading = false
  
  // Try fallback image
  if (!event.target.src.includes('service-1.webp')) {
    event.target.src = `${baseUrl}images/service-1.webp`
  }
}

const handleImageLoad = (event, index) => {
  // Mark image as loaded
  if (images.value[index]) {
    images.value[index].loading = false
    images.value[index].error = false
  }
}

const openModal = (image) => {
  modalImage.value = image
  // Prevent body scroll when modal is open
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  modalImage.value = null
  // Restore body scroll
  document.body.style.overflow = 'auto'
}

const loadGallery = async () => {
  loading.value = true
  error.value = null
  
  try {
    const data = await getGalleryItems()
    
    if (!Array.isArray(data)) {
      throw new Error('Data galeri tidak valid')
    }
    
    images.value = data.map((item, index) => ({
      id: item.id || index,
      src: processImagePath(item.image || item.src || item.url),
      alt: item.title || item.alt || item.name || `Gambar ${index + 1}`,
      description: item.description || item.desc || null,
      loading: true,
      error: false,
      originalData: item // Keep original data for reference
    }))
    
  } catch (err) {
    console.error('Error loading gallery:', err)
    error.value = err.message || 'Gagal memuat galeri. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

// Handle ESC key for modal
const handleKeydown = (event) => {
  if (event.key === 'Escape' && modalImage.value) {
    closeModal()
  }
}

onMounted(async () => {
  await loadGallery()
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Restore body scroll on unmount
  document.body.style.overflow = 'auto'
})
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

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>