<template>
  <div class="min-h-screen section-dark">
    <div class="view-section section-spacing-y">
      <!-- Judul -->
      <div class="text-center mb-10 mt-10">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3 text-yellow-400 drop-shadow-md">Ulasan Pelanggan</h1>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Lihat apa yang dikatakan pelanggan kami tentang pengalaman mereka di CutsProject
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-4"></div>
        <p class="text-yellow-400 font-semibold">Memuat ulasan...</p>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-10">
        <p class="text-red-400 font-semibold mb-4">❌ {{ error }}</p>
        <button 
          @click="loadReviews" 
          class="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition"
        >
          Coba Lagi
        </button>
      </div>

      <!-- Empty State -->
      <div v-else-if="reviews.length === 0" class="text-center py-10">
        <p class="text-gray-400 font-semibold mb-4">💬 Belum ada ulasan</p>
        <p class="text-sm text-gray-500">Jadilah yang pertama memberikan ulasan!</p>
      </div>

      <!-- List Ulasan -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, index) in reviews"
          :key="review.id || index"
          class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl fade-up-review"
          :style="{ animationDelay: (0.1 + index * 0.1) + 's' }"
        >
          <div class="flex items-start mb-4">
            <img
              :src="getAvatarUrl(review.avatar)"
              :alt="review.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              @error="handleAvatarError($event)"
            />
            <div class="ml-4 flex-1">
              <h3 class="font-semibold text-white text-base">{{ review.name }}</h3>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400 text-lg">
                  <span v-for="star in review.rating" :key="star">★</span>
                  <span v-for="star in 5 - review.rating" :key="'empty' + star" class="text-gray-600">☆</span>
                </div>
                <span class="ml-2 text-xs text-gray-400">{{ formatDate(review.createdAt) }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-3">{{ review.comment }}</p>
          <div class="text-xs text-gray-400">
            <span>Layanan: <span class="font-semibold text-yellow-400">{{ getServiceName(review.serviceId) }}</span></span>
          </div>
        </div>
      </div>

      <!-- Tombol Tambah Ulasan -->
      <div class="text-center mt-12">
        <button
          @click="openReviewForm"
          class="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          {{ showForm ? 'Tutup Form' : 'Tambah Ulasan' }}
        </button>
      </div>

      <!-- Form Tambah Ulasan -->
      <div v-if="showForm" class="mt-10 max-w-xl mx-auto bg-zinc-800 p-6 rounded-xl border border-zinc-700 fade-up-review" style="animation-delay:0.2s">
        <h2 class="text-white font-semibold text-xl mb-4">Tulis Ulasan Anda</h2>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-gray-300 mb-1">Nama</label>
            <input 
              v-model="newReview.name" 
              required 
              class="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none"
              placeholder="Masukkan nama Anda"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Avatar (URL) - Opsional</label>
            <input 
              v-model="newReview.avatar" 
              class="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Rating</label>
            <select 
              v-model.number="newReview.rating" 
              required 
              class="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none"
            >
              <option value="" disabled>Pilih Rating</option>
              <option v-for="n in 5" :key="n" :value="n">{{ n }} Bintang</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Layanan</label>
            <select 
              v-model="newReview.serviceId" 
              required 
              class="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none"
            >
              <option value="" disabled>Pilih Layanan</option>
              <option v-for="service in services" :key="service.id" :value="service.id">
                {{ service.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Komentar</label>
            <textarea 
              v-model="newReview.comment" 
              required 
              rows="4" 
              class="w-full p-2 rounded bg-zinc-700 text-white border border-zinc-600 focus:border-yellow-400 focus:outline-none resize-none"
              placeholder="Bagikan pengalaman Anda..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            :disabled="submitting"
            class="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 w-full transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Ulasan' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const showForm = ref(false)
const loading = ref(true)
const error = ref(null)
const submitting = ref(false)
const services = ref([])
const reviews = ref([])

const newReview = ref({
  name: '',
  avatar: '',
  rating: '',
  comment: '',
  serviceId: ''
})

// Default avatar jika tidak ada atau error
const defaultAvatar = 'https://ui-avatars.com/api/?name=User&background=fbbf24&color=000&size=48'

// Function untuk mendapatkan URL avatar yang valid
const getAvatarUrl = (avatar) => {
  if (!avatar) return defaultAvatar
  if (avatar.startsWith('http')) return avatar
  if (avatar.startsWith('/')) return `${window.location.origin}${avatar}`
  return defaultAvatar
}

const handleAvatarError = (event) => {
  event.target.src = defaultAvatar
}

const formatDate = (dateString) => {
  if (!dateString) return 'Tidak diketahui'
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now - date)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 1) return 'Hari ini'
  if (diffDays === 2) return 'Kemarin'
  if (diffDays <= 7) return `${diffDays - 1} hari yang lalu`
  if (diffDays <= 30) return `${Math.floor(diffDays / 7)} minggu yang lalu`
  if (diffDays <= 365) return `${Math.floor(diffDays / 30)} bulan yang lalu`
  return date.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getServiceName = (serviceId) => {
  const service = services.value.find(s => s.id === serviceId)
  return service ? service.name : 'Layanan tidak diketahui'
}

const loadReviews = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('http://localhost:3000/api/reviews')
    if (!Array.isArray(response.data)) {
      throw new Error('Format data ulasan tidak valid')
    }
    reviews.value = response.data.sort((a, b) => {
      return new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at)
    })
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Gagal memuat ulasan'
    reviews.value = [] // Tidak fallback ke data static, hanya tampil error
  } finally {
    loading.value = false
  }
}

const loadServices = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/services')
    services.value = Array.isArray(response.data) ? response.data : []
  } catch {
    services.value = []
  }
}

const openReviewForm = () => {
  showForm.value = !showForm.value
  if (showForm.value) {
    newReview.value = {
      name: '',
      avatar: '',
      rating: '',
      comment: '',
      serviceId: ''
    }
  }
}

const submitReview = async () => {
  submitting.value = true
  try {
    const reviewData = {
      ...newReview.value,
      avatar: newReview.value.avatar || null
    }
    await axios.post('http://localhost:3000/api/reviews', reviewData)
    Swal.fire({
      icon: 'success',
      title: 'Ulasan berhasil dikirim!',
      text: 'Terima kasih atas ulasan Anda',
      showConfirmButton: false,
      timer: 2000
    })
    await loadReviews()
    showForm.value = false
    newReview.value = {
      name: '',
      avatar: '',
      rating: '',
      comment: '',
      serviceId: ''
    }
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal mengirim ulasan',
      text: err.response?.data?.message || 'Silakan coba lagi',
      confirmButtonColor: '#fbbf24'
    })
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  await Promise.all([
    loadServices(),
    loadReviews()
  ])
})
</script>

<style scoped>
.fade-up-review {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeUpReview 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeUpReview {
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

/* Form input focus styles */
input:focus,
select:focus,
textarea:focus {
  box-shadow: 0 0 0 2px rgba(251, 191, 36, 0.2);
}
</style>