<template>
  <div class="min-h-screen flex items-center justify-center bg-black text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-lg p-8 shadow-lg space-y-6">
      <h2 class="text-3xl font-bold text-center">Masuk ke CutsProject</h2>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label class="block mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <button type="submit" class="w-full py-2 bg-yellow-400 text-black font-semibold rounded hover:bg-yellow-300 transition">
          Masuk
        </button>
        <p class="text-sm text-center mt-4">
          Belum punya akun?
          <router-link to="/register" class="text-yellow-400 hover:underline">Daftar di sini</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')

function handleLogin() {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  // Tambahkan autentikasi ke backend di sini
}
</script>
