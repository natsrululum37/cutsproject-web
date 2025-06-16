<template>
  <div class="min-h-screen bg-black text-white p-6">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2 text-yellow-400">Data Reservasi</h1>
      <p class="text-gray-400">Kelola semua data reservasi pelanggan di sini.</p>
    </div>

    <!-- Table -->
    <div class="w-full overflow-auto max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow">
      <table class="w-full text-sm text-left">
        <thead class="bg-zinc-800 text-gray-300 uppercase text-xs">
          <tr>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Layanan</th>
            <th class="px-4 py-3">Tanggal</th>
            <th class="px-4 py-3">Status</th>
            <th class="px-4 py-3 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(reservation, index) in reservations"
            :key="index"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition"
          >
            <td class="px-4 py-3 font-medium text-white">{{ reservation.name }}</td>
            <td class="px-4 py-3 text-gray-300">{{ reservation.service }}</td>
            <td class="px-4 py-3 text-gray-300">{{ reservation.date }}</td>
            <td class="px-4 py-3 text-gray-300">
              <span
                :class="{
                  'text-green-400': reservation.status === 'Selesai',
                  'text-yellow-400': reservation.status === 'Menunggu',
                  'text-red-400': reservation.status === 'Dibatalkan'
                }"
              >
                {{ reservation.status }}
              </span>
            </td>
            <td class="px-4 py-3 text-right space-x-2">
              <button @click="editReservation(index)" class="text-yellow-400 hover:text-yellow-300 text-xs">Edit</button>
              <button @click="deleteReservation(index)" class="text-red-400 hover:text-red-300 text-xs">Hapus</button>
            </td>
          </tr>
          <tr v-if="reservations.length === 0">
            <td colspan="5" class="px-4 py-6 text-center text-gray-500">Belum ada reservasi.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const reservations = ref([
  {
    name: 'Budi Santoso',
    service: 'Potong Rambut',
    date: '2025-06-15',
    status: 'Selesai',
  },
  {
    name: 'Rina Andriani',
    service: 'Facial',
    date: '2025-06-18',
    status: 'Menunggu',
  },
])

function deleteReservation(index) {
  if (confirm('Yakin ingin menghapus reservasi ini?')) {
    reservations.value.splice(index, 1)
  }
}

function editReservation(index) {
  const r = reservations.value[index]
  const newStatus = prompt(`Ubah status untuk ${r.name}:`, r.status)
  if (newStatus !== null && newStatus.trim() !== '') {
    reservations.value[index].status = newStatus
  }
}
</script>
