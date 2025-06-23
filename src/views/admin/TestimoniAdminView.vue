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
        @click="switchTab('all')"
      >Semua Testimoni</button>
      <button
        class="px-6 py-2 rounded-t-lg font-semibold"
        :class="tab === 'deleted' ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300'"
        @click="switchTab('deleted')"
      >Testimoni Terhapus</button>
    </div>
    <!-- Search -->
    <div class="w-full max-w-5xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama, layanan, atau komentar..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
        @input="debouncedFetch"
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ meta.total }}</span>
    </div>
    <!-- Data Table -->
    <div class="w-full max-w-5xl mx-auto bg-zinc-900 border border-zinc-700 rounded-b-lg shadow overflow-x-auto relative">
      <div v-if="loading" class="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
        <div class="w-8 h-8 border-3 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
      </div>
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
            v-for="review in reviews"
            :key="review.id"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition"
          >
            <td class="px-2 sm:px-4 py-3">
              <img :src="review.avatar" :alt="review.name" class="w-10 h-10 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-2 sm:px-4 py-3 font-medium text-white">{{ review.name }}</td>
            <td class="px-2 sm:px-4 py-3 text-gray-300">{{ review.serviceName }}</td>
            <td class="px-2 sm:px-4 py-3 text-yellow-400">
              <span v-for="n in review.rating" :key="n">★</span>
              <span v-for="n in 5 - review.rating" :key="'e'+n" class="text-gray-600">☆</span>
            </td>
            <td class="px-2 sm:px-4 py-3 text-gray-300 max-w-xs truncate">{{ review.comment }}</td>
            <td class="px-2 sm:px-4 py-3 text-gray-400">{{ review.dateRelative }}</td>
            <td class="px-2 sm:px-4 py-3 text-right space-x-2">
              <button
                v-if="tab === 'all'"
                @click="deleteTestimoni(review.id)"
                class="text-red-400 hover:text-red-300 text-xs"
              >Hapus</button>
              <button
                v-if="tab === 'deleted'"
                @click="restoreTestimoni(review.id)"
                class="text-green-400 hover:text-green-300 text-xs"
              >Pulihkan</button>
            </td>
          </tr>
          <tr v-if="!loading && reviews.length === 0">
            <td colspan="7" class="px-2 sm:px-4 py-6 text-center text-gray-500">Tidak ada data.</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div
        v-if="meta.totalPages > 1"
        class="relative mt-4 mb-2 flex justify-center min-w-max"
        style="overflow-x: auto;"
      >
        <div class="flex gap-2">
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="page === 1 || loading"
            @click="changePage(page - 1)"
          >Prev</button>
          <button
            v-for="p in paginationNumbers"
            :key="p"
            class="px-3 py-1 rounded font-semibold"
            :class="page === p ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black'"
            :disabled="loading"
            @click="changePage(p)"
          >{{ p }}</button>
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="page === meta.totalPages || loading"
            @click="changePage(page + 1)"
          >Next</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'

const tab = ref('all')
const search = ref('')
const page = ref(1)
const perPage = 5

const reviews = ref([])
const meta = ref({
  total: 0,
  page: 1,
  limit: perPage,
  totalPages: 1
})
const loading = ref(false)

const fetchReviews = async () => {
  loading.value = true
  try {
    const params = {
      page: page.value,
      limit: perPage,
      search: search.value.trim() || undefined,
      deleted: tab.value === 'deleted' ? true : false
    }
    const res = await axios.get('/api/admin/reviews', { params })
    reviews.value = res.data.data
    meta.value = res.data.meta
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal memuat data testimoni', 'error')
  } finally {
    loading.value = false
  }
}

function switchTab(newTab) {
  if (tab.value !== newTab) {
    tab.value = newTab
    page.value = 1
    fetchReviews()
  }
}

function changePage(p) {
  if (p < 1 || p > meta.value.totalPages || loading.value) return
  page.value = p
  fetchReviews()
}

const paginationNumbers = computed(() => {
  const numbers = []
  const current = meta.value.page
  const total = meta.value.totalPages
  const start = Math.max(1, current - 2)
  const end = Math.min(total, current + 2)
  for (let i = start; i <= end; i++) numbers.push(i)
  return numbers
})

// Debounce search
let searchTimeout = null
function debouncedFetch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    page.value = 1
    fetchReviews()
  }, 400)
}

async function deleteTestimoni(id) {
  Swal.fire({
    title: 'Yakin ingin menghapus testimoni ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.patch(`/api/admin/reviews/${id}/delete`)
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Testimoni berhasil dihapus.',
          timer: 1200,
          showConfirmButton: false
        })
        fetchReviews()
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Gagal menghapus testimoni', 'error')
      }
    }
  })
}

async function restoreTestimoni(id) {
  Swal.fire({
    title: 'Pulihkan testimoni ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#22c55e',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, pulihkan',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.patch(`/api/admin/reviews/${id}/restore`)
        Swal.fire({
          icon: 'success',
          title: 'Dipulihkan!',
          text: 'Testimoni berhasil dipulihkan.',
          timer: 1200,
          showConfirmButton: false
        })
        fetchReviews()
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Gagal memulihkan testimoni', 'error')
      }
    }
  })
}

// Watch tab & page
watch(tab, () => {
  page.value = 1
  fetchReviews()
})

watch(page, (newPage, oldPage) => {
  if (newPage !== oldPage) fetchReviews()
})

// Initial fetch
fetchReviews()
</script>