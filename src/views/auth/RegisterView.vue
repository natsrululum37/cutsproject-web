<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800 space-y-6 animate-fade-in">
      <h2 class="text-3xl font-bold text-center tracking-tight">Daftar Akun <span class="text-yellow-400">Baru</span></h2>

      <form @submit.prevent="handleRegister" class="space-y-5">
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
              type="password"
              required
              placeholder="••••••"
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.password }"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </span>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Konfirmasi Password -->
        <div>
          <label class="block text-sm font-medium mb-1">Konfirmasi Password</label>
          <div class="relative">
            <input
              v-model="confirmPassword"
              type="password"
              required
              placeholder="Ulangi password"
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <font-awesome-icon :icon="['fas', 'lock']" />
            </span>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <!-- Tombol Daftar -->
        <button
          type="submit"
          class="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-95 transition duration-200 disabled:opacity-50"
          :disabled="loading"
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
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faUser, faEnvelope, faLock)

const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errors = ref({})
const successMessage = ref('')
const loading = ref(false)

function validateForm() {
  errors.value = {}
  if (!name.value) errors.value.name = 'Nama wajib diisi.'
  if (!email.value.includes('@')) errors.value.email = 'Email tidak valid.'
  if (password.value.length < 6) errors.value.password = 'Minimal 6 karakter.'
  if (password.value !== confirmPassword.value) errors.value.confirmPassword = 'Password tidak sama.'
  return Object.keys(errors.value).length === 0
}

async function handleRegister() {
  successMessage.value = ''
  errors.value = {}
  
  if (!validateForm()) return
  loading.value = true

  try {
    const response = await axios.post('https://3849-36-72-215-61.ngrok-free.app/api/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value
    })

    successMessage.value = response.data.message || 'Pendaftaran berhasil!'

    // Kosongkan form
    name.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''

    // Redirect ke halaman login setelah 2 detik
    setTimeout(() => router.push('/login'), 2000)
  } catch (e) {
    console.error('Error saat register:', e)
    const msg = e.response?.data?.message || 'Gagal mendaftar. Coba lagi.'
    
    // Beri error global kalau tidak spesifik
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
