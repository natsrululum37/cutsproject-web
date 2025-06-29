<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800 space-y-6 animate-fade-in">
      <h2 class="text-3xl font-bold text-center tracking-tight">Daftar Akun <span class="text-yellow-400">Baru</span></h2>

      <form @submit.prevent="handleRegister" class="space-y-5" enctype="multipart/form-data">
        <!-- Nama Lengkap -->
        <div>
          <label class="block text-sm font-medium mb-1">Nama Lengkap</label>
          <div class="relative">
            <input
              v-model="name"
              type="text"
              required
              placeholder="Nama lengkapmu"
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.name }"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'user']" />
            </span>
          </div>
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium mb-1">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              placeholder="email@contoh.com"
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.email }"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'envelope']" />
            </span>
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Password</label>
          <div class="relative">
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              required
              placeholder="••••••"
              class="w-full px-4 py-2 pl-10 pr-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.password }"
              @input="validatePassword"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </span>
            <button type="button" @click="showPassword = !showPassword" tabindex="-1"
              class="absolute right-3 top-2.5 text-zinc-500 hover:text-yellow-400 focus:outline-none">
              <font-awesome-icon :icon="showPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
            </button>
          </div>
          <div class="mt-2 space-y-1 text-xs">
            <div :class="passwordCriteria.length ? 'text-green-400' : 'text-gray-400'">
              <span v-if="passwordCriteria.length">✔</span><span v-else>✖</span>
              Minimal 6 karakter
            </div>
            <div :class="passwordCriteria.uppercase ? 'text-green-400' : 'text-gray-400'">
              <span v-if="passwordCriteria.uppercase">✔</span><span v-else>✖</span>
              Mengandung huruf kapital
            </div>
            <div :class="passwordCriteria.number ? 'text-green-400' : 'text-gray-400'">
              <span v-if="passwordCriteria.number">✔</span><span v-else>✖</span>
              Mengandung angka
            </div>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              required
              placeholder="Ulangi password"
              class="w-full px-4 py-2 pl-10 pr-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </span>
            <button type="button" @click="showConfirmPassword = !showConfirmPassword" tabindex="-1"
              class="absolute right-3 top-2.5 text-zinc-500 hover:text-yellow-400 focus:outline-none">
              <font-awesome-icon :icon="showConfirmPassword ? ['fas', 'eye-slash'] : ['fas', 'eye']" />
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Photo Profile (optional) -->
        <div>
          <label class="block text-sm font-medium mb-1">Foto Profil</label>
          <div class="relative">
            <input
              type="file"
              accept="image/*"
              @change="onPhotoChange"
              class="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              name="photo"
            />
          </div>
          <div v-if="photoPreview" class="mt-2 flex justify-center">
            <img :src="photoPreview" alt="Preview" class="w-16 h-16 object-cover rounded-full border-2 border-yellow-400" />
          </div>
        </div>

        <!-- Tombol Daftar -->
        <button
          type="submit"
          class="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-95 transition duration-200 disabled:opacity-50"
          :disabled="loading || !isPasswordValid"
        >
          {{ loading ? 'Mendaftarkan...' : 'Daftar' }}
        </button>

        <!-- Link Masuk -->
        <p class="text-sm text-center mt-3 text-gray-400">
          Sudah punya akun?
          <router-link to="/login" class="text-yellow-400 hover:underline font-medium">Masuk</router-link>
        </p>
      </form>

      <p v-if="successMessage" class="text-green-400 text-sm text-center mt-2">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faEnvelope, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faUser, faEnvelope, faLock, faEye, faEyeSlash)

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const successMessage = ref('')
const loading = ref(false)
const photoFile = ref(null)
const photoPreview = ref(null)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordCriteria = ref({
  length: false,
  uppercase: false,
  number: false,
})

const isPasswordValid = computed(() =>
  passwordCriteria.value.length &&
  passwordCriteria.value.uppercase &&
  passwordCriteria.value.number &&
  password.value === confirmPassword.value
)

function validatePassword() {
  passwordCriteria.value.length = password.value.length >= 6
  passwordCriteria.value.uppercase = /[A-Z]/.test(password.value)
  passwordCriteria.value.number = /\d/.test(password.value)
}

function validateForm() {
  errors.value = {}
  if (!name.value) errors.value.name = 'Nama wajib diisi.'
  if (!email.value.includes('@')) errors.value.email = 'Email tidak valid.'
  if (!passwordCriteria.value.length) errors.value.password = 'Minimal 6 karakter.'
  if (!passwordCriteria.value.uppercase) errors.value.password = 'Harus ada huruf kapital.'
  if (!passwordCriteria.value.number) errors.value.password = 'Harus ada angka.'
  if (password.value !== confirmPassword.value) errors.value.confirmPassword = 'Password tidak sama.'
  return Object.keys(errors.value).length === 0
}

function onPhotoChange(e) {
  const file = e.target.files[0]
  photoFile.value = file || null
  photoPreview.value = file ? URL.createObjectURL(file) : null
}

async function handleRegister() {
  successMessage.value = ''
  errors.value = {}

  if (!validateForm()) return
  loading.value = true

  try {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('email', email.value)
    formData.append('password', password.value)
    if (photoFile.value) {
      formData.append('photo', photoFile.value)
    }

    const response = await axios.post('/api/auth/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

    successMessage.value = response.data.message || 'Pendaftaran berhasil!'

    // Kosongkan form
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
    photoFile.value = null
    photoPreview.value = null

    // Redirect ke halaman login setelah 2 detik
    setTimeout(() => router.push('/login'), 2000)
  } catch (e) {
    console.error('Error saat register:', e)
    const msg = e.response?.data?.message || 'Gagal mendaftar. Coba lagi.'
    
    if (msg.toLowerCase().includes('email')) {
      errors.value.email = msg
    } else {
      errors.value.name = msg
    }
  } finally {
    loading.value = false
  }
}
</script>
