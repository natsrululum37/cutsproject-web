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
          src="https://ui-avatars.com/api/?name=Nama+Pengguna&background=facc15&color=000"
          alt="Avatar"
          class="w-24 h-24 rounded-full border-4 border-yellow-400"
        />
        <div class="text-center md:text-left">
          <p class="text-xl font-semibold">Nama Pengguna</p>
          <p class="text-gray-400 text-sm">user@example.com</p>
        </div>
      </div>

      <!-- Detail -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-300">
        <div>
          <p class="font-semibold text-white mb-1">Nomor Telepon</p>
          <p>0812-3456-7890</p>
        </div>
        <div>
          <p class="font-semibold text-white mb-1">Alamat</p>
          <p>Yogyakarta, Indonesia</p>
        </div>
        <div>
          <p class="font-semibold text-white mb-1">Tanggal Bergabung</p>
          <p>1 Januari 2024</p>
        </div>
        <div>
          <p class="font-semibold text-white mb-1">Status Akun</p>
          <p class="text-green-400">Aktif</p>
        </div>
      </div>

      <!-- Aksi -->
      <div class="flex flex-col md:flex-row justify-between gap-4 mt-10">
        <button
          class="w-full md:w-auto px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg shadow-md transition"
        >
          Edit Profil
        </button>
        <button
          @click="logout"
          class="w-full md:w-auto px-6 py-3 bg-red-500 hover:bg-red-400 text-white font-semibold rounded-lg shadow-md transition"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

function logout() {
  auth.logout();
  router.push('/login');
}
</script>
