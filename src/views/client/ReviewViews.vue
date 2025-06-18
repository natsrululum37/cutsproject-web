<template>
  <div class="min-h-screen section-dark">
    <div class="view-section section-spacing-y">
      <!-- Judul -->
      <div class="text-center mb-12" data-aos="fade-up">
        <h1 class="text-4xl font-bold mb-4">Ulasan Pelanggan</h1>
        <p class="text-gray-400 max-w-2xl mx-auto">
          Lihat apa yang dikatakan pelanggan kami tentang pengalaman mereka di CutsProject
        </p>
      </div>

      <!-- List Ulasan -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(review, index) in reviews"
          :key="index"
          class="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl"
          data-aos="fade-up"
          :data-aos-delay="index * 100"
        >
          <div class="flex items-start mb-4">
            <div class="flex-shrink-0">
              <img
                :src="review.avatar"
                :alt="review.name"
                class="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div class="ml-4">
              <h3 class="font-semibold text-white">{{ review.name }}</h3>
              <div class="flex items-center mt-1">
                <div class="flex text-yellow-400">
                  <span v-for="star in review.rating" :key="star">★</span>
                  <span v-for="star in 5 - review.rating" :key="'empty' + star">☆</span>
                </div>
                <span class="ml-2 text-sm text-gray-400">{{ review.date }}</span>
              </div>
            </div>
          </div>
          <p class="text-gray-300">{{ review.comment }}</p>
          <div class="mt-4 text-sm text-gray-400">
            <span>Service: {{ review.service }}</span>
          </div>
        </div>
      </div>

      <!-- Tombol Tambah Ulasan -->
      <div class="text-center mt-12">
        <button
          @click="openReviewForm"
          class="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
        >
          Tambah Ulasan
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

const openReviewForm = () => {
  // Implement review form logic
  console.log('Opening review form')
}
</script>

<style scoped>
/* Sembunyikan scrollbar horizontal di berbagai browser */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
