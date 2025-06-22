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
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ filteredAdmins.length }}</span>
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
          <tr v-for="(admin, idx) in paginatedAdmins" :key="idx" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (page-1)*perPage }}</td>
            <td class="px-2 sm:px-4 py-3">{{ admin.name }}</td>
            <td class="px-2 sm:px-4 py-3">{{ admin.email }}</td>
            <td class="px-2 sm:px-4 py-3">
              <img :src="admin.photo" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button @click="openEditModal(idx + (page-1)*perPage)" class="text-yellow-400 hover:text-yellow-300 text-xs font-semibold">Edit</button>
              <button @click="deleteAdmin(idx + (page-1)*perPage)" class="text-red-400 hover:text-red-300 text-xs font-semibold">Hapus</button>
            </td>
          </tr>
          <tr v-if="paginatedAdmins.length === 0">
            <td colspan="5" class="px-2 sm:px-4 py-6 text-center text-gray-500">Belum ada admin.</td>
          </tr>
        </tbody>
      </table>
      <!-- Pagination -->
      <div v-if="totalPages > 1" class="relative mt-4 mb-2 flex justify-center min-w-max" style="overflow-x: auto;">
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

    <!-- Modal Form Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div
          class="bg-zinc-900 rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative"
          style="max-height:90vh; overflow-y:auto;"
        >
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
          <h2 class="text-lg font-bold mb-4 text-yellow-400">{{ editIdx === null ? 'Tambah Admin' : 'Edit Admin' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-gray-300 mb-1">Nama</label>
              <input v-model="form.name" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Email</label>
              <input v-model="form.email" type="email" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
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
              <button type="submit" class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm">
                {{ editIdx === null ? 'Tambah' : 'Simpan' }}
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

const admins = ref([
  { name: 'Admin Utama', email: 'admin@cutsproject.com', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Admin 2', email: 'admin2@cutsproject.com', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
])

const form = ref({ name: '', email: '', photo: '' })
const editIdx = ref(null)
const showModal = ref(false)
const search = ref('')
const page = ref(1)
const perPage = 5

function openAddModal() {
  form.value = { name: '', email: '', photo: '' }
  editIdx.value = null
  showModal.value = true
}
function openEditModal(idx) {
  form.value = { ...admins.value[idx] }
  editIdx.value = idx
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  resetForm()
}
function handleSubmit() {
  if (!form.value.name || !form.value.email || !form.value.photo) return
  if (editIdx.value !== null) {
    admins.value[editIdx.value] = { ...form.value }
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Data admin berhasil diubah.',
      timer: 1200,
      showConfirmButton: false
    })
  } else {
    admins.value.push({ ...form.value })
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Admin berhasil ditambahkan.',
      timer: 1200,
      showConfirmButton: false
    })
  }
  closeModal()
}
function deleteAdmin(idx) {
  Swal.fire({
    title: 'Yakin ingin menghapus admin ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      admins.value.splice(idx, 1)
      Swal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Admin berhasil dihapus.',
        timer: 1200,
        showConfirmButton: false
      })
      resetForm()
      if (paginatedAdmins.value.length === 0 && page.value > 1) page.value--
    }
  })
}
function resetForm() {
  form.value = { name: '', email: '', photo: '' }
  editIdx.value = null
}

const filteredAdmins = computed(() => {
  let filtered = admins.value
  if (search.value.trim()) {
    const s = search.value.trim().toLowerCase()
    filtered = filtered.filter(a =>
      a.name.toLowerCase().includes(s) ||
      a.email.toLowerCase().includes(s)
    )
  }
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredAdmins.value.length / perPage))
const paginatedAdmins = computed(() =>
  filteredAdmins.value.slice((page.value - 1) * perPage, page.value * perPage)
)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>