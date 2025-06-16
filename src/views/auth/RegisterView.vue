<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-lg p-8 shadow-xl space-y-6">
      <h2 class="text-3xl font-bold text-center">Daftar Akun Baru</h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div>
          <label class="block mb-1">Nama Lengkap</label>
          <input
            v-model="name"
            type="text"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            :class="{'border-red-500': errors.name}"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>

        <div>
          <label class="block mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            :class="{'border-red-500': errors.email}"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block mb-1">Password</label>
          <input
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            :class="{'border-red-500': errors.password}"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        </div>

        <div>
          <label class="block mb-1">Konfirmasi Password</label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            class="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            :class="{'border-red-500': errors.confirmPassword}"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">{{ errors.confirmPassword }}</p>
        </div>

        <button
          type="submit"
          class="w-full py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition disabled:opacity-50"
          :disabled="loading"
        >
          {{ loading ? 'Mendaftarkan...' : 'Daftar' }}
        </button>

        <p class="text-sm text-center mt-4">
          Sudah punya akun?
          <router-link to="/login" class="text-yellow-400 hover:underline">Masuk</router-link>
        </p>
      </form>

      <p v-if="successMessage" class="text-green-400 text-sm text-center mt-2">{{ successMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

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

  if (!validateForm()) return

  loading.value = true

  try {
    // Simulasi kirim data ke server
    await new Promise(resolve => setTimeout(resolve, 1000))

    successMessage.value = 'Pendaftaran berhasil! Silakan login.'
    name.value = email.value = password.value = confirmPassword.value = ''
  } catch (e) {
    console.error('Terjadi kesalahan saat mendaftar:', e)
  } finally {
    loading.value = false
  }
}
</script>
