<template>
  <a
    href="#main-content"
    class="sr-only focus:not-sr-only bg-yellow-400 text-black px-4 py-2 absolute z-50 left-2 top-2 rounded"
    >Lewati ke Konten Utama</a
  >
  <section class="view-section hero-spacing" aria-label="Slider Gambar Utama Beranda">
    <div ref="sliderContainer" class="relative w-full max-w-full mx-auto">
      <swiper
        :modules="swiperModules"
        :slides-per-view="1"
        :loop="true"
        effect="fade"
        :speed="800"
        :autoplay="autoplayConfig"
        :pagination="paginationConfig"
        :navigation="navigationConfig"
        :a11y="a11yConfig"
        @swiper="onSwiper"
        class="w-full rounded-lg"
      >
        <swiper-slide
          v-for="(slide, index) in slides"
          :key="index"
          class="relative w-full aspect-[16/9] overflow-hidden bg-black"
        >
          <picture>
            <source :srcset="slide.imageWebp" type="image/webp" media="(min-width: 768px)" />
            <source
              :srcset="slide.imageWebpMobile || slide.imageWebp"
              type="image/webp"
              media="(max-width: 767px)"
            />
            <img
              :src="slide.image"
              :alt="slide.alt"
              class="w-full h-full object-cover brightness-75"
              :loading="index === 0 ? 'eager' : 'lazy'"
              width="600"
              height="338"
              style="aspect-ratio: 16/9; max-width: 100vw; max-height: 100vh"
            />
          </picture>

          <!-- Overlay Gradient -->
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 transition-all duration-700"
          ></div>

          <!-- Slide Content -->
          <div class="absolute inset-0 flex items-center justify-center z-20">
            <div
              class="max-w-4xl w-full mx-auto px-2 sm:px-4 text-center text-white py-6 sm:py-12 md:py-20"
            >
              <h2
                class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4 drop-shadow-xl transition-all duration-500"
              >
                {{ slide.title }}
              </h2>
              <p
                class="mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-lg md:text-xl drop-shadow-lg transition-all duration-500"
              >
                {{ slide.subtitle }}
              </p>
              <button
                class="bg-yellow-500 hover:bg-yellow-600 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold shadow-lg hover:scale-105 focus:scale-105 active:scale-95 transition-all duration-300 outline-none ring-2 ring-yellow-400/0 focus:ring-yellow-400/60 text-base sm:text-lg"
                @click="navigateTo(slide.ctaLink)"
                :aria-label="`${slide.ctaText} - ${slide.title}`"
                tabindex="0"
              >
                {{ slide.ctaText }}
              </button>
            </div>
          </div>
        </swiper-slide>

        <!-- Pagination -->
        <div class="swiper-pagination absolute bottom-4 w-full" />
      </swiper>

      <!-- Custom Navigation Buttons - positioned outside image area -->
      <button
        class="absolute -left-16 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hidden lg:block"
        @click="() => swiperInstance?.slidePrev()"
        aria-label="Previous slide"
      >
        <ArrowLeftIcon class="w-8 h-8 text-yellow-400" />
      </button>
      <button
        class="absolute -right-16 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-black/80 p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all duration-300 hidden lg:block"
        @click="() => swiperInstance?.slideNext()"
        aria-label="Next slide"
      >
        <ArrowRightIcon class="w-8 h-8 text-yellow-400" />
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectFade, A11y } from 'swiper/modules'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/vue/24/solid'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/a11y'

const swiperInstance = ref(null)
const router = useRouter()
const sliderContainer = ref(null) // Ref for Intersection Observer
const observer = ref(null)

const slides = [
  {
    image: new URL('/images/slider/dekstop/slide1-desktop.webp', import.meta.url).href,
    imageWebp: new URL('/images/slider/dekstop/slide1-desktop.webp', import.meta.url).href,
    alt: 'Tampilan gaya rambut unggulan - potong dan styling profesional',
    title: 'Ubah Penampilan Anda',
    subtitle: 'Rasakan layanan barbershop terbaik di kota Anda.',
    ctaText: 'Reservasi Sekarang',
    ctaLink: '/reservation',
  },
  {
    image: new URL('/images/slider/dekstop/slide2-desktop.webp', import.meta.url).href,
    imageWebp: new URL('/images/slider/dekstop/slide2-desktop.webp', import.meta.url).href,
    alt: 'Layanan barber profesional - penata rambut berpengalaman',
    title: 'Penata Rambut Ahli',
    subtitle: 'Tim kami siap memberikan potongan rambut terbaik untuk Anda.',
    ctaText: 'Lihat Tim Kami',
    ctaLink: '/about',
  },
  {
    image: new URL('/images/slider/dekstop/slide1-desktop.webp', import.meta.url).href,
    imageWebp: new URL('/images/slider/dekstop/slide1-desktop.webp', import.meta.url).href,
    alt: 'Interior salon dan peralatan - fasilitas barbershop modern',
    title: 'Fasilitas Modern',
    subtitle: 'Nikmati suasana salon modern dan nyaman.',
    ctaText: 'Lihat Galeri',
    ctaLink: '/gallery',
  },
]

const navigateTo = (link) => {
  router.push(link)
}

const swiperModules = [Autoplay, Pagination, Navigation, EffectFade, A11y]

const autoplayConfig = {
  delay: 5000,
  disableOnInteraction: false,
  pauseOnMouseEnter: true,
}

const paginationConfig = {
  clickable: true,
  el: '.swiper-pagination', // Tautkan ke kontainer pagination kustom
  dynamicBullets: true,
  renderBullet: (index, className) => {
    return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`
  },
}

const navigationConfig = {
  prevEl: '.swiper-button-prev', // Tautkan ke tombol navigasi kustom
  nextEl: '.swiper-button-next',
  hideOnClick: true, // Menyembunyikan tombol setelah diklik jika diinginkan
}

const a11yConfig = {
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide',
  firstSlideMessage: 'This is the first slide',
  lastSlideMessage: 'This is the last slide',
  paginationBulletMessage: 'Go to slide {{index}}', // {{index}} akan diganti dengan nomor slide
  containerMessage: 'Image Slider with featured services',
  containerRoleDescriptionMessage: 'carousel',
  itemRoleDescriptionMessage: 'slide',
}

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// Intersection Observer untuk autoplay
onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (
            swiperInstance.value &&
            swiperInstance.value.autoplay &&
            !swiperInstance.value.autoplay.running
          ) {
            swiperInstance.value.autoplay.start()
          }
        } else {
          if (
            swiperInstance.value &&
            swiperInstance.value.autoplay &&
            swiperInstance.value.autoplay.running
          ) {
            swiperInstance.value.autoplay.stop()
          }
        }
      },
      { threshold: 0.3 }, // Autoplay aktif/nonaktif saat 30% slider terlihat
    )

    if (sliderContainer.value) {
      observer.value.observe(sliderContainer.value)
    }
  }
  // Tambahkan event listener keyboard
  document.addEventListener('keydown', handleKeyboard)
})

onBeforeUnmount(() => {
  // Hentikan observasi dan hapus event listener saat komponen dihancurkan
  if (observer.value && sliderContainer.value) {
    observer.value.unobserve(sliderContainer.value)
  }
  document.removeEventListener('keydown', handleKeyboard)
})

// Handle keyboard navigation
const handleKeyboard = (e) => {
  if (!swiperInstance.value || !swiperInstance.value.el.contains(document.activeElement)) {
    // return;
  }

  if (e.key === 'ArrowLeft') {
    swiperInstance.value.slidePrev()
  } else if (e.key === 'ArrowRight') {
    swiperInstance.value.slideNext()
  }
}
</script>

<style scoped>
.swiper :deep(.swiper-button-prev),
.swiper :deep(.swiper-button-next) {
  color: var(--color-primary);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  width: 48px;
  height: 48px;
}

.swiper :deep(.swiper-pagination-bullet) {
  background: var(--color-primary);
  opacity: 0.5;
}

.swiper :deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

/* Responsive padding for slide content */
@media (max-width: 640px) {
  .swiper-slide .text-center {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
}
</style>
