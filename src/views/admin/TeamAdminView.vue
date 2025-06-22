<template>
  <section>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2 text-yellow-400">Manajemen Tim</h1>
      <p class="text-gray-400">Kelola data tim barbershop di sini.</p>
    </div>
    <!-- Tombol tambah -->
    <div class="w-full max-w-6xl mx-auto mb-4 flex justify-end">
      <button
        @click="openAddModal"
        class="bg-yellow-400 hover:bg-yellow-300 text-black px-4 sm:px-5 py-2 rounded font-semibold shadow text-sm sm:text-base"
      >
        + Tambah Anggota
      </button>
    </div>
    <!-- Search -->
    <div class="w-full max-w-6xl mx-auto mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between">
      <input
        v-model="search"
        type="text"
        placeholder="Cari nama, nim, peran, tugas..."
        class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
      />
      <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ filteredTeam.length }}</span>
    </div>
    <!-- Data Table -->
    <div class="w-full max-w-6xl mx-auto bg-zinc-900 border border-zinc-700 rounded-lg shadow overflow-x-auto">
      <table class="w-full text-xs sm:text-sm text-left min-w-[900px]">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-2 sm:px-4 py-3">#</th>
            <th class="px-2 sm:px-4 py-3">Nama</th>
            <th class="px-2 sm:px-4 py-3">NIM</th>
            <th class="px-2 sm:px-4 py-3">Peran</th>
            <th class="px-2 sm:px-4 py-3">Tugas</th>
            <th class="px-2 sm:px-4 py-3">GitHub</th>
            <th class="px-2 sm:px-4 py-3">Foto</th>
            <th class="px-2 sm:px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(member, idx) in paginatedTeam" :key="idx" class="border-b border-zinc-700">
            <td class="px-2 sm:px-4 py-3">{{ idx + 1 + (page-1)*perPage }}</td>
            <td class="px-2 sm:px-4 py-3">{{ member.nama }}</td>
            <td class="px-2 sm:px-4 py-3">{{ member.nim }}</td>
            <td class="px-2 sm:px-4 py-3">{{ member.peran }}</td>
            <td class="px-2 sm:px-4 py-3 max-w-[180px] truncate">{{ member.tugas }}</td>
            <td class="px-2 sm:px-4 py-3">
              <a :href="member.github" target="_blank" class="text-blue-400 hover:underline text-xs">GitHub</a>
            </td>
            <td class="px-2 sm:px-4 py-3">
              <img :src="member.image" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-2 sm:px-4 py-3 space-x-2">
              <button @click="openEditModal(idx + (page-1)*perPage)" class="text-yellow-400 hover:text-yellow-300 text-xs font-semibold">Edit</button>
              <button @click="deleteMember(idx + (page-1)*perPage)" class="text-red-400 hover:text-red-300 text-xs font-semibold">Hapus</button>
            </td>
          </tr>
          <tr v-if="paginatedTeam.length === 0">
            <td colspan="8" class="px-2 sm:px-4 py-6 text-center text-gray-500">Belum ada anggota tim.</td>
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
          <h2 class="text-lg font-bold mb-4 text-yellow-400">{{ editIdx === null ? 'Tambah Anggota' : 'Edit Anggota' }}</h2>
          <form @submit.prevent="handleSubmit" class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-gray-300 mb-1">Nama</label>
              <input v-model="form.nama" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">NIM</label>
              <input v-model="form.nim" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Peran</label>
              <input v-model="form.peran" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Tugas</label>
              <input v-model="form.tugas" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">GitHub (URL)</label>
              <input v-model="form.github" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div>
              <label class="block text-gray-300 mb-1">Foto (URL)</label>
              <input v-model="form.image" class="w-full px-3 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm" required />
            </div>
            <div v-if="form.image" class="mt-2 flex justify-center">
              <img :src="form.image" alt="Preview" class="w-20 h-20 object-cover rounded-full shadow" />
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

const team = ref([
  {
    nama: 'Ahmad Natsrul Ulum',
    nim: '23.11.5524',
    peran: 'Frontend, Backend',
    tugas: 'Homepage, Header, Navbar, Store',
    github: 'https://github.com/natsrululum37',
    image: '/cutsproject-web/images/team/arul.webp',
  },
  {
    nama: 'Zulfa Meydita Rahma',
    nim: '23.11.5512',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'About, Team, Footer, Design Figma',
    github: 'https://github.com/ulpaav',
    image: '/cutsproject-web/images/team/ulpa.webp',
  },
  {
    nama: 'Anung Binartanto',
    nim: '23.11.5520',
    peran: 'Fullstack',
    tugas: 'Booking, auth, Admin, Backend',
    github: 'https://github.com/anungbinartantoo',
    image: '/cutsproject-web/images/team/anung.webp',
  },
  {
    nama: 'Eria Syalwa',
    nim: '23.11.5535',
    peran: 'Frontend',
    tugas: 'Kontak',
    github: 'https://github.com/eriasy',
    image: '/cutsproject-web/images/team/eria.webp',
  },
  {
    nama: 'Agi Muhammad Tengku Aqamaddin',
    nim: '23.11.5518',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Ulasan, Design Figma',
    github: 'https://github.com/ATengkuuu',
    image: '/cutsproject-web/images/team/agi.webp',
  },
  {
    nama: 'Cleova Calista Aziza Kayviar',
    nim: '23.11.5532',
    peran: 'Frontend',
    tugas: 'Layanan',
    github: 'https://github.com/cleovacalista',
    image: '/cutsproject-web/images/team/cleo.webp',
  },
  {
    nama: 'Arya Kusuma Wijaya',
    nim: '23.11.5554',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Galeri, Design Figma',
    github: 'https://github.com/aryaks10235',
    image: '/cutsproject-web/images/team/arya.webp',
  },
])

const form = ref({
  nama: '',
  nim: '',
  peran: '',
  tugas: '',
  github: '',
  image: ''
})
const editIdx = ref(null)
const showModal = ref(false)
const search = ref('')
const page = ref(1)
const perPage = 5

function openAddModal() {
  form.value = { nama: '', nim: '', peran: '', tugas: '', github: '', image: '' }
  editIdx.value = null
  showModal.value = true
}
function openEditModal(idx) {
  form.value = { ...team.value[idx] }
  editIdx.value = idx
  showModal.value = true
}
function closeModal() {
  showModal.value = false
  resetForm()
}
function handleSubmit() {
  if (!form.value.nama || !form.value.nim || !form.value.peran || !form.value.tugas || !form.value.github || !form.value.image) return
  if (editIdx.value !== null) {
    team.value[editIdx.value] = { ...form.value }
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Data anggota tim berhasil diubah.',
      timer: 1200,
      showConfirmButton: false
    })
  } else {
    team.value.push({ ...form.value })
    Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Anggota tim berhasil ditambahkan.',
      timer: 1200,
      showConfirmButton: false
    })
  }
  closeModal()
}
function deleteMember(idx) {
  Swal.fire({
    title: 'Yakin ingin menghapus anggota tim ini?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#facc15',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, hapus!',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      team.value.splice(idx, 1)
      Swal.fire({
        icon: 'success',
        title: 'Terhapus!',
        text: 'Anggota tim berhasil dihapus.',
        timer: 1200,
        showConfirmButton: false
      })
      resetForm()
      if (paginatedTeam.value.length === 0 && page.value > 1) page.value--
    }
  })
}
function resetForm() {
  form.value = { nama: '', nim: '', peran: '', tugas: '', github: '', image: '' }
  editIdx.value = null
}

const filteredTeam = computed(() => {
  let filtered = team.value
  if (search.value.trim()) {
    const s = search.value.trim().toLowerCase()
    filtered = filtered.filter(m =>
      m.nama.toLowerCase().includes(s) ||
      m.nim.toLowerCase().includes(s) ||
      m.peran.toLowerCase().includes(s) ||
      m.tugas.toLowerCase().includes(s)
    )
  }
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredTeam.value.length / perPage))
const paginatedTeam = computed(() =>
  filteredTeam.value.slice((page.value - 1) * perPage, page.value * perPage)
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