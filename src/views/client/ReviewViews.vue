<template>
  <div class="min-h-screen section-dark">
    <div class="view-section section-spacing-y">
      <!-- Judul -->
      <div class="text-center mb-10 mt-10">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3 text-yellow-400 drop-shadow-md">
          Ulasan Pelanggan
        </h1>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Lihat apa yang dikatakan pelanggan kami tentang pengalaman mereka di CutsProject
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-10">
        <div
          class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400 mb-4"
        ></div>
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
          :style="{ animationDelay: 0.1 + index * 0.1 + 's' }"
        >
          <div class="flex items-start mb-4">
            <img
              :src="review.avatar"
              :alt="review.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
              @error="
                (e) =>
                  (e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.name)}&background=facc15&color=000`)
              "
            />
            <div class="ml-4 flex-1">
              <h3 class="font-semibold text-white text-base">{{ review.name }}</h3>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400 text-lg">
                  <span v-for="star in review.rating" :key="star">★</span>
                  <span
                    v-for="star in 5 - review.rating"
                    :key="'empty' + star"
                    class="text-gray-600"
                    >☆</span
                  >
                </div>
                <span class="ml-2 text-xs text-gray-400">{{ review.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-3">{{ review.comment }}</p>
          <div class="text-xs text-gray-400">
            <span
              >Layanan:
              <span class="font-semibold text-yellow-400">{{ review.service }}</span></span
            >
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="flex justify-center mt-8">
        <div class="flex space-x-2">
          <button
            @click="changePage(pagination.page - 1)"
            :disabled="pagination.page === 1"
            class="px-3 py-1 rounded bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <div v-for="p in paginationNumbers" :key="p">
            <button
              @click="changePage(p)"
              class="px-3 py-1 rounded"
              :class="
                p === pagination.page
                  ? 'bg-yellow-400 text-black'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              "
            >
              {{ p }}
            </button>
          </div>
          <button
            @click="changePage(pagination.page + 1)"
            :disabled="pagination.page === pagination.totalPages"
            class="px-3 py-1 rounded bg-zinc-800 text-white hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
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
      <div
        v-if="showForm"
        class="mt-10 max-w-xl mx-auto bg-zinc-800 p-6 rounded-xl border border-zinc-700 fade-up-review"
        style="animation-delay: 0.2s"
      >
        <h2 class="text-white font-semibold text-xl mb-4">Tulis Ulasan Anda</h2>
        <form @submit.prevent="submitReview" class="space-y-4">
          <div>
            <label class="block text-gray-300 mb-1">Nama</label>
            <input
              v-model="newReview.name"
              required
              class="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Avatar (URL)</label>
            <input
              v-model="newReview.avatar"
              class="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Rating</label>
            <select
              v-model.number="newReview.rating"
              required
              class="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            >
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Layanan</label>
            <select
              v-model="newReview.serviceId"
              required
              class="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
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
              class="w-full p-2 rounded bg-zinc-700 text-white focus:outline-none focus:ring-1 focus:ring-yellow-400"
            ></textarea>
          </div>
          <button
            type="submit"
            :disabled="submitting"
            class="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 w-full transition-colors disabled:bg-gray-600 disabled:text-gray-300"
          >
            {{ submitting ? 'Mengirim...' : 'Kirim Ulasan' }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const showForm = ref(false)
const loading = ref(true)
const error = ref(null)
const submitting = ref(false)
const services = ref([])
const reviews = ref([])

// Pagination state
const pagination = ref({
  page: 1,
  limit: 9, // 9 review per page untuk grid 3x3
  total: 0,
  totalPages: 0,
})

// Computed untuk pagination numbers (tampilkan max 5 halaman)
const paginationNumbers = computed(() => {
  const numbers = []
  const start = Math.max(1, pagination.value.page - 2)
  const end = Math.min(pagination.value.totalPages, pagination.value.page + 2)

  for (let i = start; i <= end; i++) {
    numbers.push(i)
  }

  return numbers
})

const newReview = ref({
  name: '',
  avatar: '',
  rating: 5,
  comment: '',
  serviceId: '',
})

const loadReviews = async () => {
  loading.value = true
  error.value = null

  try {
    const res = await axios.get('/api/reviews', {
      params: {
        page: pagination.value.page,
        limit: pagination.value.limit,
      },
    })

    // Cek struktur response
    if (res.data && Array.isArray(res.data.data)) {
      reviews.value = res.data.data

      // Update pagination info
      if (res.data.meta) {
        pagination.value = {
          ...pagination.value,
          total: res.data.meta.total,
          totalPages: res.data.meta.totalPages,
        }
      }
    } else {
      console.error('Format response tidak sesuai:', res.data)
      throw new Error('Format data tidak valid')
    }
  } catch (err) {
    console.error('Error loading reviews:', err)
    error.value = 'Gagal memuat ulasan. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return
  pagination.value.page = page
  loadReviews()

  // Scroll to top setelah pindah halaman
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const openReviewForm = () => {
  showForm.value = !showForm.value
}

const submitReview = async () => {
  if (!newReview.value.name || !newReview.value.comment || !newReview.value.serviceId) {
    Swal.fire({
      icon: 'warning',
      title: 'Form tidak lengkap',
      text: 'Semua field wajib diisi kecuali avatar.',
    })
    return
  }

  submitting.value = true

  try {
    await axios.post('/api/reviews', newReview.value)

    Swal.fire({
      icon: 'success',
      title: 'Ulasan berhasil dikirim!',
      showConfirmButton: false,
      timer: 1500,
    })

    showForm.value = false

    // Reset form
    newReview.value = { name: '', avatar: '', rating: 5, comment: '', serviceId: '' }

    // Reload untuk menampilkan ulasan baru
    pagination.value.page = 1 // Kembali ke halaman pertama
    await loadReviews()
  } catch (error) {
    console.error('Gagal mengirim ulasan:', error)

    Swal.fire({
      icon: 'error',
      title: 'Gagal mengirim ulasan',
      text: error.response?.data?.error || 'Silakan coba lagi.',
    })
  } finally {
    submitting.value = false
  }
}

onMounted(async () => {
  try {
    const res = await axios.get('/api/services')
    services.value = res.data
  } catch (err) {
    console.error('Gagal mengambil daftar layanan:', err)
    services.value = []
  }

  await loadReviews()
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

/* Loading spinner */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
