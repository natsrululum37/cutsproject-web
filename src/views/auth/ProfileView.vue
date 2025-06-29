<template>
  <div class="min-h-screen bg-black text-white py-12 px-4 flex items-start justify-center">
    <div
      class="w-full max-w-lg bg-zinc-900 rounded-2xl shadow-2xl p-8 md:p-14 space-y-12 profile-card fadeup"
    >
      <!-- Header -->
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold text-yellow-400 mb-2">Profil Pengguna</h1>
        <p class="text-gray-400">Lihat dan kelola data akun Anda.</p>
      </div>

      <!-- Avatar + Info -->
      <div class="flex flex-col items-center gap-5 border-b border-gray-700 pb-8">
        <img
          :src="avatarUrl"
          alt="Avatar"
          class="w-28 h-28 rounded-full border-4 border-yellow-400 object-cover mb-2"
        />
        <div class="text-center">
          <p class="text-2xl font-semibold flex items-center gap-2 justify-center mb-1">
            {{ user?.name }}
            <span v-if="user?.role" class="inline-block px-3 py-1 rounded-full bg-yellow-400 text-black text-xs font-bold ml-2">
              {{ user.role }}
            </span>
          </p>
          <p class="text-gray-400 text-base">{{ user?.email }}</p>
          <p v-if="user?.phone" class="text-gray-400 text-base mt-1">
            <span class="font-semibold text-white">No. HP:</span> {{ user.phone }}
          </p>
        </div>
      </div>

      <!-- Detail -->
      <div class="grid grid-cols-1 gap-6 text-gray-300 mt-4">
        <div>
          <p class="font-semibold text-white mb-1">Tanggal Bergabung</p>
          <p>{{ joinDate }}</p>
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="flex flex-col sm:flex-row sm:justify-center gap-4 mt-12 fadeup delay-150">
        <button
          class="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg shadow-md transition-all duration-150 text-base"
          @click="startEdit"
        >
          <PencilSquareIcon class="w-5 h-5" /> <span>Edit Profil</span>
        </button>
        <button
          class="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-lg shadow-md transition-all duration-150 text-base"
          @click="showPasswordModal = true"
        >
          <KeyIcon class="w-5 h-5" /> <span>Ganti Password</span>
        </button>
        <button
          class="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition-all duration-150 text-base"
          @click="logout"
        >
          <ArrowRightOnRectangleIcon class="w-5 h-5" /> <span>Logout</span>
        </button>
      </div>

      <!-- Modal Edit Profile -->
      <transition name="fade">
        <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="bg-zinc-900 rounded-xl p-6 w-full max-w-xs sm:max-w-md shadow-lg border border-zinc-700 relative">
            <button @click="showEditModal = false" class="absolute top-2 right-2 text-gray-400 hover:text-yellow-400 text-xl">&times;</button>
            <h2 class="text-xl font-bold text-yellow-400 mb-4 text-center">Edit Profil</h2>
            <form @submit.prevent="saveProfile" class="space-y-4" enctype="multipart/form-data">
              <div class="flex flex-col items-center gap-2">
                <label class="block text-gray-300 mb-1">Foto Profil</label>
                <img
                  :src="photoPreview || (editForm.photo ? `${BACKEND_URL}/uploads/profileUsers/${editForm.photo}` : avatarUrl)"
                  alt="Preview"
                  class="w-20 h-20 rounded-full border-2 border-yellow-400 object-cover mb-2"
                />
                <input
                  type="file"
                  accept="image/*"
                  @change="onPhotoChange"
                  class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white"
                />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Nama</label>
                <input v-model="editForm.name" type="text" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">Email</label>
                <input v-model="editForm.email" type="email" required class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
              </div>
              <div>
                <label class="block text-gray-300 mb-1">No. HP</label>
                <input v-model="editForm.phone" type="text" class="w-full px-4 py-2 rounded bg-zinc-900 border border-zinc-700 text-white focus:border-yellow-400" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useAuthStore } from '@/stores/auth'

import {
  PencilSquareIcon,
  CheckCircleIcon,
  ArrowRightOnRectangleIcon,
  KeyIcon,
  XCircleIcon
} from '@heroicons/vue/24/outline'

const router = useRouter()
const authStore = useAuthStore()

const user = ref({
  name: '',
  email: '',
  photo: '',
  phone: '',
  role: '',
  createdAt: ''
})

const showEditModal = ref(false)
const showPasswordModal = ref(false)

const editForm = ref({
  name: '',
  email: '',
  photo: '',
  phone: ''
})

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
const photoFile = ref(null)
const photoPreview = ref(null)

const avatarUrl = computed(() => {
  const photo = showEditModal.value ? editForm.value.photo : user.value?.photo
  if (photo) {
    if (/^https?:\/\//.test(photo)) return photo
    return `${BACKEND_URL}/uploads/profileUsers/${photo}`
  }
  const name = showEditModal.value ? editForm.value.name : user.value?.name
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&background=facc15&color=000`
})

const joinDate = computed(() => {
  if (!user.value?.createdAt) return '-'
  const date = new Date(user.value.createdAt)
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
})

// Fetch profile saat halaman dimuat
onMounted(async () => {
  try {
    const res = await axios.get('/api/users/profile', {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    user.value = res.data
  } catch (err) {
    Swal.fire({ icon: 'error', title: 'Gagal memuat profil', text: err.response?.data?.error || 'Terjadi kesalahan.' })
  }
})

function onPhotoChange(e) {
  const file = e.target.files[0]
  photoFile.value = file || null
  photoPreview.value = file ? URL.createObjectURL(file) : null
}

function startEdit() {
  editForm.value = {
    name: user.value?.name || '',
    email: user.value?.email || '',
    photo: user.value?.photo || '', // hanya nama file
    phone: user.value?.phone || ''
  }
  photoFile.value = null
  photoPreview.value = null
  showEditModal.value = true
}

async function saveProfile() {
  if (!editForm.value.name || !editForm.value.email) {
    return Swal.fire({ icon: 'error', title: 'Nama dan email wajib diisi!' })
  }

  try {
    const formData = new FormData()
    formData.append('name', editForm.value.name)
    formData.append('email', editForm.value.email)
    formData.append('phone', editForm.value.phone || '')
    if (photoFile.value) {
      formData.append('photo', photoFile.value)
    } else if (editForm.value.photo) {
      // Jika tidak upload baru, tetap kirim nama file lama (opsional, tergantung backend)
      formData.append('photo', editForm.value.photo)
    }

    const res = await axios.put('/api/users/profile', formData, {
      headers: {
        Authorization: `Bearer ${authStore.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    user.value = res.data
    showEditModal.value = false
    Swal.fire({
      icon: 'success',
      title: 'Profil berhasil diperbarui!',
      timer: 1200,
      showConfirmButton: false
    })
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal update profil',
      text: err.response?.data?.error || 'Terjadi kesalahan.'
    })
  }
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

// Ganti Password
const passwordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

async function changePassword() {
  if (!passwordForm.value.oldPassword || !passwordForm.value.newPassword || !passwordForm.value.confirmPassword) {
    Swal.fire({ icon: 'error', title: 'Semua field harus diisi!' })
    return
  }
  if (passwordForm.value.oldPassword === passwordForm.value.newPassword) {
    Swal.fire({ icon: 'error', title: 'Password baru tidak boleh sama dengan password lama!' })
    return
  }
  if (passwordForm.value.newPassword.length < 6) {
    Swal.fire({ icon: 'error', title: 'Password baru minimal 6 karakter!' })
    return
  }
  if (!/[A-Z]/.test(passwordForm.value.newPassword)) {
    Swal.fire({ icon: 'error', title: 'Password baru harus mengandung huruf kapital!' })
    return
  }
  if (!/\d/.test(passwordForm.value.newPassword)) {
    Swal.fire({ icon: 'error', title: 'Password baru harus mengandung angka!' })
    return
  }
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    Swal.fire({ icon: 'error', title: 'Konfirmasi password tidak cocok!' })
    return
  }
  try {
    await axios.post(
      '/api/users/change-password',
      {
        oldPassword: passwordForm.value.oldPassword,
        newPassword: passwordForm.value.newPassword,
        confirmPassword: passwordForm.value.confirmPassword
      },
      {
        headers: {
          Authorization: `Bearer ${authStore.token}`
        }
      }
    )
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
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Gagal ganti password',
      text: error.response?.data?.error || 'Terjadi kesalahan, coba lagi.'
    })
  }
}
</script>

<style scoped>
.profile-card {
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.45), 0 1.5px 4px 0 rgba(250,204,21,0.07);
  border: 1.5px solid #333;
  /* Untuk animasi fadeup */
  opacity: 0;
  transform: translateY(30px);
  animation: fadeup 0.7s cubic-bezier(.4,0,.2,1) 0.1s forwards;
}
.fadeup.delay-150 {
  animation-delay: 0.25s;
}
@keyframes fadeup {
  to {
    opacity: 1;
    transform: none;
  }
}
input, textarea {
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}
input:focus, textarea:focus {
  border-color: #facc15;
  box-shadow: 0 0 0 2px #facc1580;
}
button:focus {
  outline: 2px solid #facc15;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
