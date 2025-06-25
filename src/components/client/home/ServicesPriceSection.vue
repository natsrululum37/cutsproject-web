<template>
  <section class="py-16 px-4 md:px-8 max-w-7xl mx-auto" id="main-content">
    <!-- Header -->
    <header class="text-center mb-14">
      <div class="flex items-center justify-center gap-4 mb-4">
        <slot name="service-logo" />
        <h1 class="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow" tabindex="0">
          Layanan & Harga
        </h1>
      </div>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Berlaku di semua cabang kami dengan kualitas layanan premium.
      </p>
    </header>

    <!-- Services Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      <div
        v-for="(service, idx) in services"
        :key="service.id"
        class="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/30 transition-all duration-300 group fade-up-card"
        :style="{ animationDelay: (0.1 + idx * 0.15) + 's' }"
      >
        <!-- Image -->
        <div class="aspect-video relative overflow-hidden">
          <img
            :src="service.image_url"
            :alt="service.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <!-- Content -->
        <div class="p-6">
          <span class="inline-block text-xs px-3 py-1 rounded-full bg-yellow-500 text-black font-semibold mb-2">
            {{ service.category }}
          </span>
          <h3 class="text-2xl font-bold text-white mb-1">{{ service.name }}</h3>
          <p class="text-gray-400 text-sm mb-5 leading-relaxed">
            {{ service.description }}
          </p>

          <!-- Price & Duration -->
          <div class="flex items-center justify-between mt-auto">
            <div>
              <div class="text-xs text-gray-400">Harga Mulai</div>
              <div class="text-yellow-400 font-bold text-lg">
                {{ formatPrice(service.price) }}
              </div>
            </div>
            <div class="text-sm text-gray-400">
              <i class="lucide lucide-clock inline-block mr-1" />{{ formatDuration(service.duration) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

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
    // Ambil semua layanan tanpa autentikasi (public)
    const response = await axios.get('/api/services', { params: { limit: 12 } })
    if (Array.isArray(response.data.data)) {
      services.value = response.data.data
    }
  } catch (err) {
    console.error('Error:', err)
  }
})
</script>

<style scoped>
.fade-up-card {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeUpCard 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes fadeUpCard {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>