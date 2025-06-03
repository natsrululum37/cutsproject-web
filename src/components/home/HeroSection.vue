<template>
  <div ref="sliderContainer" class="w-full max-w-full mx-auto relative" aria-label="Image Slider">
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
        class="relative w-full aspect-[16/9] max-h-[80vh] overflow-hidden bg-black"
      >
        <picture>
          <source :srcset="slide.imageWebp" type="image/webp" />
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-contain"
            :loading="index === 0 ? 'eager' : 'lazy'"
            width="1280"
            height="720"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            decoding="async"
          />
        </picture>

        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        <div
          class="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 text-white z-10 text-center sm:items-start sm:text-left"
        >
          <!-- Konten teks di dalam slide -->
          <div class="max-w-xl"> <!-- Opsional: Bungkus konten teks untuk membatasi lebar jika diperlukan pada layar sangat besar -->
            <h2
              class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 drop-shadow-md"
            >
              {{ slide.title }}
            </h2>
            <p
              class="mb-4 sm:mb-6 max-w-lg drop-shadow-sm text-xs sm:text-sm md:text-base lg:text-lg"
            >
              {{ slide.subtitle }}
            </p>
            <button
              class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 sm:px-5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
              @click="navigateTo(slide.ctaLink)"
              :aria-label="`${slide.ctaText} - ${slide.title}`"
            >
              {{ slide.ctaText }}
            </button>
          </div>
        </div>
      </swiper-slide>

      <!-- Custom Navigation Buttons -->
      <div
        class="swiper-button-prev !flex w-8 h-8 sm:w-12 sm:h-12 items-center justify-center"
        aria-label="Previous slide"
        :tabindex="0"
        role="button"
      ></div>
      <div
        class="swiper-button-next !flex w-8 h-8 sm:w-12 sm:h-12 items-center justify-center"
        aria-label="Next slide"
        :tabindex="0"
        role="button"
      ></div>
      <!-- Custom Pagination Container -->
      <div class="swiper-pagination absolute bottom-4 w-full z-10"></div>
    </swiper>

    <noscript>
      <div class="p-4 bg-yellow-100 text-yellow-800 rounded">
        Please enable JavaScript to view the image slider.
      </div>
    </noscript>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, Pagination, Navigation, EffectFade, A11y } from 'swiper/modules'

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
    image: new URL('/images/home-page/slider/slide1.webp', import.meta.url).href,
    imageWebp: new URL('/images/home-page/slider/slide1.webp', import.meta.url).href,
    alt: 'Featured hairstyle showcase - professional haircut and styling',
    title: 'Transform Your Look',
    subtitle: 'Experience the best barber services in town.',
    ctaText: 'Book Now',
    ctaLink: '/reservation',
  },
  {
    image: new URL('/images/home-page/slider/slide2.webp', import.meta.url).href,
    imageWebp: new URL('/images/home-page/slider/slide2.webp', import.meta.url).href,
    alt: 'Professional barber services - experienced stylist working with client',
    title: 'Expert Stylists',
    subtitle: 'Our team is ready to give you the perfect cut.',
    ctaText: 'Meet the Team',
    ctaLink: '/about',
  },
  {
    image: new URL('/images/home-page/slider/slide3.webp', import.meta.url).href,
    imageWebp: new URL('/images/home-page/slider/slide3.webp', import.meta.url).href,
    alt: 'Salon interior and equipment - modern barber shop facilities',
    title: 'Modern Facilities',
    subtitle: 'Enjoy our state-of-the-art salon environment.',
    ctaText: 'View Gallery',
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
          if (swiperInstance.value && swiperInstance.value.autoplay && !swiperInstance.value.autoplay.running) {
            swiperInstance.value.autoplay.start()
          }
        } else {
          if (swiperInstance.value && swiperInstance.value.autoplay && swiperInstance.value.autoplay.running) {
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
    // Hanya navigasi jika slider atau elemen di dalamnya fokus (atau pertimbangkan jika ini diperlukan)
    // Untuk hero, mungkin Anda ingin selalu aktif. Jika begitu, hapus kondisi `!swiperInstance.value.el.contains(document.activeElement)`
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
/* Styling untuk Tombol Navigasi Kustom */
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3); /* Latar belakang semi-transparan */
  width: 2rem; /* sm: 3rem */
  height: 2rem; /* sm: 3rem */
  border-radius: 9999px; /* Bulat penuh */
  display: flex; /* Untuk memusatkan ikon (jika ada) */
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  color: #fff; /* Warna ikon default (putih) */
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Bayangan halus */
}

/* Ukuran lebih besar pada layar sm ke atas */
@media (min-width: 640px) {
  .swiper-button-prev,
  .swiper-button-next {
    width: 3rem;
    height: 3rem;
  }
}

/* Efek hover pada tombol navigasi */
.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

/* Indikator fokus untuk aksesibilitas */
.swiper-button-prev:focus,
.swiper-button-next:focus {
  outline: 2px solid #ffd700; /* Warna kuning khas */
  outline-offset: 2px;
}

/* Styling untuk Pagination Bullets Kustom */
:deep(.swiper-pagination-bullet) {
  background: white; /* Warna default bullet */
  opacity: 0.7;
  width: 8px;
  height: 8px;
  margin: 0 4px !important; /* Paksa margin */
  transition: all 0.3s ease;
  border-radius: 50%; /* Pastikan bulat */
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #ffd700; /* Warna bullet aktif (kuning) */
  width: 10px; /* Sedikit lebih besar saat aktif */
  height: 10px;
}

/* Ukuran pagination lebih besar pada layar sm ke atas */
@media (min-width: 640px) {
  :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    margin: 0 5px !important;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 12px;
    height: 12px;
  }
}

/* Style untuk fokus visible pada tombol (jika ada tombol lain) */
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5); /* Efek glow kuning saat fokus */
}

/* Sembunyikan elemen slider saat mencetak */
@media print {
  .swiper-button-prev,
  .swiper-button-next,
  .swiper-pagination {
    display: none;
  }
}

/* Kurangi gerakan untuk pengguna yang memintanya */
@media (prefers-reduced-motion: reduce) {
  .swiper-slide img, /* Targetkan gambar jika ada animasi pada gambar */
  .swiper-button-prev,
  .swiper-button-next {
    transition: none !important;
    transform: none !important; /* Nonaktifkan transisi transform jika ada */
  }

  .swiper {
    --swiper-speed: 0ms !important; /* Nonaktifkan kecepatan transisi swiper */
  }
}
</style>
