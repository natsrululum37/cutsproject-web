<template>
  <section>
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Data Testimoni</h1>
      <p class="text-gray-400">Kelola semua testimoni pelanggan di sini.</p>
    </div>
    <!-- Tab -->
    <div class="flex justify-center mb-6 gap-2">
      <button
        class="px-6 py-2 rounded-t-lg font-semibold"
        :class="tab === 'all' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300'"
        @click="tab = 'all'"
      >Semua Testimoni</button>
      <button
        class="px-6 py-2 rounded-t-lg font-semibold"
        :class="tab === 'deleted' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300'"
        @click="tab = 'deleted'"
      >Testimoni Terhapus</button>
    </div>
    <!-- Tabel Testimoni -->
    <div class="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-b-lg shadow overflow-x-auto">
      <table class="w-full text-sm text-left">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Layanan</th>
            <th class="px-4 py-3">Rating</th>
            <th class="px-4 py-3">Komentar</th>
            <th class="px-4 py-3">Tanggal</th>
            <th class="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(review, idx) in filteredTestimoni"
            :key="idx"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition"
          >
            <td class="px-4 py-3 font-medium text-white">{{ review.name }}</td>
            <td class="px-4 py-3 text-gray-300">{{ review.service }}</td>
            <td class="px-4 py-3 text-yellow-400">
              <span v-for="n in review.rating" :key="n">★</span>
              <span v-for="n in 5 - review.rating" :key="'e'+n" class="text-gray-600">☆</span>
            </td>
            <td class="px-4 py-3 text-gray-300 max-w-xs truncate">{{ review.comment }}</td>
            <td class="px-4 py-3 text-gray-400">{{ review.date }}</td>
            <td class="px-4 py-3 text-right space-x-2">
              <button
                v-if="tab === 'all'"
                @click="deleteTestimoni(idx)"
                class="text-red-400 hover:text-red-300 text-xs"
              >Hapus</button>
              <button
                v-if="tab === 'deleted'"
                @click="restoreTestimoni(idx)"
                class="text-green-400 hover:text-green-300 text-xs"
              >Pulihkan</button>
            </td>
          </tr>
          <tr v-if="filteredTestimoni.length === 0">
            <td colspan="6" class="px-4 py-6 text-center text-gray-500">Tidak ada data.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const tab = ref('all')

const testimoni = ref([
  {
    name: 'Budi Santoso',
    service: 'Potong Rambut',
    rating: 5,
    comment: 'Pelayanan sangat bagus, hasil potongan rambut sesuai keinginan!',
    date: '2025-06-20',
    deleted: false,
  },
  {
    name: 'Rina Andriani',
    service: 'Facial',
    rating: 4,
    comment: 'Tempat nyaman, barber ramah.',
    date: '2025-06-18',
    deleted: false,
  },
  {
    name: 'Andi Saputra',
    service: 'Hair Coloring',
    rating: 5,
    comment: 'Warna rambutnya keren, recommended!',
    date: '2025-06-15',
    deleted: true,
  },
])

const filteredTestimoni = computed(() =>
  testimoni.value.filter(r => tab.value === 'all' ? !r.deleted : r.deleted)
)

function deleteTestimoni(idx) {
  // idx di filteredTestimoni, cari index asli di testimoni
  const review = filteredTestimoni.value[idx]
  const realIdx = testimoni.value.findIndex(r => r === review)
  if (realIdx !== -1) testimoni.value[realIdx].deleted = true
}

function restoreTestimoni(idx) {
  const review = filteredTestimoni.value[idx]
  const realIdx = testimoni.value.findIndex(r => r === review)
  if (realIdx !== -1) testimoni.value[realIdx].deleted = false
}
</script>