<template>
  <footer
    class="overflow-hidden text-white bg-gradient-to-b from-black via-gray-900 to-gray-800"
    :style="gradientStyle"
    role="contentinfo"
    aria-label="Footer"
  >
    <div
      class="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 px-6 py-16"
    >
      <!-- Logo & Tagline -->
      <div class="space-y-4">
        <h2 class="text-3xl font-extrabold tracking-tight flex items-center gap-1">
          <span>CUT</span>
          <img
            src="@/assets/images/logo.webp"
            alt="Logo CUT PROJECT Barbershop"
            class="w-10 h-10 inline-block -mx-0.5 align-middle"
            width="40"
            height="40"
            loading="lazy"
            decoding="async"
          />
          <span>PROJECT</span>
        </h2>
        <div class="text-sm text-gray-400">
          <p class="uppercase font-semibold">Tradisi Lelaki, Gaya Masa Kini</p>
          <p>Confidence starts in the barber chair</p>
        </div>
      </div>

      <!-- Alamat -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-white border-b border-yellow-500 pb-2">Alamat</h3>
        <address class="not-italic text-sm leading-relaxed text-gray-400">
          Jl. Jend. Sudirman, Sidomulyo, Sragen Wetan, Kec. Sragen,<br />
          Jawa Tengah 57214
        </address>
      </div>

      <!-- Kontak Sosial -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-white border-b border-yellow-500 pb-2">
          Hubungi Kami
        </h3>
        <ul class="space-y-3 text-sm text-gray-400">
          <li>
            <a
              href="https://instagram.com/cutsproject"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 hover:text-yellow-400 transition"
              aria-label="Instagram Cutsproject"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" class="w-5 h-5" />
              <span>@cutsproject</span>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/6281390830955"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 hover:text-yellow-400 transition"
              aria-label="WhatsApp Cutsproject"
            >
              <font-awesome-icon :icon="['fab', 'whatsapp']" class="w-5 h-5" />
              <span>0813-9083-0955</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@cutsproject"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-3 hover:text-yellow-400 transition"
              aria-label="Tiktok Cutsproject"
            >
              <font-awesome-icon :icon="['fab', 'tiktok']" class="w-5 h-5" />
              <span>cutsprojectofficial</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Jam Buka -->
      <div class="space-y-4">
        <h3 class="text-lg font-semibold text-white border-b border-yellow-500 pb-2">Jam Buka</h3>
        <ul class="text-sm leading-relaxed text-gray-400">
          <li>Senin – Jumat<br />09.30 – 21.00</li>
          <li class="mt-2">Sabtu – Minggu<br />09.00 – 22.30</li>
        </ul>
      </div>
    </div>
    <div class="border-t border-gray-700 pt-8 pb-4 text-center text-xs text-gray-500 bg-black/30">
      <div class="flex flex-wrap justify-center items-center gap-2">
        <span>© {{ year }} Cutsproject.com</span>
        <span>·</span>
        <a href="#" class="underline hover:text-yellow-300">Terms of Use</a>
        <span>·</span>
        <a href="#" class="underline hover:text-yellow-300">Privacy Policy</a>
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
  background: 'linear-gradient(180deg, #000000 20%, #1f2937 100%)',
}))
</script>

<style scoped>
footer {
  box-shadow: 0 -6px 25px rgba(0, 0, 0, 0.5);
}
@media (max-width: 640px) {
  footer {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    font-size: 0.95rem;
  }
}
</style>
