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

      <!-- List Ulasan -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl fade-up-review"
          :style="{ animationDelay: (0.1 + index * 0.1) + 's' }"
        >
          <div class="flex items-start mb-4">
            <img
              :src="review.avatar"
              :alt="review.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400"
            />
            <div class="ml-4 flex-1">
              <h3 class="font-semibold text-white text-base">{{ review.name }}</h3>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400 text-lg">
                  <span v-for="star in review.rating" :key="star">★</span>
                  <span v-for="star in 5 - review.rating" :key="'empty' + star" class="text-gray-600">☆</span>
                </div>
                <span class="ml-2 text-xs text-gray-400">{{ review.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300 text-sm mb-3">{{ review.comment }}</p>
          <div class="text-xs text-gray-400">
            <span>Layanan: <span class="font-semibold text-yellow-400">{{ review.service }}</span></span>
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
            <input v-model="newReview.name" required class="w-full p-2 rounded bg-zinc-700 text-white" />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Avatar (URL)</label>
            <input v-model="newReview.avatar" class="w-full p-2 rounded bg-zinc-700 text-white" />
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Rating</label>
            <select v-model.number="newReview.rating" required class="w-full p-2 rounded bg-zinc-700 text-white">
              <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
            </select>
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Layanan</label>
            <select v-model="newReview.serviceId" required class="w-full p-2 rounded bg-zinc-700 text-white">
              <option value="" disabled>Pilih Layanan</option>
              <option v-for="service in services" :key="service.id" :value="service.id">
                {{ service.name }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-gray-300 mb-1">Komentar</label>
            <textarea v-model="newReview.comment" required rows="4" class="w-full p-2 rounded bg-zinc-700 text-white"></textarea>
          </div>
          <button type="submit" class="bg-yellow-500 text-black px-6 py-2 rounded font-semibold hover:bg-yellow-400 w-full">
            Kirim Ulasan
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
const services = ref([])

const reviews = ref([
  {
    name: 'Budi Santoso',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    rating: 5,
    date: '2 hari yang lalu',
    comment: 'Pelayanan sangat bagus, hasil potongan rambut sesuai dengan keinginan. Recommended!',
    service: 'Haircut Classic',
  },
  {
    name: 'Rizky Fadillah',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Potongannya selalu rapi dan sesuai request. Tempatnya nyaman, pelayanannya top!',
    service: 'Haircut & Beard',
  },
  {
    name: 'Andi Saputra',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    date: '1 minggu yang lalu',
    comment: 'Barbernya ramah dan tahu gaya kekinian. Recommended banget!',
    service: 'Haircut',
  },
  {
    name: 'Fajar Hidayat',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Sudah langganan dari lama, hasilnya selalu memuaskan. Kalian wajib kesini!',
    service: 'Hair Coloring',
  },
])

const newReview = ref({
  name: '',
  avatar: '',
  rating: 5,
  comment: '',
  serviceId: ''
})

const openReviewForm = () => {
  showForm.value = !showForm.value
}

const submitReview = async () => {
  try {
    await axios.post('http://localhost:3000/api/reviews', newReview.value)
    Swal.fire({
      icon: 'success',
      title: 'Ulasan berhasil dikirim!',
      showConfirmButton: false,
      timer: 1500
    })
    showForm.value = false
    const serviceName = services.value.find(s => s.id === newReview.value.serviceId)?.name || ''
    reviews.value.unshift({ ...newReview.value, date: 'Baru saja', service: serviceName })
    newReview.value = { name: '', avatar: '', rating: 5, comment: '', serviceId: '' }
  } catch (error) {
    console.error('Gagal mengirim ulasan:', error)
    Swal.fire({
      icon: 'error',
      title: 'Gagal mengirim ulasan',
      text: 'Coba lagi.'
    })
  }
}

// Fetch daftar layanan dari backend
onMounted(async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/services')
    services.value = res.data
  } catch (err) {
    console.error('Gagal mengambil daftar layanan:', err)
    services.value = []
  }
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
</style>
