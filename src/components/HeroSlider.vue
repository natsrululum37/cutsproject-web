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
        class="relative w-full h-[350px] sm:h-[400px] md:h-[450px] lg:h-[550px] overflow-hidden"
      >
        <picture>
          <source :srcset="slide.imageWebp" type="image/webp" />
          <source :srcset="slide.imageSm" media="(max-width: 640px)" />
          <source :srcset="slide.imageMd" media="(max-width: 1024px)" />
          <img
            :src="slide.image"
            :alt="slide.alt"
            class="w-full h-full object-cover"
            :loading="index === 0 ? 'eager' : 'lazy'"
            width="1280"
            height="720"
            :fetchpriority="index === 0 ? 'high' : 'auto'"
            decoding="async"
          />
        </picture>

        <div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>

        <div
          class="absolute inset-0 flex flex-col items-start justify-center px-4 sm:px-6 md:px-8 lg:px-16 text-white z-10"
        >
          <h2
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-md"
          >
            {{ slide.title }}
          </h2>
          <p class="mb-4 sm:mb-6 max-w-lg drop-shadow-sm text-sm sm:text-base md:text-lg">
            {{ slide.subtitle }}
          </p>
          <button
            class="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2 px-4 sm:px-5 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
            @click="navigateTo(slide.ctaLink)"
            :aria-label="'${slide.ctaText} - ${slide.title}'"
          >
            {{ slide.ctaText }}
          </button>
        </div>
      </swiper-slide>

      <div
        class="swiper-button-prev !hidden sm:!flex"
        aria-label="Previous slide"
        :tabindex="0"
        role="button"
      ></div>
      <div
        class="swiper-button-next !hidden sm:!flex"
        aria-label="Next slide"
        :tabindex="0"
        role="button"
      ></div>
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

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import 'swiper/css/a11y'

const swiperInstance = ref(null)
const router = useRouter()
const sliderContainer = ref(null)
const observer = ref(null)

const slides = [
  {
    image: new URL('@/assets/images/hero1.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero1.webp', import.meta.url).href,
    imageSm: new URL('@/assets/images/hero1-sm.webp', import.meta.url).href,
    imageMd: new URL('@/assets/images/hero1-md.webp', import.meta.url).href,
    alt: 'Featured hairstyle showcase - professional haircut and styling',
    title: 'Transform Your Look',
    subtitle: 'Experience the best barber services in town.',
    ctaText: 'Book Now',
    ctaLink: '/reservation',
  },
  {
    image: new URL('@/assets/images/hero2.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero2.webp', import.meta.url).href,
    imageSm: new URL('@/assets/images/hero2-sm.webp', import.meta.url).href,
    imageMd: new URL('@/assets/images/hero2-md.webp', import.meta.url).href,
    alt: 'Professional barber services - experienced stylist working with client',
    title: 'Expert Stylists',
    subtitle: 'Our team is ready to give you the perfect cut.',
    ctaText: 'Meet the Team',
    ctaLink: '/about',
  },
  {
    image: new URL('@/assets/images/hero3.webp', import.meta.url).href,
    imageWebp: new URL('@/assets/images/hero3.webp', import.meta.url).href,
    imageSm: new URL('@/assets/images/hero3-sm.webp', import.meta.url).href,
    imageMd: new URL('@/assets/images/hero3-md.webp', import.meta.url).href,
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
  el: '.swiper-pagination',
  dynamicBullets: true,
  renderBullet: (index, className) => {
    return `<span class="${className}" role="button" aria-label="Go to slide ${index + 1}"></span>`
  },
}

const navigationConfig = {
  prevEl: '.swiper-button-prev',
  nextEl: '.swiper-button-next',
  hideOnClick: true,
}

const a11yConfig = {
  prevSlideMessage: 'Previous slide',
  nextSlideMessage: 'Next slide',
  firstSlideMessage: 'This is the first slide',
  lastSlideMessage: 'This is the last slide',
  paginationBulletMessage: 'Go to slide {{index}}',
  containerMessage: 'Image Slider with featured services',
  containerRoleDescriptionMessage: 'carousel',
  itemRoleDescriptionMessage: 'slide',
}

const onSwiper = (swiper) => {
  swiperInstance.value = swiper
}

// Pause autoplay when slider is not in viewport (for better performance)
onMounted(() => {
  if ('IntersectionObserver' in window) {
    observer.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          if (swiperInstance.value && !swiperInstance.value.autoplay.running) {
            swiperInstance.value.autoplay.start()
          }
        } else {
          if (swiperInstance.value && swiperInstance.value.autoplay.running) {
            swiperInstance.value.autoplay.stop()
          }
        }
      },
      { threshold: 0.3 },
    )

    if (sliderContainer.value) {
      observer.value.observe(sliderContainer.value)
    }
  }

  // Add keyboard navigation
  document.addEventListener('keydown', handleKeyboard)
})

onBeforeUnmount(() => {
  if (observer.value && sliderContainer.value) {
    observer.value.unobserve(sliderContainer.value)
  }
  document.removeEventListener('keydown', handleKeyboard)
})

const handleKeyboard = (e) => {
  if (!swiperInstance.value) return

  if (e.key === 'ArrowLeft') {
    swiperInstance.value.slidePrev()
  } else if (e.key === 'ArrowRight') {
    swiperInstance.value.slideNext()
  }
}
</script>

<style scoped>
.swiper-button-prev,
.swiper-button-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.3);
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
  color: #fff;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: rgba(0, 0, 0, 0.5);
}

.swiper-button-prev:focus,
.swiper-button-next:focus {
  outline: 2px solid #ffd700;
  outline-offset: 2px;
}

:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
  width: 8px;
  height: 8px;
  margin: 0 4px;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
  background: #ffd700;
  width: 10px;
  height: 10px;
}

@media (min-width: 640px) {
  :deep(.swiper-pagination-bullet) {
    width: 10px;
    height: 10px;
    margin: 0 5px;
  }

  :deep(.swiper-pagination-bullet-active) {
    width: 12px;
    height: 12px;
  }
}

button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.5);
}

@media print {
  .swiper-button-prev,
  .swiper-button-next,
  .swiper-pagination {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .swiper-slide img,
  .swiper-button-prev,
  .swiper-button-next {
    transition: none !important;
    transform: none !important;
  }

  .swiper {
    --swiper-speed: 0ms !important;
  }
}
</style>
