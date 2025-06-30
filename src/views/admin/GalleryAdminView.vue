<template>
  <section>
    <div class="text-center mb-8">
      <h1 class="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">Galeri Foto</h1>
      <p class="text-gray-400">Kelola foto yang tampil di halaman galeri user.</p>
    </div>
    <div class="flex justify-end mb-4 max-w-6xl mx-auto">
      <button
        @click="openAddModal"
        class="bg-yellow-400 hover:bg-yellow-300 text-black px-4 sm:px-5 py-2 rounded font-semibold shadow text-sm sm:text-base"
      >
        + Tambah Foto
      </button>
    </div>
    <div class="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">#</th>
            <th class="px-2 sm:px-4 py-3">Judul</th>
            <th class="px-2 sm:px-4 py-3">Foto</th>
            <th class="px-2 sm:px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(image, idx) in gallery" :key="image.id" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (meta.page - 1) * meta.limit }}</td>
            <td class="px-2 sm:px-4 py-3">{{ image.title }}</td>
            <td class="px-2 sm:px-4 py-3">
              <img
                :src="image.image ? `${BACKEND_URL}/uploads/gallerySection/${image.image}` : ''"
                :alt="image.title"
                class="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded shadow"
              />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button
                @click="openEditModal(image)"
                class="text-yellow-400 hover:text-yellow-300 text-xs"
              >
                Edit
              </button>
              <button @click="deleteImage(image)" class="text-red-400 hover:text-red-300 text-xs">
                Hapus
              </button>
            </td>
          </tr>
          <tr v-if="gallery.length === 0">
            <td colspan="4" class="px-2 sm:px-4 py-6 text-center text-gray-500">
              Belum ada foto galeri.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div v-if="meta.totalPages > 1" class="flex justify-center gap-2 mt-6 mb-2">
      <button
        class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
        :disabled="meta.page === 1 || loading"
        @click="changePage(meta.page - 1)"
      >
        Prev
      </button>
      <button
        v-for="p in paginationNumbers"
        :key="p"
        class="px-3 py-1 rounded font-semibold"
        :class="meta.page === p ? 'bg-yellow-400 text-black' : 'bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black'"
        :disabled="loading"
        @click="changePage(p)"
      >
        {{ p }}
      </button>
      <button
        class="px-3 py-1 rounded bg-zinc-800 text-gray-300 hover:bg-yellow-400 hover:text-black text-xs font-semibold"
        :disabled="meta.page === meta.totalPages || loading"
        @click="changePage(meta.page + 1)"
      >
        Next
      </button>
    </div>

    <!-- Modal Form Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div class="bg-zinc-900 rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative">
          <button
            @click="closeModal"
            class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl"
          >
            &times;
          </button>
          <h2 class="text-lg font-bold mb-4 text-yellow-400">
            {{ editId === null ? 'Tambah Foto' : 'Edit Foto' }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4" enctype="multipart/form-data">
            <div>
              <label class="block text-gray-300 mb-1">Judul Foto</label>
              <input
                v-model="form.title"
                type="text"
                class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                required
              />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Foto</label>
              <input
                type="file"
                accept="image/*"
                @change="onImageChange"
                class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                :required="editId === null"
                name="image"
              />
            </div>
            <div v-if="imagePreview" class="mt-2 flex justify-center">
              <img
                :src="imagePreview"
                alt="Preview"
                class="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded shadow"
              />
            </div>
            <div class="flex gap-4 justify-end pt-2">
              <button
                type="button"
                @click="closeModal"
                class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold text-sm"
              >
                Batal
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm"
              >
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
import { ref, onMounted, computed } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

const gallery = ref([])
const showModal = ref(false)
const editId = ref(null)
const form = ref({ title: '', image: null })
const imagePreview = ref('')
const loading = ref(false)
const meta = ref({
  total: 0,
  page: 1,
  limit: 5,
  totalPages: 1
})

const fetchGallery = async (page = 1) => {
  loading.value = true
  try {
    const res = await axios.get('/api/gallery', {
      params: { page, limit: meta.value.limit }
    })
    gallery.value = res.data.data
    meta.value = res.data.meta
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal memuat galeri', 'error')
  } finally {
    loading.value = false
  }
}

const changePage = (page) => {
  if (page < 1 || page > meta.value.totalPages || loading.value) return
  meta.value.page = page
  fetchGallery(page)
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

function openAddModal() {
  form.value = { title: '', image: null }
  imagePreview.value = ''
  editId.value = null
  showModal.value = true
}

function openEditModal(item) {
  form.value = { title: item.title, image: null }
  // Tampilkan preview foto lama
  imagePreview.value = item.image
    ? `${BACKEND_URL}/uploads/gallerySection/${item.image}`
    : ''
  editId.value = item.id
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  editId.value = null
  imagePreview.value = ''
}

function onImageChange(e) {
  const file = e.target.files[0]
  form.value.image = file || null
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => {
      imagePreview.value = ev.target.result
    }
    reader.readAsDataURL(file)
  } else if (editId.value !== null) {
    // Jika edit dan tidak pilih file baru, preview tetap foto lama
    imagePreview.value = gallery.value.find(g => g.id === editId.value)?.image
      ? `${BACKEND_URL}/uploads/gallerySection/${gallery.value.find(g => g.id === editId.value).image}`
      : ''
  } else {
    imagePreview.value = ''
  }
}

async function handleSubmit() {
  if (!form.value.title) return
  loading.value = true
  try {
    const formData = new FormData()
    formData.append('title', form.value.title)
    if (form.value.image) {
      formData.append('image', form.value.image)
    }
    if (editId.value === null) {
      await axios.post('/api/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Foto berhasil ditambahkan.',
        timer: 1500,
        showConfirmButton: false
      })
    } else {
      await axios.put(`/api/gallery/${editId.value}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Foto berhasil diubah.',
        timer: 1500,
        showConfirmButton: false
      })
    }
    closeModal()
    await fetchGallery(meta.value.page)
  } catch (err) {
    Swal.fire('Gagal', err.response?.data?.error || 'Gagal menyimpan data', 'error')
  } finally {
    loading.value = false
  }
}

async function deleteImage(item) {
  Swal.fire({
    title: 'Yakin ingin menghapus foto ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/gallery/${item.id}`)
        Swal.fire({
          icon: 'success',
          title: 'Terhapus!',
          text: 'Foto berhasil dihapus.',
          timer: 1500,
          showConfirmButton: false,
        })
        await fetchGallery(meta.value.page)
      } catch (err) {
        Swal.fire('Gagal', err.response?.data?.error || 'Gagal menghapus data', 'error')
      }
    }
  })
}

onMounted(() => fetchGallery(meta.value.page))
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
