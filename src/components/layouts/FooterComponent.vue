<template>
  <footer
    class="text-white gradient-dark shadow-footer"
    role="contentinfo"
    aria-label="Footer"
  >
    <div class="view-section py-8 sm:py-10 lg:py-12">
      <div class="grid-responsive">
        <!-- Logo & Tagline -->
        <div class="content-spacing">
          <h2 class="section-title flex items-center gap-1">
            <span>CUT</span>
            <img
              src="/images/logo/logo.webp"
              alt="Logo CUT PROJECT Barbershop"
              class="w-8 h-8 sm:w-10 sm:h-10 inline-block -mx-0.5 align-middle"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
            />
            <span>PROJECT</span>
          </h2>
          <div class="text-xs sm:text-sm text-gray-400">
            <p class="uppercase font-semibold">Tradisi Lelaki, Gaya Masa Kini</p>
            <p>Confidence starts in the barber chair</p>
          </div>
        </div>

        <!-- Alamat -->
        <div class="content-spacing">
          <h3 class="heading-border">Alamat</h3>
          <address class="content-text not-italic leading-relaxed" v-html="mainAddress.replace('\n', '<br />')"></address>
        </div>

        <!-- Kontak Sosial -->
        <div class="content-spacing">
          <h3 class="heading-border">
            Hubungi Kami
          </h3>
          <ul class="content-text space-y-2 sm:space-y-3">
            <li v-for="(social, platform) in socials" :key="platform">
              <a
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-2 sm:gap-3 hover-link"
                :aria-label="`${platform} Cutsproject`"
              >
                <font-awesome-icon :icon="social.icon" class="w-5 h-5" />
                <span>{{ social.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Jam Buka -->
        <div class="content-spacing">
          <h3 class="heading-border">Jam Buka</h3>
          <ul class="content-text leading-relaxed">
            <li>{{ openingHours.weekday.days }}<br />{{ openingHours.weekday.hours }}</li>
            <li class="mt-2">{{ openingHours.weekend.days }}<br />{{ openingHours.weekend.hours }}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="border-t border-gray-700 py-4 text-center content-text bg-black/30">
      <div class="view-section flex flex-wrap justify-center items-center gap-2">
        <span>© {{ year }} Cutsproject.com</span>
        <span>·</span>
        <a href="#" class="underline hover-link">Terms of Use</a>
        <span>·</span>
        <a href="#" class="underline hover-link">Privacy Policy</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useSocialStore } from '@/stores/social'
import { useBusinessStore } from '@/stores/business'

const socialStore = useSocialStore()
const businessStore = useBusinessStore()
const socials = computed(() => socialStore.getAllSocials)
const openingHours = computed(() => businessStore.getOpeningHours)
const mainAddress = computed(() => businessStore.getMainAddress)
const year = new Date().getFullYear()
</script>


