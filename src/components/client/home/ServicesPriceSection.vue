<template>
  <section class="py-16 px-4 md:px-8 max-w-7xl mx-auto" aria-label="Daftar Layanan dan Harga" id="main-content">
    <!-- Header -->
    <header class="text-center mb-12">
      <div class="flex items-center justify-center gap-4 mb-4">
        <slot name="service-logo" />
        <h1 class="text-3xl md:text-4xl font-bold text-white" tabindex="0">
          Layanan & Harga
        </h1>
      </div>
      <p class="text-gray-300 text-lg">Berlaku di Semua Cabang</p>
    </header>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div
        v-for="service in services"
        :key="service.id"
        class="bg-zinc-800 rounded-lg overflow-hidden border border-zinc-700"
      >
        <!-- Image -->
        <div class="aspect-video relative">
          <img
            :src="service.image_url"
            :alt="service.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-6">
          <div class="text-xs text-yellow-400 mb-2">{{ service.category }}</div>
          <h3 class="text-xl font-bold text-white mb-2">{{ service.name }}</h3>
          <p class="text-gray-400 text-sm mb-4">{{ service.description }}</p>

          <!-- Price & Duration -->
          <div class="flex justify-between items-center">
            <div>
              <div class="text-xs text-gray-500">Mulai dari</div>
              <div class="text-yellow-400 font-bold text-lg">
                {{ formatPrice(service.price) }}
              </div>
            </div>
            <div class="text-gray-500 text-sm">
              {{ formatDuration(service.duration) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getServices } from '../../../services/api'

const services = ref([])

const formatPrice = (price) => {
  return `Rp ${new Intl.NumberFormat('id-ID').format(price)}`
}

const formatDuration = (minutes) => {
  if (!minutes) return 'Tidak ada durasi'
  if (minutes < 60) return `${minutes} menit`
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  if (remainingMinutes === 0) return `${hours} jam`
  return `${hours} jam ${remainingMinutes} menit`
}

onMounted(async () => {
  try {
    const response = await getServices()
    if (Array.isArray(response)) {
      services.value = response
    }
  } catch (err) {
    console.error('Error:', err)
  }
})
</script>