<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
    <section class="text-white py-16 sm:py-20 md:py-28 px-2 sm:px-4 md:px-6" id="layanan">
      <!-- Judul -->
      <div class="max-w-6xl mx-auto text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-4">
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-md">
          Layanan Unggulan
        </h2>
        <p class="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mt-3 sm:mt-4 leading-relaxed">
          Nikmati layanan premium dari barber profesional kami. Mulai dari potongan rambut modern,
          perawatan wajah, hingga coloring dan shaving dengan standar terbaik.
        </p>
      </div>

      <!-- Grid Layanan -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto px-0 sm:px-2 md:px-4"
      >
        <ServiceCard
          v-for="(service, idx) in services"
          :key="service.title"
          :icon="service.icon"
          :title="service.title"
          :desc="service.desc"
          :hover-color="service.hoverColor"
          :class="['fade-up-card']"
          :style="{ animationDelay: (0.1 + idx * 0.15) + 's' }"
        />
      </div>

      <!-- Komponen Harga -->
      <ServicesSection class="max-w-7xl mx-auto mt-16 sm:mt-20 md:mt-24" />

      <!-- CTA -->
      <div class="text-center mt-12 sm:mt-16 md:mt-20">
        <router-link
          to="/reservation"
          class="block w-full sm:inline-block sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
        >
          Booking Sekarang
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ServicesSection from '@/components/client/home/ServicesPriceSection.vue'
import ServiceCard from '@/components/client/ServiceCard.vue'
import haircutIcon from '@/assets/client/images/icons/haircut.webp'
import shavingIcon from '@/assets/client/images/icons/shaving.webp'
import haircoloringIcon from '@/assets/client/images/icons/haircoloring.webp'
import facialIcon from '@/assets/client/images/icons/facial.webp'

const services = [
  {
    icon: haircutIcon,
    title: 'Haircut',
    desc: 'Potongan rambut presisi sesuai bentuk wajah dan gaya Anda.',
    hoverColor: 'hover:shadow-yellow-500/40',
    delay: 100,
  },
  {
    icon: shavingIcon,
    title: 'Shaving',
    desc: 'Cukur bersih atau trim rapi dengan teknik barber tradisional dan alat higienis.',
    hoverColor: 'hover:shadow-green-400/40',
    delay: 200,
  },
  {
    icon: haircoloringIcon,
    title: 'Hair Coloring',
    desc: 'Pewarnaan tahan lama untuk gaya yang lebih berani dan personal.',
    hoverColor: 'hover:shadow-yellow-400/40',
    delay: 300,
  },
  {
    icon: facialIcon,
    title: 'Facial',
    desc: 'Perawatan wajah relaksasi dengan produk berkualitas tinggi.',
    hoverColor: 'hover:shadow-pink-400/40',
    delay: 400,
  },
]

const showCards = ref(false)
onMounted(() => {
  showCards.value = false
  setTimeout(() => {
    showCards.value = true
  }, 100) 
})
</script>

<style scoped>
.fade-card-enter-active, .fade-card-leave-active {
  transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-card-enter-from, .fade-card-leave-to {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
}
.fade-card-enter-to, .fade-card-leave-from {
  opacity: 1;
  transform: translateY(0) scale(1);
}

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
