<template>
  <div class="min-h-screen bg-black text-white py-12 px-4 flex items-start justify-center">
    <div class="w-full max-w-3xl bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-12 space-y-10">
      <!-- Header -->
      <div class="text-center">
        <h1 class="text-4xl font-bold text-yellow-400">Profil Pengguna</h1>
        <p class="text-gray-400 mt-2">Kelola informasi akun Anda dengan mudah dan aman.</p>
      </div>

      <!-- Avatar + Info -->
      <div class="flex flex-col md:flex-row items-center gap-6 border-b border-gray-700 pb-6">
        <img
          :src="avatarUrl"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <div class="text-center md:text-left">
          <p class="text-xl font-semibold flex items-center gap-2 justify-center md:justify-start">
            {{ user?.name }}
            <span v-if="user?.role" class="inline-block px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold ml-2">
              {{ user.role }}
            </span>
          </p>
          <p class="text-gray-400 text-sm">{{ user?.email }}</p>
        </div>
      </div>

      <!-- Statistik -->
      <div class="flex gap-6 justify-center mt-4">
        <div class="text-center">
          <p class="text-2xl font-bold text-yellow-400">{{ stats.reservasi }}</p>
          <p class="text-xs text-gray-400">Reservasi</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-yellow-400">{{ stats.testimoni }}</p>
          <p class="text-xs text-gray-400">Testimoni</p>
        </div>
      </div>

      <!-- Detail -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">Nomor Telepon</p>
          <p>{{ user?.phone || '-' }}</p>
        </div>
        <div>
          <p class="font-semibold text-white mb-1">Tanggal Bergabung</p>
          <p>{{ joinDate }}</p>
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="flex flex-col md:flex-row justify-between gap-4 mt-10">
        <button
          class="w-full md:w-auto flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg shadow-md transition"
          @click="startEdit"
        >
          <PencilSquareIcon class="w-5 h-5" /> Edit Profil
        </button>
        <button
          class="w-full md:w-auto flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition"
          @click="showPasswordModal = true"
        >
          <KeyIcon class="w-5 h-5" /> Ganti Password
        </button>
        <button
          @click="logout"
          class="w-full md:w-auto flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition"
        >
          <ArrowRightOnRectangleIcon class="w-5 h-5" /> Logout
        </button>
      </div>

      <!-- Modal Edit Profile -->
      <transition name="fade">
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="bg-zinc-900 rounded-xl p-6 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative">
            <button @click="showEditModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
            <h2 class="text-xl font-bold text-yellow-400 mb-4 text-center">Edit Profil</h2>
            <form @submit.prevent="saveProfile" class="space-y-4">
              <div>
                <label class="block text-gray-300 mb-1">Nama</label>
                <input v-model="editForm.name" type="text" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Email</label>
                <input v-model="editForm.email" type="email" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Nomor Telepon</label>
                <input v-model="editForm.phone" type="tel" class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Avatar (URL)</label>
                <input v-model="editForm.avatar" type="url" class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div class="flex gap-4 justify-end">
                <button type="button" @click="showEditModal = false" class="flex items-center gap-2 px-6 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold">
                  <XCircleIcon class="w-5 h-5" /> Batal
                </button>
                <button type="submit" class="flex items-center gap-2 px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">
                  <CheckCircleIcon class="w-5 h-5" /> Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Modal Ganti Password -->
      <transition name="fade">
        <div v-if="showPasswordModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="bg-zinc-900 rounded-xl p-6 w-full max-w-xs sm:max-w-sm shadow-lg border border-zinc-700 relative">
            <button @click="showPasswordModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
            <h2 class="text-lg font-bold mb-4 text-yellow-400 text-center">Ganti Password</h2>
            <form @submit.prevent="changePassword" class="space-y-4">
              <div>
                <label class="block text-gray-300 mb-1">Password Lama</label>
                <input v-model="passwordForm.oldPassword" type="password" required class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Password Baru</label>
                <input v-model="passwordForm.newPassword" type="password" required class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Konfirmasi Password Baru</label>
                <input v-model="passwordForm.confirmPassword" type="password" required class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
              </div>
              <div class="flex gap-2 justify-end pt-2">
                <button type="button" @click="showPasswordModal = false" class="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold text-sm">Batal</button>
                <button type="submit" class="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold text-sm">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      </transition>

      <!-- Riwayat Reservasi -->
      <div class="mt-12">
        <h2 class="text-xl font-bold text-yellow-400 mb-4">Riwayat Reservasi</h2>
        <!-- Search & Info -->
        <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center justify-between mb-3">
          <input
            v-model="search"
            type="text"
            placeholder="Cari layanan atau tanggal..."
            class="w-full sm:w-72 px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white text-sm"
          />
          <span class="text-xs text-gray-400 mt-1 sm:mt-0">Total: {{ filteredReservasi.length }}</span>
        </div>
        <!-- Fade-up animasi -->
        <transition name="fade-up">
          <div v-if="paginatedReservasi.length > 0" class="overflow-x-auto rounded-lg border border-zinc-700 bg-zinc-900">
            <table class="w-full text-xs sm:text-sm text-left min-w-[700px]">
              <thead class="bg-yellow-400 text-black">
                <tr>
                  <th class="px-2 sm:px-4 py-3">Tanggal</th>
                  <th class="px-2 sm:px-4 py-3">Waktu</th>
                  <th class="px-2 sm:px-4 py-3">Layanan</th>
                  <th class="px-2 sm:px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(r, idx) in paginatedReservasi" :key="idx" class="border-b border-zinc-700">
                  <td class="px-2 sm:px-4 py-3">{{ r.date }}</td>
                  <td class="px-2 sm:px-4 py-3">{{ r.time }}</td>
                  <td class="px-2 sm:px-4 py-3">{{ r.service }}</td>
                  <td class="px-2 sm:px-4 py-3">
                    <span v-if="r.done" class="inline-flex items-center gap-1 text-green-400 font-semibold">
                      <CheckCircleIcon class="w-4 h-4" /> Selesai
                    </span>
                    <span v-else-if="r.canceled" class="inline-flex items-center gap-1 text-red-400 font-semibold">
                      <XCircleIcon class="w-4 h-4" /> Dibatalkan
                    </span>
                    <span v-else class="text-yellow-400 font-semibold">Belum</span>
                  </td>
                </tr>
              </tbody>
            </table>
            <!-- Pagination -->
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
          </div>
          <div v-else class="px-2 sm:px-4 py-6 text-center text-gray-500 border border-zinc-700 rounded-lg bg-zinc-900">
            Belum ada riwayat reservasi.
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useAuthStore } from '@/stores/auth' 

const router = useRouter()
const authStore = useAuthStore()

import {
  PencilSquareIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

// Dummy data user & statistik
const user = ref({
  name: 'Budi Santoso',
  email: 'budi@mail.com',
  phone: '081234567890',
  avatar: '',
  role: 'User',
  createdAt: '2024-01-10T10:00:00Z'
})
const stats = ref({
  reservasi: 12,
  testimoni: 3
})
const reservasiDummy = ref([
  { date: '2025-06-20', time: '10:00', service: 'Haircut Classic', done: true },
  { date: '2025-06-15', time: '13:00', service: 'Haircut + Wash', canceled: true },
  { date: '2025-06-10', time: '15:00', service: 'Full Package', done: false }
])

const showEditModal = ref(false)
const showPasswordModal = ref(false)

const editForm = ref({
  name: '',
  email: '',
  phone: '',
  avatar: ''
})

const avatarUrl = computed(() =>
  showEditModal.value
    ? (editForm.value.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(editForm.value.name || 'User')}&background=facc15&color=000`)
    : (user.value?.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.value?.name || 'User')}&background=facc15&color=000`)
)

const joinDate = computed(() => {
  if (!user.value?.createdAt) return '-'
  const date = new Date(user.value.createdAt)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
})

// Ganti Password
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

function startEdit() {
  editForm.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    phone: user.value?.phone || '',
    avatar: user.value?.avatar || '',
  }
  showEditModal.value = true
}

async function saveProfile() {
  // Simulasi request
  user.value = { ...user.value, ...editForm.value }
  showEditModal.value = false
  Swal.fire({
    icon: 'success',
    title: 'Profil berhasil diperbarui!',
    timer: 1200,
    showConfirmButton: false
  })
}

function logout() {
  Swal.fire({
    title: 'Logout?',
    text: 'Anda yakin ingin keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f87171',
    cancelButtonColor: '#d1d5db',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Batal'
  }).then((result) => {
    if (result.isConfirmed) {
      authStore.logout()
      router.push('/login')
    }
  })
}

function changePassword() {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    Swal.fire({ icon: 'error', title: 'Semua field harus diisi!' })
    return
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    Swal.fire({ icon: 'error', title: 'Konfirmasi password tidak cocok!' })
    return
  }
  // Simulasi request
  showPasswordModal.value = false
  passwordForm.value.oldPassword = ''
  passwordForm.value.newPassword = ''
  passwordForm.value.confirmPassword = ''
  Swal.fire({
    icon: 'success',
    title: 'Password berhasil diganti!',
    timer: 1200,
    showConfirmButton: false
  })
}

// Data table logic
const search = ref('')
const page = ref(1)
const perPage = 5

const filteredReservasi = computed(() => {
  if (!search.value.trim()) return reservasiDummy.value
  const s = search.value.trim().toLowerCase()
  return reservasiDummy.value.filter(r =>
    r.service.toLowerCase().includes(s) ||
    r.date.toLowerCase().includes(s)
  )
})
const totalPages = computed(() => Math.ceil(filteredReservasi.value.length / perPage))
const paginatedReservasi = computed(() =>
  filteredReservasi.value.slice((page.value - 1) * perPage, page.value * perPage)
)
watch(search, () => { page.value = 1 })
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
.fade-up-enter-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-up-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
