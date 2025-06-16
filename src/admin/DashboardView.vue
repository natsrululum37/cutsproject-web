<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-black text-white hidden md:block">
      <div class="p-6 text-2xl font-bold">Admin Panel</div>
      <nav class="space-y-2 px-4">
        <router-link class="block py-2 px-4 rounded hover:bg-gray-800" to="/admin">Dashboard</router-link>
        <router-link class="block py-2 px-4 rounded hover:bg-gray-800" to="/admin/reservations">Reservasi</router-link>
        <router-link class="block py-2 px-4 rounded hover:bg-gray-800" to="/admin/gallery">Galeri</router-link>
        <router-link class="block py-2 px-4 rounded hover:bg-gray-800" to="/admin/services">Layanan</router-link>
        <router-link class="block py-2 px-4 rounded hover:bg-gray-800" to="/admin/testimonials">Testimoni</router-link>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <h1 class="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <p class="text-sm text-gray-500">Total Reservasi</p>
          <p class="text-3xl font-bold text-black">{{ stats.reservations }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <p class="text-sm text-gray-500">Layanan Aktif</p>
          <p class="text-3xl font-bold text-black">{{ stats.services }}</p>
        </div>
        <div class="bg-white rounded-lg shadow p-6 text-center">
          <p class="text-sm text-gray-500">Testimoni Masuk</p>
          <p class="text-3xl font-bold text-black">{{ stats.testimonials }}</p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Simulasi data statistik (bisa diganti dari API)
const stats = reactive({
  reservations: 128,
  services: 8,
  testimonials: 37,
})
</script>

<style scoped>
/* Tambahan styling jika perlu */
</style>
