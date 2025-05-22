<template>
  <section class="py-24 relative">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        class="flex flex-col justify-center items-center gap-x-16 gap-y-5 xl:gap-28 lg:flex-row lg:justify-between max-lg:max-w-2xl mx-auto max-w-full"
      >
        <!-- Gambar dengan overlay saat hover -->
        <div class="relative w-full lg:w-1/2 group">
          <img
            src="@/assets/images/tools.webp"
            alt="FAQ tailwind section"
            class="w-full rounded-xl object-cover transition"
          />
          <!-- Overlay muncul saat hover -->
          <div
            class="absolute inset-0 bg-black bg-opacity-90 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
          >
            <div class="text-white text-[15rem] font-bold select-none">?</div>
          </div>
        </div>

        <!-- Accordion Section -->
        <div class="w-full lg:w-1/2">
          <div class="lg:max-w-xl">
            <div class="mb-1 lg:mb-1">
              <h2
                class="text-5xl text-justify font-bold text-white leading-[3.25rem] mb-1 lg:text-justify"
              >
                FAQ ABOUT CUTS PROJECT
              </h2>
            </div>
            <div class="accordion-group">
              <div
                v-for="(faq, index) in faqs"
                :key="index"
                class="accordion py-8 border-b border-solid border-[#B8860B]"
              >
                <button
                  @click="toggle(index)"
                  class="accordion-toggle group inline-flex items-center justify-between w-full text-xl font-normal leading-8 text-gray-600 transition duration-500 hover:text-[#B8860B]"
                >
                  <h5 class="text-justify">{{ faq.title }}</h5>
                  <svg
                    :class="[
                      'transition duration-500 group-hover:text-[#B8860B]',
                      { 'rotate-180 text-[#B8860B]': openIndex === index },
                    ]"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                      stroke="currentColor"
                      stroke-width="1.6"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <div
                  v-show="openIndex === index"
                  class="accordion-content w-full px-0 overflow-hidden pr-4 transition-all duration-300 mt-4"
                >
                  <p class="text-base font-normal text-gray-600 text-justify">
                    {{ faq.content }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    title: 'Bisakah saya meminta gaya potongan rambut sesuai preferensi saya?',
    content: `Tentu saja! Tim barber profesional kami akan dengan senang hati mendengarkan keinginan Anda dan menyesuaikan
    potongan rambut sesuai gaya yang Anda inginkan. Kami selalu memprioritaskan konsultasi terlebih dahulu untuk memastikan
    hasil akhir sesuai dengan ekspektasi Anda, sekaligus memberikan saran profesional berdasarkan bentuk wajah dan tekstur
    rambut Anda.`,
  },
  {
    title: 'Haruskah saya reservasi terlebih dahulu atau bisa langsung datang?',
    content: `Kami sangat merekomendasikan untuk melakukan reservasi terlebih dahulu, terutama di akhir pekan atau hari libur,
    karena antrean bisa cukup panjang. Dengan reservasi, kami dapat memastikan Anda mendapatkan waktu yang tepat tanpa harus
    menunggu lama. Namun, jika Anda ingin langsung datang, kami akan berusaha melayani sebaik mungkin sesuai dengan ketersediaan
    slot yang ada.`,
  },
  {
    title: 'Apakah CUTS PROJECT hanya melayani pria atau bisa untuk wanita juga?',
    content: `Saat ini, CUTS PROJECT adalah barbershop yang secara khusus didedikasikan untuk perawatan rambut dan grooming pria.
    Layanan kami dirancang untuk memenuhi kebutuhan gaya pria modern, mulai dari potongan klasik hingga kontemporer. Namun, kami
    bisa memberikan rekomendasi tempat salon terdekat yang cocok untuk wanita jika diperlukan.`,
  },
  {
    title: 'Bagaimana proses pembayarannya?',
    content: `Di CUTS PROJECT, kami menyediakan berbagai metode pembayaran yang aman dan fleksibel untuk kenyamanan Anda. Anda bisa
    melakukan pembayaran secara tunai (cash), melalui QRIS, atau menggunakan kartu debit/kredit.`,
  },
])

const openIndex = ref(0)
const toggle = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>
