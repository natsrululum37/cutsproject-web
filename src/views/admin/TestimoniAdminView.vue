<template>
  <section>
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Data Testimoni</h1>
      <p class="text-gray-400">Kelola semua testimoni pelanggan di sini.</p>
    </div>
    <!-- Tab -->
    <div class="flex justify-center mb-4 gap-2">
      <button
        class="px-6 py-2 rounded-t-lg font-semibold"
        :class="tab === 'all' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300'"
        @click="tab = 'all'; page = 1"
      >Semua Testimoni</button>
      <button
        class="px-6 py-2 rounded-t-lg font-semibold"
        :class="tab === 'deleted' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300'"
        @click="tab = 'deleted'; page = 1"
      >Testimoni Terhapus</button>
    </div>
    <!-- Search -->
    <div class="w-full max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama, layanan, atau komentar..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ filteredTestimoni.length }}</span>
    </div>
    <!-- Data Table -->
    <div class="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-b-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left min-w-[700px]">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">Avatar</th>
            <th class="px-2 sm:px-4 py-3">Nama</th>
            <th class="px-2 sm:px-4 py-3">Layanan</th>
            <th class="px-2 sm:px-4 py-3">Rating</th>
            <th class="px-2 sm:px-4 py-3">Komentar</th>
            <th class="px-2 sm:px-4 py-3">Tanggal</th>
            <th class="px-2 sm:px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(review, idx) in paginatedTestimoni"
            :key="idx"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition"
          >
            <td class="px-2 sm:px-4 py-3">
              <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-2 sm:px-4 py-3 font-medium text-white">{{ review.name }}</td>
            <td class="px-2 sm:px-4 py-3 text-gray-300">{{ review.service }}</td>
            <td class="px-2 sm:px-4 py-3 text-yellow-400">
              <span v-for="n in review.rating" :key="n">★</span>
              <span v-for="n in 5 - review.rating" :key="'e'+n" class="text-gray-600">☆</span>
            </td>
            <td class="px-2 sm:px-4 py-3 text-gray-300 max-w-xs truncate">{{ review.comment }}</td>
            <td class="px-2 sm:px-4 py-3 text-gray-400">{{ review.date }}</td>
            <td class="px-2 sm:px-4 py-3 text-right space-x-2">
              <button
                v-if="tab === 'all'"
                @click="deleteTestimoni(idx + (page-1)*perPage)"
                class="text-red-400 hover:text-red-300 text-xs"
              >Hapus</button>
              <button
                v-if="tab === 'deleted'"
                @click="restoreTestimoni(idx + (page-1)*perPage)"
                class="text-green-400 hover:text-green-300 text-xs"
              >Pulihkan</button>
            </td>
          </tr>
          <tr v-if="paginatedTestimoni.length === 0">
            <td colspan="7" class="px-2 sm:px-4 py-6 text-center text-gray-500">Tidak ada data.</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination (pindahkan ke dalam div overflow-x-auto agar selalu terlihat di mobile) -->
      <div
        v-if="totalPages > 1"
        class="relative mt-4 mb-2 flex justify-center min-w-max"
        style="overflow-x: auto;"
      >
        <div class="flex gap-2">
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="page === 1"
            @click="page--"
          >Prev</button>
          <button
            v-for="p in totalPages"
            :key="p"
            class="px-3 py-1 rounded font-semibold"
            :class="page === p ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black'"
            @click="page = p"
          >{{ p }}</button>
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="page === totalPages"
            @click="page++"
          >Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'

const tab = ref('all')
const search = ref('')
const page = ref(1)
const perPage = 5

const testimoni = ref([
  {
    name: 'Budi Santoso',
    avatar: 'https://randomuser.me/api/portraits/men/92.jpg',
    rating: 5,
    date: '2 hari yang lalu',
    comment: 'Pelayanan sangat bagus, hasil potongan rambut sesuai dengan keinginan. Recommended!',
    service: 'Haircut Classic',
    deleted: false,
  },
  {
    name: 'Rizky Fadillah',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    date: '3 hari yang lalu',
    comment: 'Potongannya selalu rapi dan sesuai request. Tempatnya nyaman, pelayanannya top!',
    service: 'Haircut & Beard',
    deleted: false,
  },
  {
    name: 'Andi Saputra',
    avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    rating: 4,
    date: '1 minggu yang lalu',
    comment: 'Barbernya ramah dan tahu gaya kekinian. Recommended banget!',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Fajar Hidayat',
    avatar: 'https://randomuser.me/api/portraits/men/60.jpg',
    rating: 5,
    date: '2 minggu yang lalu',
    comment: 'Sudah langganan dari lama, hasilnya selalu memuaskan. Kalian wajib kesini!',
    service: 'Hair Coloring',
    deleted: false,
  },
  {
    name: 'Yoga Prasetya',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    rating: 4,
    date: '3 minggu yang lalu',
    comment: 'Pelayanan cepat dan hasil potongannya keren. Cocok banget buat mahasiswa seperti saya.',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Ari Wibowo',
    avatar: 'https://randomuser.me/api/portraits/men/27.jpg',
    rating: 5,
    date: '1 bulan yang lalu',
    comment: 'Tempatnya instagramable, hasil potongannya pas banget buat konten. Suka banget!',
    service: 'Haircut & Styling',
    deleted: false,
  },
  {
    name: 'Dimas Ramadhan',
    avatar: 'https://randomuser.me/api/portraits/men/21.jpg',
    rating: 4,
    date: '2 bulan yang lalu',
    comment: 'Pelayanan cepat, rapi, dan nyaman. Cocok buat kamu yang sibuk dan tetap ingin tampil oke.',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Reza Maulana',
    avatar: 'https://randomuser.me/api/portraits/men/51.jpg',
    rating: 5,
    date: '3 bulan yang lalu',
    comment: 'Gaya potongan sesuai tren! Barbershop ini tahu cara memanjakan pelanggannya.',
    service: 'Haircut & Beard',
    deleted: false,
  },
  {
    name: 'Rendy Kurniawan',
    avatar: 'https://randomuser.me/api/portraits/men/38.jpg',
    rating: 4,
    date: '6 bulan yang lalu',
    comment: 'Sudah beberapa kali ke sini, hasilnya selalu konsisten dan memuaskan!',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Ilham Saputra',
    avatar: 'https://randomuser.me/api/portraits/men/58.jpg',
    rating: 5,
    date: '9 bulan yang lalu',
    comment: 'Kesan pertama luar biasa. Sekarang jadi langganan tetap. Thanks CutsProject!',
    service: 'Haircut & Styling',
    deleted: false,
  },
  {
    name: 'Alfan Nugraha',
    avatar: 'https://randomuser.me/api/portraits/men/43.jpg',
    rating: 4,
    date: '1 tahun yang lalu',
    comment: 'Bukan cuma potong rambut, tapi juga pengalaman menyenangkan setiap datang.',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Steven Hartono',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    date: '1 tahun yang lalu',
    comment: 'Tepat waktu, hasil profesional, dan suasananya bikin betah!',
    service: 'Haircut & Beard',
    deleted: false,
  },
  {
    name: 'Bayu Aditya',
    avatar: 'https://randomuser.me/api/portraits/men/19.jpg',
    rating: 4,
    date: '1 tahun yang lalu',
    comment: 'Mereka benar-benar peduli dengan detail. Sangat puas dengan hasil akhirnya.',
    service: 'Haircut',
    deleted: false,
  },
  {
    name: 'Daniel Permadi',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    rating: 5,
    date: '1 tahun yang lalu',
    comment: 'Nyaman, bersih, dan profesional. Suka banget sama vibe-nya!',
    service: 'Haircut & Styling',
    deleted: true,
  },
])

const filteredTestimoni = computed(() => {
  let filtered = testimoni.value.filter(r => tab.value === 'all' ? !r.deleted : r.deleted)
  if (search.value.trim()) {
    const s = search.value.trim().toLowerCase()
    filtered = filtered.filter(r =>
      r.name.toLowerCase().includes(s) ||
      r.service.toLowerCase().includes(s) ||
      r.comment.toLowerCase().includes(s)
    )
  }
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTestimoni.value.length / perPage))
const paginatedTestimoni = computed(() =>
  filteredTestimoni.value.slice((page.value - 1) * perPage, page.value * perPage)
)

function deleteTestimoni(idx) {
  Swal.fire({
    title: 'Yakin ingin menghapus testimoni ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      const review = filteredTestimoni.value[idx]
      const realIdx = testimoni.value.findIndex(r => r === review)
      if (realIdx !== -1) testimoni.value[realIdx].deleted = true
      Swal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Testimoni berhasil dihapus.',
        timer: 1200,
        showConfirmButton: false
      })
      // Reset ke halaman 1 jika data habis di halaman ini
      if (paginatedTestimoni.value.length === 1 && page.value > 1) page.value--
    }
  })
}

function restoreTestimoni(idx) {
  const review = filteredTestimoni.value[idx]
  const realIdx = testimoni.value.findIndex(r => r === review)
  if (realIdx !== -1) testimoni.value[realIdx].deleted = false
}
</script>