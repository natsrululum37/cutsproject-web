<template>
  <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div
      class="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full"
    >
      <!-- Gambar -->
      <div class="relative w-full lg:w-1/2 group mb-8 lg:mb-0">
        <img
          src="@/assets/client/images/tools.webp"
          alt="FAQ tailwind section"
          class="w-full rounded-xl object-cover transition"
        />
        <!-- Overlay -->
        <div
          class="absolute inset-0 bg-black bg-opacity-90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        >
          <div class="text-white text-[8rem] md:text-[12rem] font-bold select-none">?</div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="w-full lg:w-1/2">
        <div class="lg:max-w-xl">
          <div class="mb-1 lg:mb-1">
            <h2 class="text-3xl md:text-5xl font-bold text-yellow-400 leading-tight mb-4 text-center md:text-left">
              FAQ ABOUT CUTS PROJECT
            </h2>
          </div>
          <div class="accordion-group space-y-3 pb-16">
            <div
              v-for="(faq, index) in faqs"
              :key="index"
              class="accordion bg-zinc-900 rounded-lg shadow border border-zinc-800"
            >
              <button
                @click="toggle(index)"
                class="accordion-toggle group inline-flex items-center justify-between w-full text-lg md:text-xl font-medium leading-normal text-gray-200 transition duration-300 hover:text-yellow-400 px-6 py-4 focus:outline-none"
              >
                <span class="flex items-center gap-4 text-left">
                  <svg
                    class="w-5 h-5 text-yellow-400 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01" />
                  </svg>
                  {{ faq.title }}
                </span>
                <svg
                  :class="[
                    'ml-4 transition-transform duration-300 group-hover:text-yellow-400',
                    { 'rotate-180 text-yellow-400': openIndex === index },
                  ]"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L11 14L16 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
              <transition name="fade-slide">
                <div
                  v-if="openIndex === index"
                  class="accordion-content px-6 pb-4 text-gray-300 text-base leading-relaxed animate-fade-up"
                >
                  <p class="text-justify">{{ faq.content }}</p>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const openIndex = ref(null)

const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqs = [
  {
    title: 'Apakah layanan bisa walk-in atau perlu reservasi?',
    content:
      'Kami menerima pelanggan walk-in, tetapi untuk menghindari antrian panjang dan mendapatkan jadwal yang pasti, kami sangat menyarankan untuk melakukan reservasi terlebih dahulu melalui WhatsApp atau website kami.',
  },
  {
    title: 'Apa saja metode pembayaran yang tersedia?',
    content:
      'Kami menerima berbagai metode pembayaran termasuk tunai, kartu debit/kredit, dan e-wallet seperti GoPay, OVO, dan DANA untuk kenyamanan Anda.',
  },
  {
    title: 'Berapa lama waktu yang dibutuhkan untuk satu sesi?',
    content:
      'Waktu standar untuk layanan potong rambut berkisar 30-45 menit. Untuk layanan tambahan seperti coloring atau treatment khusus bisa membutuhkan waktu lebih lama.',
  },
  {
    title: 'Bisakah saya meminta gaya potongan rambut sesuai preferensi saya?',
    content:
      'Tentu saja! Tim barber profesional kami akan dengan senang hati mendengarkan keinginan Anda dan menyesuaikan potongan rambut sesuai gaya yang Anda inginkan. Kami selalu memprioritaskan konsultasi terlebih dahulu untuk memastikan hasil akhir sesuai dengan ekspektasi Anda, sekaligus memberikan saran profesional berdasarkan bentuk wajah dan tekstur rambut Anda.',
  },
]
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(30px);
}
.fade-slide-enter-to {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
