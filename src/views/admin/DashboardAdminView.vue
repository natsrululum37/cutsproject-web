<template>
  <div class="min-h-screen flex bg-[#111] text-white font-sans">
    <!-- Main Content -->
    <main class="flex-1 p-6 space-y-6 bg-[#1a1a1a]">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-yellow-400">Dashboard Admin</h1>
      </div>

      <!-- Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="card">
          <p class="text-sm text-gray-400">Total Reservasi</p>
          <p class="text-3xl font-bold text-yellow-400">{{ stats.reservations }}</p>
        </div>
        <div class="card">
          <p class="text-sm text-gray-400">Layanan Aktif</p>
          <p class="text-3xl font-bold text-yellow-400">{{ stats.services }}</p>
        </div>
        <div class="card">
          <p class="text-sm text-gray-400">Testimoni Masuk</p>
          <p class="text-3xl font-bold text-yellow-400">{{ stats.testimonials }}</p>
        </div>
      </div>

      <!-- Chart -->
      <div class="bg-zinc-900 rounded-xl shadow p-6">
        <h2 class="text-xl font-semibold text-yellow-400 mb-4">Statistik Reservasi</h2>
        <Bar :data="chartData" :options="chartOptions" :key="chartDataKey" />
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

const chartDataKey = ref(0)

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

onMounted(async () => {
  try {
    const res = await axios.get('/api/admins/dashboard-stats')
    console.log('DATA BACKEND:', res.data)

    stats.value.reservations = res.data.totalBooking
    stats.value.services = res.data.totalActiveServices
    stats.value.testimonials = res.data.totalReviews

    if (
      res.data.chart &&
      Array.isArray(res.data.chart.labels) &&
      Array.isArray(res.data.chart.data)
    ) {
      chartData.value.labels = res.data.chart.labels
      chartData.value.datasets[0].data = res.data.chart.data
    } else {
      console.warn('Chart kosong:', res.data.chart)
      chartData.value.labels = ['Jan', 'Feb', 'Mar']
      chartData.value.datasets[0].data = [1, 2, 3]
    }

    chartDataKey.value++
  } catch (err) {
    console.error('Gagal fetch statistik dashboard:', err)
  }
})

const stats = ref({
  reservations: 0,
  services: 0,
  testimonials: 0,
})

const chartData = ref({
  labels: [],
  datasets: [
    {
      label: 'Reservasi',
      backgroundColor: '#facc15',
      data: [],
    },
  ],
})

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: false },
  },
  scales: {
    x: {
      ticks: { color: '#facc15' },
      grid: { color: '#333' },
    },
    y: {
      min: 0,
      max: 20,
      ticks: { color: '#facc15', stepSize: 0 },
      grid: { color: '#333' },
    },
  },
}


</script>

<style scoped>
.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  color: #d1d5db;
  transition:
    background 0.2s,
    color 0.2s;
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
