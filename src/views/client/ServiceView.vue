<template>
  <div class="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black">
    <section class="text-white py-28 px-6" id="layanan">
      <!-- Judul -->
      <div class="max-w-6xl mx-auto text-center mb-20 px-4">
        <h2 class="text-5xl font-extrabold text-yellow-400 drop-shadow-md">Layanan Unggulan</h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
          Nikmati layanan premium dari barber profesional kami. Mulai dari potongan rambut modern,
          perawatan wajah, hingga coloring dan shaving dengan standar terbaik.
        </p>
      </div>

      <!-- Grid Layanan -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto px-4"
        data-aos="fade-up"
        data-aos-duration="800"
      >
        <!-- Card Haircut -->
        <div
          class="bg-zinc-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-yellow-500/40 transform hover:-translate-y-1 transition duration-500"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="w-20 h-20 mx-auto mb-5 bg-white rounded-full flex items-center justify-center">
            <img
              src="@/assets/client/images/icons/haircut.webp"
              alt="Haircut Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Haircut</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Potongan rambut presisi sesuai bentuk wajah dan gaya Anda.
          </p>
        </div>

        <!-- Card Shaving -->
        <div
          class="bg-zinc-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-green-400/40 transform hover:-translate-y-1 transition duration-500"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div class="w-20 h-20 mx-auto mb-5 bg-white rounded-full flex items-center justify-center">
            <img
              src="@/assets/client/images/icons/shaving.webp"
              alt="Shaving Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Shaving</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Cukur bersih atau trim rapi dengan teknik barber tradisional dan alat higienis.
          </p>
        </div>

        <!-- Card Hair Coloring -->
        <div
          class="bg-zinc-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-yellow-400/40 transform hover:-translate-y-1 transition duration-500"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="w-20 h-20 mx-auto mb-5 bg-white rounded-full flex items-center justify-center">
            <img
              src="@/assets/client/images/icons/haircoloring.webp"
              alt="Hair Coloring Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Hair Coloring</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Pewarnaan tahan lama untuk gaya yang lebih berani dan personal.
          </p>
        </div>

        <!-- Card Facial -->
        <div
          class="bg-zinc-900 border border-gray-800 rounded-2xl p-8 text-center shadow-xl hover:shadow-pink-400/40 transform hover:-translate-y-1 transition duration-500"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div class="w-20 h-20 mx-auto mb-5 bg-white rounded-full flex items-center justify-center">
            <img
              src="@/assets/client/images/icons/facial.webp"
              alt="Facial Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-2xl font-bold text-white mb-3">Facial</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Perawatan wajah relaksasi dengan produk berkualitas tinggi.
          </p>
        </div>
      </div>

      <!-- Komponen Harga -->
      <ServicesSection class="max-w-7xl mx-auto mt-24" />

      <!-- CTA -->
      <div class="text-center mt-20">
        <router-link
  to="/reservation"
  class="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold text-lg px-10 py-4 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 active:scale-95"
>
  Booking Sekarang
</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import ServicesSection from '@/components/client/home/ServicesPriceSection.vue'
</script>
