<template>
  <section>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2 text-yellow-400">Kelola Admin</h1>
      <p class="text-gray-400">Lihat dan kelola data admin CutsProject.</p>
    </div>
    <!-- Tombol tambah -->
    <div class="w-full max-w-4xl mx-auto mb-4 flex justify-end">
      <button
        @click="openAddModal"
        class="bg-yellow-400 hover:bg-yellow-300 text-black px-4 sm:px-5 py-2 rounded font-semibold shadow text-sm sm:text-base"
      >
        + Tambah Admin
      </button>
    </div>
    <!-- Search -->
    <div class="w-full max-w-4xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama atau email admin..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
        @input="debouncedFetch"
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ meta.total }}</span>
    </div>
    <!-- Data Table -->
    <div class="w-full max-w-4xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left min-w-[600px]">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">#</th>
            <th class="px-2 sm:px-4 py-3">Nama</th>
            <th class="px-2 sm:px-4 py-3">Email</th>
            <th class="px-2 sm:px-4 py-3">Foto</th>
            <th class="px-2 sm:px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(admin, idx) in admins" :key="admin.id" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (meta.page-1)*meta.limit }}</td>
            <td class="px-2 sm:px-4 py-3">{{ admin.name }}</td>
            <td class="px-2 sm:px-4 py-3">{{ admin.email }}</td>
            <td class="px-2 sm:px-4 py-3">
              <img :src="admin.photo" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button @click="openEditModal(admin)" class="text-yellow-400 hover:text-yellow-300 text-xs font-semibold">Edit</button>
              <button @click="deleteAdmin(admin)" class="text-red-400 hover:text-red-300 text-xs font-semibold">Hapus</button>
            </td>
          </tr>
          <tr v-if="!loading && admins.length === 0">
            <td colspan="5" class="px-2 sm:px-4 py-6 text-center text-gray-500">Belum ada admin.</td>
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
          <h2 class="text-lg font-bold mb-4 text-yellow-400">{{ editId === null ? 'Tambah Admin' : 'Edit Admin' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-gray-300 mb-1">Nama</label>
              <input v-model="form.name" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div v-if="editId === null">
              <label class="block text-gray-300 mb-1">Password</label>
              <input v-model="form.password" type="password" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Foto (URL)</label>
              <input v-model="form.photo" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div v-if="form.photo" class="mt-2 flex justify-center">
              <img :src="form.photo" alt="Preview" class="w-20 h-20 object-cover rounded-full shadow" />
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

const admins = ref([])
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
  email: '',
  password: '',
  photo: ''
})

// Fetch admin data from API
const fetchAdmins = async (page = 1) => {
  loading.value = true
  try {
    const res = await axios.get('/api/admins', {
      params: {
        page,
        limit: meta.value.limit,
        search: search.value.trim() || undefined
      },
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    // Jika backend belum support pagination, buat meta manual
    if (Array.isArray(res.data)) {
      admins.value = res.data.filter(a =>
        !search.value.trim() ||
        a.name.toLowerCase().includes(search.value.trim().toLowerCase()) ||
        a.email.toLowerCase().includes(search.value.trim().toLowerCase())
      )
      meta.value.total = admins.value.length
      meta.value.page = 1
      meta.value.limit = 5
      meta.value.totalPages = Math.ceil(admins.value.length / meta.value.limit)
      admins.value = admins.value.slice((page - 1) * meta.value.limit, page * meta.value.limit)
    } else {
      admins.value = res.data.data
      meta.value = res.data.meta
    }
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal memuat data admin', 'error')
  } finally {
    loading.value = false
  }
}

function openAddModal() {
  form.value = { name: '', email: '', password: '', photo: '' }
  editId.value = null
  showModal.value = true
}
function openEditModal(admin) {
  form.value = { name: admin.name, email: admin.email, photo: admin.photo }
  editId.value = admin.id
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  resetForm()
}
async function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.photo || (editId.value === null && !form.value.password)) return
  loading.value = true
  try {
    if (editId.value === null) {
      // Tambah admin
      await axios.post('/api/admins', form.value, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Admin berhasil ditambahkan.',
        timer: 1200,
        showConfirmButton: false
      })
    } else {
      // Edit admin
      await axios.put(`/api/admins/${editId.value}`, {
        name: form.value.name,
        email: form.value.email,
        photo: form.value.photo
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Data admin berhasil diubah.',
        timer: 1200,
        showConfirmButton: false
      })
    }
    closeModal()
    await fetchAdmins(meta.value.page)
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal menyimpan data', 'error')
  } finally {
    loading.value = false
  }
}
async function deleteAdmin(admin) {
  Swal.fire({
    title: 'Yakin ingin menghapus admin ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/admins/${admin.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Admin berhasil dihapus.',
          timer: 1200,
          showConfirmButton: false
        })
        await fetchAdmins(meta.value.page)
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Gagal menghapus admin', 'error')
      }
    }
  })
}
function resetForm() {
  form.value = { name: '', email: '', password: '', photo: '' }
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
  fetchAdmins(p)
}

// Debounce search
let searchTimeout = null
function debouncedFetch() {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    meta.value.page = 1
    fetchAdmins(1)
  }, 400)
}

// Initial fetch
fetchAdmins(meta.value.page)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>