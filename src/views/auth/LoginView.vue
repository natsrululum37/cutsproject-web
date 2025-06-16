<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white px-4">
    <div class="w-full max-w-md bg-zinc-900 rounded-2xl p-8 shadow-xl border border-zinc-800 space-y-6 animate-fade-in">
      <h2 class="text-3xl font-bold text-center tracking-tight">Masuk ke <span class="text-yellow-400">CutsProject</span></h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm mb-1 font-medium">Email</label>
          <div class="relative">
            <input
              v-model="email"
              type="email"
              required
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
              placeholder="you@example.com"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <i class="fa fa-envelope"></i>
            </span>
          </div>
        </div>

        <div>
          <label class="block text-sm mb-1 font-medium">Password</label>
          <div class="relative">
            <input
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-2 pl-10 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition duration-200"
              placeholder="••••••••"
            />
            <span class="absolute left-3 top-2.5 text-zinc-500">
              <i class="fa fa-lock"></i>
            </span>
          </div>
        </div>

        <button type="submit" class="w-full py-2 bg-yellow-400 text-black font-semibold rounded-lg hover:bg-yellow-300 active:scale-[0.98] transition duration-200">
          Masuk
        </button>

        <p class="text-sm text-center mt-3 text-gray-400">
          Belum punya akun?
          <router-link to="/register" class="text-yellow-400 hover:underline font-medium">Daftar di sini</router-link>
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

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
