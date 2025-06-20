<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800 space-y-6 animate-fade-in">
      <h2 class="text-3xl font-bold text-center tracking-tight">Masuk ke <span class="text-yellow-400">CutsProject</span></h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->
        <div>
          <label class="block text-sm mb-1 font-medium">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border"
              :class="errors.email ? 'border-red-500' : 'border-zinc-700'"
              placeholder="you@example.com"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm mb-1 font-medium">Password</label>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border"
              :class="errors.password ? 'border-red-500' : 'border-zinc-700'"
              placeholder="••••••••"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <i class="fa fa-lock"></i>
            </span>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <!-- Tombol -->
        <button
          type="submit"
          class="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-[0.98] transition duration-200"
          :disabled="loading"
        >
          {{ loading ? 'Memproses...' : 'Masuk' }}
        </button>

        <p class="text-sm text-center mt-3 text-gray-400">
          Belum punya akun?
          <router-link to="/register" class="text-yellow-400 hover:underline font-medium">Daftar di sini</router-link>
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
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const loading = ref(false)
const errors = ref({})
const successMessage = ref('')

const API_URL = 'https://ed67-36-72-215-61.ngrok-free.app/api/auth/login' // atau ganti dengan URL ngrok jika remote

async function handleLogin() {
  errors.value = {}
  successMessage.value = ''
  loading.value = true

  try {
    const response = await axios.post(API_URL, {
      email: email.value,
      password: password.value
    })

    const token = response.data.token
    const userData = response.data.user // pastikan API mengirim data user
    auth.login(token, userData)

    successMessage.value = 'Login berhasil!'
    setTimeout(() => {
      router.push('/profile')
    }, 1000)
  } catch (err) {
    const message = err.response?.data?.message || 'Terjadi kesalahan saat login'
    if (message.includes('Email')) {
      errors.value.email = message
    } else {
      errors.value.password = message
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
