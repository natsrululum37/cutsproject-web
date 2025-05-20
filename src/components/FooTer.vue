<template>
  <footer class="overflow-hidden text-white" :style="gradientStyle">
    <div
      class="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-y-12 gap-x-6 px-6 py-16"
    >
      <!-- 1. Logo dan Tagline -->
      <div class="space-y-4">
        <h2 class="text-3xl font-bold flex items-center gap-1 tracking-tight">
          CUTS<span class="text-yellow-400">⚡</span>PROJECT
        </h2>
        <div class="space-y-1 text-sm text-gray-300">
          <p class="uppercase font-semibold">Tradisi Lelaki, Gaya Masa Kini</p>
          <p>Confidence starts in the barber chair</p>
        </div>
      </div>

      <!-- 2. Alamat -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold border-b-2 border-yellow-400 pb-1">Alamat</h3>
        <address class="not-italic text-sm leading-relaxed text-gray-300">
          Jl. Jend. Sudirman, Sidomulyo, Sragen Wetan, Kec. Sragen, Kabupaten Sragen,<br />
          Jawa Tengah 57214
        </address>
      </div>

      <!-- 3. Hubungi Kami -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold border-b-2 border-yellow-400 pb-1">Hubungi Kami</h3>
        <ul class="space-y-4 text-sm text-gray-300">
          <li class="flex items-center gap-3 hover:text-yellow-400 transition">
            <font-awesome-icon :icon="['fab', 'instagram']" class="w-5 h-5" />
            <span>@cutsproject</span>
          </li>
          <li class="flex items-center gap-3 hover:text-yellow-400 transition">
            <font-awesome-icon :icon="['fab', 'whatsapp']" class="w-5 h-5" />
            <span>081567825713</span>
          </li>
          <li class="flex items-center gap-3 hover:text-yellow-400 transition">
            <font-awesome-icon :icon="['fab', 'tiktok']" class="w-5 h-5" />
            <span>cutsprojectofficial</span>
          </li>
        </ul>
      </div>

      <!-- 4. Jam Buka -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold border-b-2 border-yellow-400 pb-1">Open</h3>
        <ul class="text-sm leading-relaxed text-gray-300">
          <li>Monday – Friday<br />09.30 – 21.00</li>
          <li class="mt-2">Saturday – Sunday<br />09.00 – 22.30</li>
        </ul>
      </div>

      <!-- 5. Copyright -->
      <div class="md:col-span-4 pt-8 text-center text-xs text-gray-400">
        <div class="flex flex-wrap justify-center items-center gap-2">
          <span>© {{ year }} Cutsproject.com</span>
          <span>·</span>
          <a href="#" class="underline hover:text-yellow-300">Terms of Use</a>
          <span>·</span>
          <a href="#" class="underline hover:text-yellow-300">Privacy Policy</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faInstagram, faWhatsapp, faTiktok)

const year = new Date().getFullYear()

const gradientStyle = computed(() => ({
  background: 'linear-gradient(180deg, #000 45%, #F6BF0D 100%)'
}))
</script>

<style scoped>
footer {
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
}
</style>
