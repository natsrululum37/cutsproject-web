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
    <div
      class="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto"
    >
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
          <tr v-for="(image, idx) in gallery" :key="idx" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 }}</td>
            <td class="px-2 sm:px-4 py-3">{{ image.title }}</td>
            <td class="px-2 sm:px-4 py-3">
              <img
                :src="image.url"
                :alt="image.title"
                class="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded shadow"
              />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button
                @click="openEditModal(idx)"
                class="text-yellow-400 hover:text-yellow-300 text-xs"
              >
                Edit
              </button>
              <button @click="deleteImage(idx)" class="text-red-400 hover:text-red-300 text-xs">
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

    <!-- Modal Form Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div
          class="bg-zinc-900 rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative"
        >
          <button
            @click="closeModal"
            class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl"
          >
            &times;
          </button>
          <h2 class="text-lg font-bold mb-4 text-yellow-400">
            {{ editIdx === null ? 'Tambah Foto' : 'Edit Foto' }}
          </h2>
          <form @submit.prevent="handleSubmit" class="space-y-4">
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
              <label class="block text-gray-300 mb-1">URL Foto</label>
              <input
                v-model="form.url"
                type="url"
                class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
                required
              />
            </div>
            <div v-if="form.url" class="mt-2 flex justify-center">
              <img
                :src="form.url"
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
                class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm"
              >
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
import { ref } from 'vue'
import Swal from 'sweetalert2'

const gallery = ref([
  { title: 'Classic Fade Cut', url: '/cutsproject-web/images/gallery/gallery1.webp' },
  { title: 'Modern Pompadour', url: '/cutsproject-web/images/gallery/gallery2.webp' },
  { title: 'Textured Crop', url: '/cutsproject-web/images/gallery/gallery3.webp' },
])

const showModal = ref(false)
const editIdx = ref(null)
const form = ref({ title: '', url: '' })

function openAddModal() {
  form.value = { title: '', url: '' }
  editIdx.value = null
  showModal.value = true
}
function openEditModal(idx) {
  form.value = { ...gallery.value[idx] }
  editIdx.value = idx
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function handleSubmit() {
  if (!form.value.title || !form.value.url) return
  if (editIdx.value === null) {
    gallery.value.push({ ...form.value })
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Foto berhasil ditambahkan.',
      timer: 1500,
      showConfirmButton: false
    })
  } else {
    gallery.value[editIdx.value] = { ...form.value }
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Foto berhasil diubah.',
      timer: 1500,
      showConfirmButton: false
    })
  }
  closeModal()
}
function deleteImage(idx) {
  Swal.fire({
    title: 'Yakin ingin menghapus foto ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal',
  }).then((result) => {
    if (result.isConfirmed) {
      gallery.value.splice(idx, 1)
      Swal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Foto berhasil dihapus.',
        timer: 1500,
        showConfirmButton: false,
      })
    }
  })
}
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
