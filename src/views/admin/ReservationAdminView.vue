<template>
  <section>
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Daftar Reservasi</h1>
      <p class="text-gray-400">Kelola dan cek status reservasi pelanggan di sini.</p>
    </div>

    <!-- Initial Loading State - hanya muncul saat load pertama -->
    <div v-if="initialLoading" class="flex flex-col items-center justify-center py-12">
      <div
        class="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"
      ></div>
      <p class="text-yellow-400">Memuat data reservasi...</p>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="w-full max-w-5xl mx-auto p-6 bg-red-900/30 border border-red-500 rounded-lg text-center"
    >
      <p class="text-red-400 mb-3">{{ error }}</p>
      <button
        @click="fetchReservations"
        class="px-4 py-2 bg-yellow-400 text-black rounded-lg hover:bg-yellow-300"
      >
        Coba Lagi
      </button>
    </div>

    <template v-else>
      <!-- Search input dengan loading indicator -->
      <div
        class="w-full max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between"
      >
        <div class="text-sm text-gray-300">
          Selesai: <span class="text-green-400 font-bold">{{ completedCount }}</span> /
          <span class="font-bold">{{ meta.total || 0 }}</span> reservasi
        </div>
        <div class="relative w-full sm:w-72">
          <input
            v-model="searchInput"
            type="text"
            placeholder="Cari nama, layanan, atau WhatsApp..."
            class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm pr-10"
          />
          <span v-if="searchLoading" class="absolute right-3 top-1/2 -translate-y-1/2">
            <div
              class="h-4 w-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin"
            ></div>
          </span>
        </div>
      </div>

      <!-- Tabel dengan overlay loading -->
      <div
        class="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto relative"
      >
        <!-- Loading overlay - hanya muncul saat search/pagination -->
        <div
          v-if="tableLoading"
          class="absolute inset-0 bg-black/30 flex items-center justify-center z-10"
        >
          <div
            class="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin"
          ></div>
        </div>

        <table class="w-full text-xs sm:text-sm text-left min-w-[900px]">
          <thead class="bg-yellow-400 text-black sticky top-0 z-[1]">
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
            <tr
              v-for="(r, idx) in filteredReservations"
              :key="r.id"
              class="border-b border-zinc-700"
            >
              <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (currentPage - 1) * perPage }}</td>
              <td class="px-2 sm:px-4 py-3">{{ r.name }}</td>
              <td class="px-2 sm:px-4 py-3">
                <a
                  :href="`https://wa.me/${waNumber(r.phone)}`"
                  target="_blank"
                  class="text-green-400 hover:underline"
                  >{{ r.phone }}</a
                >
              </td>
              <td class="px-2 sm:px-4 py-3">{{ r.formattedDate || formatDate(r.date) }}</td>
              <td class="px-2 sm:px-4 py-3">{{ r.time }}</td>
              <td class="px-2 sm:px-4 py-3">{{ r.service?.name }}</td>
              <td class="px-2 sm:px-4 py-3 max-w-[180px] truncate">{{ r.notes || '-' }}</td>
              <td class="px-2 sm:px-4 py-3">
                <span
                  v-if="r.status === 'COMPLETED'"
                  class="inline-flex items-center gap-1 text-green-400 font-semibold"
                >
                  <svg
                    class="w-4 h-4 inline"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Selesai
                </span>
                <span
                  v-else-if="r.status === 'CANCELLED'"
                  class="inline-flex items-center gap-1 text-red-400 font-semibold"
                >
                  <svg
                    class="w-4 h-4 inline"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Dibatalkan
                </span>
                <span v-else class="text-yellow-400 font-semibold">Belum</span>
                <div
                  v-if="r.status === 'CANCELLED' && r.cancelReason"
                  class="text-xs text-red-300 mt-1 italic"
                >
                  Alasan: {{ r.cancelReason }}
                </div>
              </td>
              <td class="px-2 sm:px-4 py-3 text-center">
                <div
                  v-if="r.status !== 'COMPLETED' && r.status !== 'CANCELLED'"
                  class="flex items-center justify-center gap-2"
                >
                  <button
                    @click="markDone(r.id)"
                    class="px-3 py-1 rounded bg-green-500 hover:bg-green-400 text-white text-xs font-semibold"
                    title="Tandai selesai"
                  >
                    <svg
                      class="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Selesai
                  </button>
                  <button
                    @click="cancelReservation(r.id)"
                    class="px-3 py-1 rounded bg-red-500 hover:bg-red-400 text-white text-xs font-semibold"
                    title="Batalkan reservasi"
                  >
                    <svg
                      class="w-4 h-4 inline"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Batal
                  </button>
                </div>
                <span v-else class="text-gray-400 text-xs">-</span>
              </td>
            </tr>
            <tr v-if="filteredReservations.length === 0">
              <td colspan="9" class="px-2 sm:px-4 py-6 text-center text-gray-500">
                {{
                  searchQuery
                    ? 'Tidak ada hasil yang sesuai dengan pencarian.'
                    : 'Tidak ada data reservasi.'
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="flex justify-center gap-2 mt-4 mb-2 min-w-max">
        <button
          class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold disabled:opacity-50"
          :disabled="currentPage === 1 || tableLoading"
          @click="changePage(currentPage - 1)"
        >
          Prev
        </button>
        <button
          v-for="p in paginationNumbers"
          :key="p"
          class="px-3 py-1 rounded font-semibold disabled:opacity-50"
          :class="
            currentPage === p
              ? 'bg-yellow-400 text-black'
              : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black'
          "
          :disabled="tableLoading"
          @click="changePage(p)"
        >
          {{ p }}
        </button>
        <button
          class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold disabled:opacity-50"
          :disabled="currentPage === meta.totalPages || tableLoading"
          @click="changePage(currentPage + 1)"
        >
          Next
        </button>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// State data
const reservations = ref([])
const meta = ref({
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
})
const initialLoading = ref(true) // Loading state saat pertama kali load
const tableLoading = ref(false) // Loading saat tabel diperbarui (search/pagination)
const error = ref(null)
const searchInput = ref('') // Input yang diketik user
const searchQuery = ref('') // Query yang dikirim ke server setelah debounce
const searchLoading = ref(false) // Loading state khusus untuk search input
const currentPage = ref(1)
const perPage = 10

// Computed untuk filter client-side (tidak digunakan untuk filter server)
const filteredReservations = computed(() => reservations.value)

const completedCount = computed(
  () => reservations.value.filter((r) => r.status === 'COMPLETED').length,
)

const paginationNumbers = computed(() => {
  const numbers = []
  const current = meta.value.page
  const total = meta.value.totalPages

  // Always show current, and up to 2 pages before and after
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)

  for (let i = start; i <= end; i++) {
    numbers.push(i)
  }

  return numbers
})

// Debounce function
let searchTimeout = null
function debounce(callback, wait) {
  return (...args) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => callback.apply(this, args), wait)
  }
}

// Functions
const fetchReservations = async (isInitialLoad = false) => {
  // Jika initial load, gunakan initialLoading, selain itu gunakan tableLoading
  if (isInitialLoad) {
    initialLoading.value = true
  } else {
    tableLoading.value = true
  }

  error.value = null

  try {
    const params = {
      page: currentPage.value,
      limit: perPage,
    }

    // Only add search param if we have a search term
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value.trim()
    }

    const response = await axios.get('/api/admin/reservations', {
      params,
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    })

    if (response.data && Array.isArray(response.data.data)) {
      reservations.value = response.data.data
      meta.value = response.data.meta || {
        total: response.data.data.length,
        page: currentPage.value,
        limit: perPage,
        totalPages: 1,
      }
    } else {
      throw new Error('Format respons API tidak valid')
    }
  } catch (err) {
    console.error('Error fetching reservations:', err)
    error.value = err.response?.data?.error || 'Gagal memuat data reservasi'
  } finally {
    initialLoading.value = false
    tableLoading.value = false
    searchLoading.value = false
  }
}

// Mencari dengan debounce
const searchReservations = debounce(() => {
  searchQuery.value = searchInput.value
  currentPage.value = 1 // Reset ke halaman 1 ketika search
  fetchReservations()
}, 500) // Tunggu 500ms

const formatDate = (dateString) => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const changePage = (page) => {
  if (page < 1 || page > meta.value.totalPages || tableLoading.value) return
  currentPage.value = page
  fetchReservations()
}

function waNumber(num) {
  if (!num) return ''
  return num.replace(/^0/, '62')
}

const markDone = async (id) => {
  Swal.fire({
    title: 'Tandai reservasi ini sudah selesai?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, selesai',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Ganti URL endpoint
        await axios.patch(
          `/api/admin/reservations/${id}/done`,
          {
            status: 'COMPLETED',
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          },
        )

        // Update local state
        const index = reservations.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          reservations.value[index].status = 'COMPLETED'
        }

        Swal.fire({
          icon: 'success',
          title: 'Reservasi selesai!',
          text: 'Reservasi telah ditandai selesai.',
          timer: 1200,
          showConfirmButton: false,
        })
      } catch (err) {
        console.error('Error marking reservation as done:', err)
        Swal.fire({
          icon: 'error',
          title: 'Gagal memperbarui status',
          text: err.response?.data?.error || 'Terjadi kesalahan saat memperbarui status reservasi.',
          confirmButtonText: 'Tutup',
        })
      }
    }
  })
}

const cancelReservation = async (id) => {
  Swal.fire({
    title: 'Batalkan reservasi ini?',
    text: 'Masukkan alasan pembatalan.',
    icon: 'warning',
    input: 'text',
    inputPlaceholder: 'Alasan pembatalan',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#22c55e',
    confirmButtonText: 'Ya, batalkan',
    cancelButtonText: 'Batal',
    inputValidator: (value) => {
      if (!value || value.trim() === '') {
        return 'Alasan pembatalan wajib diisi!'
      }
    },
    inputAttributes: {
      autocapitalize: 'off',
      autocorrect: 'off',
    },
  }).then(async (result) => {
    if (result.isConfirmed && result.value) {
      try {
        await axios.patch(
          `/api/admin/reservations/${id}/cancel`,
          {
            status: 'CANCELLED',
            cancelReason: result.value.trim(),
          },
          {
            headers: {
              Authorization: `Bearer ${authStore.token}`,
            },
          },
        )

        // Update local state
        const index = reservations.value.findIndex((r) => r.id === id)
        if (index !== -1) {
          reservations.value[index].status = 'CANCELLED'
          reservations.value[index].cancelReason = result.value.trim()
        }

        Swal.fire({
          icon: 'success',
          title: 'Reservasi dibatalkan!',
          text: `Alasan: ${result.value.trim()}`,
          timer: 2000,
          showConfirmButton: false,
        })
      } catch (err) {
        console.error('Error canceling reservation:', err)
        Swal.fire({
          icon: 'error',
          title: 'Gagal membatalkan reservasi',
          text: err.response?.data?.error || 'Terjadi kesalahan saat membatalkan reservasi.',
          confirmButtonText: 'Tutup',
        })
      }
    }
  })
}

// Watch untuk debounced search
watch(searchInput, () => {
  searchLoading.value = true
  searchReservations()
})

// Fetch reservations on mount
onMounted(() => {
  fetchReservations(true) // true = initial load
})
</script>

<style scoped>
/* Tambahan untuk transisi halus */
tbody tr {
  transition: opacity 0.2s;
}
</style>
