<template>
  <section>
    <div class="mb-6 text-center">
      <h1 class="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">Manajemen Layanan</h1>
      <p class="text-gray-300 text-sm sm:text-base">Kelola semua layanan potong rambut dan styling.</p>
    </div>
    <!-- Tombol tambah layanan di dalam container tabel -->
    <div class="w-full max-w-6xl mx-auto mb-4 flex justify-end">
      <button
        @click="openAddModal"
        class="bg-yellow-400 hover:bg-yellow-300 text-black px-4 sm:px-5 py-2 rounded font-semibold shadow text-sm sm:text-base"
      >
        + Tambah Layanan
      </button>
    </div>
    <!-- Search -->
    <div class="w-full max-w-6xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama, deskripsi, atau kategori..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
        @input="debouncedFetch"
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ meta.total }}</span>
    </div>
    <div class="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">#</th>
            <th class="px-2 sm:px-4 py-3">Nama</th>
            <th class="px-2 sm:px-4 py-3">Harga</th>
            <th class="px-2 sm:px-4 py-3">Deskripsi</th>
            <th class="px-2 sm:px-4 py-3">Durasi</th>
            <th class="px-2 sm:px-4 py-3">Kategori</th>
            <th class="px-2 sm:px-4 py-3">Gambar</th>
            <th class="px-2 sm:px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(service, index) in services"
            :key="service.id"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition-colors duration-200"
          >
            <td class="px-2 sm:px-4 py-3">{{ index + 1 + (meta.page-1)*meta.limit }}</td>
            <td class="px-2 sm:px-4 py-3">{{ service.name }}</td>
            <td class="px-2 sm:px-4 py-3">Rp {{ service.price.toLocaleString() }}</td>
            <td class="px-2 sm:px-4 py-3 max-w-[120px] sm:max-w-xs truncate">{{ service.description }}</td>
            <td class="px-2 sm:px-4 py-3">{{ service.duration }} mnt</td>
            <td class="px-2 sm:px-4 py-3">{{ service.category }}</td>
            <td class="px-2 sm:px-4 py-3">
              <img :src="service.image_url" :alt="service.name" class="w-14 h-10 sm:w-16 sm:h-10 object-cover rounded" />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button
                @click="openEditModal(service, index)"
                class="text-yellow-400 hover:text-yellow-300 text-xs font-semibold"
              >Edit</button>
              <button
                @click="deleteService(service)"
                class="text-red-400 hover:text-red-300 text-xs font-semibold"
              >Hapus</button>
            </td>
          </tr>
          <tr v-if="!loading && services.length === 0">
            <td colspan="8" class="px-2 sm:px-4 py-6 text-center text-gray-500">Belum ada layanan.</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div v-if="meta.totalPages > 1" class="relative mt-4 mb-2 flex justify-center min-w-max" style="overflow-x: auto;">
        <div class="flex gap-2">
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="meta.page === 1 || loading"
            @click="changePage(meta.page - 1)"
          >Prev</button>
          <button
            v-for="p in paginationNumbers"
            :key="p"
            class="px-3 py-1 rounded font-semibold"
            :class="meta.page === p ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black'"
            :disabled="loading"
            @click="changePage(p)"
          >{{ p }}</button>
          <button
            class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
            :disabled="meta.page === meta.totalPages || loading"
            @click="changePage(meta.page + 1)"
          >Next</button>
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div
          class="bg-zinc-900 rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative"
          style="max-height:90vh; overflow-y:auto;"
        >
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
          <h2 class="text-lg font-bold mb-4 text-yellow-400">{{ editId === null ? 'Tambah Layanan' : 'Edit Layanan' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-gray-300 mb-1">Nama Layanan</label>
              <input v-model="form.name" type="text" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Harga (Rp)</label>
              <input v-model.number="form.price" type="number" min="0" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Deskripsi</label>
              <textarea v-model="form.description" rows="2" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div class="flex gap-2">
              <div class="flex-1">
                <label class="block text-gray-300 mb-1">Durasi (mnt)</label>
                <input v-model.number="form.duration" type="number" min="0" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
              </div>
              <div class="flex-1">
                <label class="block text-gray-300 mb-1">Kategori</label>
                <input v-model="form.category" type="text" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
              </div>
            </div>
            <div>
              <label class="block text-gray-300 mb-1">URL Gambar</label>
              <input v-model="form.image_url" type="url" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div v-if="form.image_url" class="mt-2 flex justify-center">
              <img :src="form.image_url" alt="Preview" class="w-24 h-14 sm:w-32 sm:h-20 object-cover rounded shadow" />
            </div>
            <div class="flex gap-2 justify-end pt-2">
              <button type="button" @click="closeModal" class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold text-sm">Batal</button>
              <button type="submit" :disabled="loading" class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm">
                {{ loading ? 'Menyimpan...' : (editId === null ? 'Tambah' : 'Simpan') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const services = ref([])
const meta = ref({
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1
})
const search = ref('')
const loading = ref(false)
const showModal = ref(false)
const editId = ref(null)
const form = ref({
  name: '',
  price: 0,
  description: '',
  duration: 0,
  category: '',
  image_url: ''
})

// Fetch services from API
const fetchServices = async (page = 1) => {
  loading.value = true
  try {
    const res = await axios.get('/api/services', {
      params: {
        page,
        limit: meta.value.limit,
        search: search.value.trim() || undefined
      },
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    services.value = res.data.data
    meta.value = res.data.meta
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal memuat data layanan', 'error')
  } finally {
    loading.value = false
  }
}

function openAddModal() {
  form.value = {
    name: '',
    price: 0,
    description: '',
    duration: 0,
    category: '',
    image_url: ''
  }
  editId.value = null
  showModal.value = true
}
function openEditModal(service) {
  form.value = { ...service }
  editId.value = service.id
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  resetForm()
}
async function handleSubmit() {
  if (
    !form.value.name ||
    !form.value.price ||
    !form.value.description ||
    !form.value.duration ||
    !form.value.category ||
    !form.value.image_url ||
    Number(form.value.price) <= 0 ||
    Number(form.value.duration) <= 0
  ) {
    Swal.fire('Gagal', 'Semua field wajib diisi dan harga/durasi harus lebih dari 0', 'error')
    return
  }
  loading.value = true
  try {
    if (editId.value === null) {
      // Tambah layanan
      await axios.post('/api/services', {
        ...form.value,
        price: Number(form.value.price),
        duration: Number(form.value.duration)
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Layanan berhasil ditambahkan.',
        timer: 1500,
        showConfirmButton: false
      })
    } else {
      // Edit layanan
      await axios.put(`/api/services/${editId.value}`, {
        ...form.value,
        price: Number(form.value.price),
        duration: Number(form.value.duration)
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Layanan berhasil diubah.',
        timer: 1500,
        showConfirmButton: false
      })
    }
    closeModal()
    await fetchServices(meta.value.page)
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal menyimpan data', 'error')
  } finally {
    loading.value = false
  }
}
async function deleteService(service) {
  Swal.fire({
    title: 'Yakin ingin menghapus layanan ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/services/${service.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Layanan berhasil dihapus.',
          timer: 1500,
          showConfirmButton: false
        })
        await fetchServices(meta.value.page)
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Gagal menghapus layanan', 'error')
      }
    }
  })
}
function resetForm() {
  form.value = {
    name: '',
    price: 0,
    description: '',
    duration: 0,
    category: '',
    image_url: ''
  }
  editId.value = null
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

function changePage(p) {
  if (p < 1 || p > meta.value.totalPages || loading.value) return
  meta.value.page = p
  fetchServices(p)
}

// Debounce search
let searchTimeout = null
function debouncedFetch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    meta.value.page = 1
    fetchServices(1)
  }, 400)
}

// Initial fetch
fetchServices(meta.value.page)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
