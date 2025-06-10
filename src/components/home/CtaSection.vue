<template>
  <section class="view-section section-content" aria-label="Aksi Cepat Reservasi Barbershop">
    <div class="bg-yellow-400 text-black rounded-xl shadow-xl p-8 md:p-12 max-w-3xl mx-auto">
      <div class="text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4 tracking-wide" tabindex="0">
          Siap Tampil Lebih Ganteng?
        </h2>
        <p class="mb-8 text-base md:text-lg text-gray-800 font-medium">
          Booking sekarang dan nikmati pengalaman potong rambut terbaik di barbershop kami.
        </p>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          class="inline-block bg-black text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:bg-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          rel="noopener"
          aria-label="Hubungi via WhatsApp untuk reservasi barbershop"
          tabindex="0"
        >
          Hubungi via WhatsApp
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
// ...existing code...
</script>

<style scoped>
/* Hanya style khusus untuk CTA content */
@media (max-width: 640px) {
  .bg-yellow-400 {
    padding: 1.5rem 1rem;
  }
}
</style>
