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
            <input v-model="newReview.service" required class="w-full p-2 rounded bg-zinc-700 text-white" />
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
import { ref } from 'vue'
import axios from 'axios'

const showForm = ref(false)

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
  {
    name: 'Yoga Prasetya',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4,
    date: '3 minggu yang lalu',
    comment:
      'Pelayanan cepat dan hasil potongannya keren. Cocok banget buat mahasiswa seperti saya.',
    service: 'Haircut',
  },
  {
    name: 'Ari Wibowo',
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    rating: 5,
    date: '1 bulan yang lalu',
    comment: 'Tempatnya instagramable, hasil potongannya pas banget buat konten. Suka banget!',
    service: 'Haircut & Styling',
  },
  {
    name: 'Dimas Ramadhan',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    rating: 4,
    date: '2 bulan yang lalu',
    comment:
      'Pelayanan cepat, rapi, dan nyaman. Cocok buat kamu yang sibuk dan tetap ingin tampil oke.',
    service: 'Haircut',
  },
  {
    name: 'Reza Maulana',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    rating: 5,
    date: '3 bulan yang lalu',
    comment: 'Gaya potongan sesuai tren! Barbershop ini tahu cara memanjakan pelanggannya.',
    service: 'Haircut & Beard',
  },
  {
    name: 'Rendy Kurniawan',
    avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
    rating: 4,
    date: '6 bulan yang lalu',
    comment: 'Sudah beberapa kali ke sini, hasilnya selalu konsisten dan memuaskan!',
    service: 'Haircut',
  },
  {
    name: 'Ilham Saputra',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    rating: 5,
    date: '9 bulan yang lalu',
    comment: 'Kesan pertama luar biasa. Sekarang jadi langganan tetap. Thanks CutsProject!',
    service: 'Haircut & Styling',
  },
  {
    name: 'Alfan Nugraha',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    rating: 4,
    date: '1 tahun yang lalu',
    comment: 'Bukan cuma potong rambut, tapi juga pengalaman menyenangkan setiap datang.',
    service: 'Haircut',
  },
  {
    name: 'Steven Hartono',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    date: '1 tahun yang lalu',
    comment: 'Tepat waktu, hasil profesional, dan suasananya bikin betah!',
    service: 'Haircut & Beard',
  },
  {
    name: 'Bayu Aditya',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    rating: 4,
    date: '1 tahun yang lalu',
    comment: 'Mereka benar-benar peduli dengan detail. Sangat puas dengan hasil akhirnya.',
    service: 'Haircut',
  },
  {
    name: 'Daniel Permadi',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    date: '1 tahun yang lalu',
    comment: 'Nyaman, bersih, dan profesional. Suka banget sama vibe-nya!',
    service: 'Haircut & Styling',
  },
])

const newReview = ref({
  name: '',
  avatar: '',
  rating: 5,
  comment: '',
  service: ''
})

const openReviewForm = () => {
  showForm.value = !showForm.value
}

const submitReview = async () => {
  try {
    await axios.post('http://localhost:3000/api/reviews', newReview.value)
    alert('Ulasan berhasil dikirim!')
    showForm.value = false
    reviews.value.unshift({ ...newReview.value, date: 'Baru saja' })
    newReview.value = { name: '', avatar: '', rating: 5, comment: '', service: '' }
  } catch (error) {
    console.error('Gagal mengirim ulasan:', error)
    alert('Gagal mengirim ulasan. Coba lagi.')
  }
}
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
