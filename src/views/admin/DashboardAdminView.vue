<template>
  <div class="min-h-screen flex bg-[#111] text-white font-sans">
    <!-- Sidebar -->
    <aside class="w-64 bg-black hidden md:flex flex-col justify-between shadow-lg">
      <div>
        <div class="p-6 text-2xl font-bold text-yellow-400">CutsProject</div>
        <nav class="space-y-2 px-4 mt-4">
          <router-link to="/admin" class="nav-link">Dashboard</router-link>
          <router-link to="/admin/reservations" class="nav-link">Reservasi</router-link>
          <router-link to="/admin/gallery" class="nav-link">Galeri</router-link>
          <router-link to="/admin/services" class="nav-link">Layanan</router-link>
        </nav>
      </div>
      <div class="p-4 border-t border-gray-700">
        <button @click="logout" class="text-sm text-gray-400 hover:text-yellow-400 transition">Keluar</button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 space-y-6 bg-[#1a1a1a]">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-yellow-400">Dashboard Admin</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-gray-400">👋 Selamat datang, Admin</span>
          <button class="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-300 text-sm">Profil</button>
        </div>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <p class="text-sm text-gray-400">Total Reservasi</p>
          <p class="text-3xl font-bold">{{ stats.reservations }}</p>
        </div>
        <div class="card">
          <p class="text-sm text-gray-400">Layanan Aktif</p>
          <p class="text-3xl font-bold">{{ stats.services }}</p>
        </div>
        <div class="card">
          <p class="text-sm text-gray-400">Testimoni Masuk</p>
          <p class="text-3xl font-bold">{{ stats.testimonials }}</p>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-[#222] rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold text-yellow-400 mb-4">Statistik Reservasi</h2>
        <Bar :data="chartData" :options="chartOptions" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const stats = reactive({
  reservations: 128,
  services: 8,
  testimonials: 37,
})

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun'],
  datasets: [
    {
      label: 'Reservasi',
      backgroundColor: '#facc15',
      data: [15, 25, 20, 35, 40, 45],
    }
  ]
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false }
  },
  scales: {
    x: {
      ticks: { color: '#facc15' },
      grid: { color: '#333' }
    },
    y: {
      ticks: { color: '#facc15' },
      grid: { color: '#333' }
    }
  }
}

function logout() {
  alert('Berhasil logout!')
}
</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #d1d5db;
  transition: background 0.2s, color 0.2s;
}
.nav-link:hover {
  background-color: #1f2937;
  color: #facc15;
}
.card {
  background-color: #222;
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
}
</style>
