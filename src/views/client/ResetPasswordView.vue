<template>
  <div class="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-xl shadow-lg border border-zinc-800 p-8">
      <h1 class="text-2xl font-bold text-yellow-400 mb-6 text-center">Reset Password</h1>
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label class="block text-gray-300 mb-1">Password Baru</label>
          <input
            v-model="password"
            type="password"
            class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            placeholder="Password baru"
            minlength="6"
            required
            :disabled="loading"
          />
        </div>
        <div>
          <label class="block text-gray-300 mb-1">Konfirmasi Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            placeholder="Konfirmasi password"
            minlength="6"
            required
            :disabled="loading"
          />
        </div>
        <div v-if="error" class="text-red-400 text-sm text-center">{{ error }}</div>
        <div v-if="success" class="text-green-400 text-sm text-center">{{ success }}</div>
        <button
          type="submit"
          class="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 rounded transition"
          :disabled="loading"
        >
          {{ loading ? 'Memproses...' : 'Reset Password' }}
        </button>
      </form>
      <div v-if="redirecting" class="text-center text-gray-400 text-sm mt-4">
        Mengarahkan ke halaman login...
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')
const redirecting = ref(false)

const token = route.query.token

const handleSubmit = async () => {
  error.value = ''
  success.value = ''
  if (!password.value || password.value.length < 6) {
    error.value = 'Password minimal 6 karakter.'
    return
  }
  if (password.value !== confirmPassword.value) {
    error.value = 'Konfirmasi password tidak sama.'
    return
  }
  if (!token) {
    error.value = 'Token reset password tidak ditemukan.'
    return
  }
  loading.value = true
  try {
    const res = await axios.post('/api/auth/reset-password', {
      token,
      password: password.value
    })
    success.value = res.data.message || 'Password berhasil direset.'
    redirecting.value = true
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (e) {
    error.value = e.response?.data?.error || 'Gagal reset password.'
  } finally {
    loading.value = false
  }
}
</script>

<style>
/* Add any component-specific styles here */
</style>