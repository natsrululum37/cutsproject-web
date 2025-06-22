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
            <td class="px-2 sm:px-4 py-3">{{ index + 1 }}</td>
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
                @click="deleteService(index)"
                class="text-red-400 hover:text-red-300 text-xs font-semibold"
              >Hapus</button>
            </td>
          </tr>
          <tr v-if="services.length === 0">
            <td colspan="8" class="px-2 sm:px-4 py-6 text-center text-gray-500">Belum ada layanan.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form Tambah/Edit -->
    <transition name="fade">
      <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
        <div
          class="bg-zinc-900 rounded-xl p-4 sm:p-8 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative"
          style="max-height:90vh; overflow-y:auto;"
        >
          <button @click="closeModal" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
          <h2 class="text-lg font-bold mb-4 text-yellow-400">{{ editIdx === null ? 'Tambah Layanan' : 'Edit Layanan' }}</h2>
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
import { ref } from 'vue'
import Swal from 'sweetalert2'

const services = ref([
  {
    id: 1,
    name: 'Potong Rambut',
    price: 50000,
    description: 'Potong rambut klasik dan modern',
    duration: 30,
    category: 'Barber',
    image_url: '/cutsproject-web/images/service/hair-wash.webp'
  },
  {
    id: 2,
    name: 'Shaving',
    price: 30000,
    description: 'Cukur bersih dan rapi',
    duration: 20,
    category: 'Barber',
    image_url: '/cutsproject-web/images/service/haircut.webp'
  },
  {
    id: 3,
    name: 'Hair Styling',
    price: 70000,
    description: 'Penataan rambut sesuai tren',
    duration: 40,
    category: 'Styling',
    image_url: '/cutsproject-web/images/service/hair-wash.webp'
  },
])

const showModal = ref(false)
const editIdx = ref(null)
const form = ref({
  name: '',
  price: 0,
  description: '',
  duration: 0,
  category: '',
  image_url: ''
})

function openAddModal() {
  form.value = {
    name: '',
    price: 0,
    description: '',
    duration: 0,
    category: '',
    image_url: ''
  }
  editIdx.value = null
  showModal.value = true
}
function openEditModal(service, idx) {
  form.value = { ...service }
  editIdx.value = idx
  showModal.value = true
}
function closeModal() {
  showModal.value = false
}
function handleSubmit() {
  if (!form.value.name || !form.value.price || !form.value.description || !form.value.duration || !form.value.category || !form.value.image_url) return
  if (editIdx.value === null) {
    services.value.push({
      ...form.value,
      id: Date.now()
    })
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Layanan berhasil ditambahkan.',
      timer: 1500,
      showConfirmButton: false
    })
  } else {
    services.value[editIdx.value] = { ...form.value }
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Layanan berhasil diubah.',
      timer: 1500,
      showConfirmButton: false
    })
  }
  closeModal()
}
function deleteService(idx) {
  Swal.fire({
    title: 'Yakin ingin menghapus layanan ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      services.value.splice(idx, 1)
      Swal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Layanan berhasil dihapus.',
        timer: 1500,
        showConfirmButton: false
      })
    }
  })
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
