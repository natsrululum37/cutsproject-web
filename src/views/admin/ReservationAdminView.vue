<template>
  <section>
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Daftar Reservasi</h1>
      <p class="text-gray-400">Kelola dan cek status reservasi pelanggan di sini.</p>
    </div>
    <div class="w-full max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <div class="text-sm text-gray-300">
        Selesai: <span class="text-green-400 font-bold">{{ doneCount }}</span> /
        <span class="font-bold">{{ reservations.length }}</span> reservasi
      </div>
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama, layanan, atau WhatsApp..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
      />
    </div>
    <div class="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left min-w-[900px]">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">#</th>
            <th class="px-2 sm:px-4 py-3">Nama</th>
            <th class="px-2 sm:px-4 py-3">WhatsApp</th>
            <th class="px-2 sm:px-4 py-3">Tanggal</th>
            <th class="px-2 sm:px-4 py-3">Waktu</th>
            <th class="px-2 sm:px-4 py-3">Layanan</th>
            <th class="px-2 sm:px-4 py-3">Catatan</th>
            <th class="px-2 sm:px-4 py-3">Status</th>
            <th class="px-2 sm:px-4 py-3 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, idx) in paginatedReservations" :key="idx" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (page-1)*perPage }}</td>
            <td class="px-2 sm:px-4 py-3">{{ r.name }}</td>
            <td class="px-2 sm:px-4 py-3">
              <a :href="`https://wa.me/${waNumber(r.whatsapp)}`" target="_blank" class="text-green-400 hover:underline">{{ r.whatsapp }}</a>
            </td>
            <td class="px-2 sm:px-4 py-3">{{ r.date }}</td>
            <td class="px-2 sm:px-4 py-3">{{ r.time }}</td>
            <td class="px-2 sm:px-4 py-3">{{ r.service }}</td>
            <td class="px-2 sm:px-4 py-3 max-w-[180px] truncate">{{ r.notes }}</td>
            <td class="px-2 sm:px-4 py-3">
              <span v-if="r.done" class="inline-flex items-center gap-1 text-green-400 font-semibold">
                <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Selesai
              </span>
              <span v-else-if="r.canceled" class="inline-flex items-center gap-1 text-red-400 font-semibold">
                <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
                Dibatalkan
              </span>
              <span v-else class="text-yellow-400 font-semibold">Belum</span>
              <div v-if="r.canceled && r.cancelReason" class="text-xs text-red-300 mt-1 italic">Alasan: {{ r.cancelReason }}</div>
            </td>
            <td class="px-2 sm:px-4 py-3 text-center">
              <div v-if="!r.done && !r.canceled" class="flex items-center justify-center gap-2">
                <button
                  @click="markDone(idx + (page-1)*perPage)"
                  class="px-3 py-1 rounded bg-green-500 hover:bg-green-400 text-white text-xs font-semibold"
                  title="Tandai selesai"
                >
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  Selesai
                </button>
                <button
                  @click="cancelReservation(idx + (page-1)*perPage)"
                  class="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-white text-xs font-semibold"
                  title="Batalkan reservasi"
                >
                  <svg class="w-4 h-4 inline" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                  Batal
                </button>
              </div>
              <span v-else class="text-gray-400 text-xs">-</span>
            </td>
          </tr>
          <tr v-if="filteredReservations.length === 0">
            <td colspan="9" class="px-2 sm:px-4 py-6 text-center text-gray-500">Tidak ada data reservasi.</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="totalPages > 1" class="flex justify-center gap-2 mt-4 mb-2 min-w-max">
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
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'

const reservations = ref([
  {
    name: 'Budi Santoso',
    whatsapp: '081234567890',
    date: '2025-06-23',
    time: '10:00',
    service: 'Haircut Classic',
    notes: 'Minta stylist senior',
    done: false,
  },
  {
    name: 'Rina Wijaya',
    whatsapp: '081298765432',
    date: '2025-06-23',
    time: '13:00',
    service: 'Haircut + Wash',
    notes: '',
    done: true,
  },
  {
    name: 'Andi Saputra',
    whatsapp: '081212345678',
    date: '2025-06-24',
    time: '15:00',
    service: 'Full Package (Haircut + Wash + Styling)',
    notes: 'Booking untuk 2 orang',
    done: false,
  },
])

const search = ref('')
const filteredReservations = computed(() => {
  if (!search.value.trim()) return reservations.value
  const s = search.value.trim().toLowerCase()
  return reservations.value.filter(r =>
    r.name.toLowerCase().includes(s) ||
    r.whatsapp.toLowerCase().includes(s) ||
    r.service.toLowerCase().includes(s)
  )
})
const page = ref(1)
const perPage = 5

const paginatedReservations = computed(() => 
  filteredReservations.value.slice((page.value - 1) * perPage, page.value * perPage)
)
const totalPages = computed(() => Math.ceil(filteredReservations.value.length / perPage))

watch(search, () => {
  page.value = 1 
})

const doneCount = computed(() => reservations.value.filter(r => r.done).length)

function waNumber(num) {
  // Ubah 08xxx jadi 628xxx
  return num.replace(/^0/, '62')
}

function markDone(idx) {
  Swal.fire({
    title: 'Tandai reservasi ini sudah selesai?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, selesai',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      reservations.value[idx].done = true
      Swal.fire({
        icon: 'success',
        title: 'Reservasi selesai!',
        text: 'Reservasi telah ditandai selesai.',
        timer: 1200,
        showConfirmButton: false
      })
    }
  })
}

function cancelReservation(idx) {
  Swal.fire({
    title: 'Batalkan reservasi ini?',
    text: "Anda dapat menambahkan alasan pembatalan.",
    icon: 'warning',
    input: 'text',
    inputPlaceholder: 'Alasan pembatalan (opsional)',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#22c55e',
    confirmButtonText: 'Ya, batalkan',
    cancelButtonText: 'Batal',
    inputValidator: (value) => {
      if (value === '') {
        return 'Alasan pembatalan diperlukan!'
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      reservations.value[idx].canceled = true
      reservations.value[idx].cancelReason = result.value
      Swal.fire({
        icon: 'success',
        title: 'Reservasi dibatalkan!',
        text: 'Reservasi telah dibatalkan.',
        timer: 1200,
        showConfirmButton: false
      })
    }
  })
}
</script>
