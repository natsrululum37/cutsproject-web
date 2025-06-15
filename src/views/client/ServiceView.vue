<template>
  <div class="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
    <section class="text-white py-28 px-6" id="layanan">
      <div class="max-w-7xl mx-auto text-center mb-24 px-4">
        <h2 class="text-5xl font-extrabold tracking-tight mb-4 drop-shadow-lg">Layanan Kami</h2>
        <p class="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Dapatkan layanan grooming premium dengan barber berpengalaman, suasana nyaman, dan produk
          berkualitas tinggi yang membuat Anda tampil maksimal setiap hari.
        </p>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto px-4"
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-in-out"
      >
        <!-- Haircut -->
        <div
          class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-yellow-500/50 transform hover:scale-105 transition duration-500 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div
            class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center"
          >
            <img
              src="@/assets/client/images/icons/haircut.webp"
              alt="Haircut Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Haircut</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Potongan rambut presisi, klasik dan modern, disesuaikan bentuk wajah dan gaya pribadi
            Anda.
          </p>
        </div>

        <!-- Shaving -->
        <div
          class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-green-400/50 transform hover:scale-105 transition duration-500 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div
            class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center"
          >
            <img
              src="@/assets/client/images/icons/shaving.webp"
              alt="Shaving Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Shaving</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Cukur bersih atau trim rapi dengan teknik barber tradisional dan alat higienis.
          </p>
        </div>

        <!-- Hair Coloring -->
        <div
          class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-yellow-400/50 transform hover:scale-105 transition duration-500 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div
            class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center"
          >
            <img
              src="@/assets/client/images/icons/haircoloring.webp"
              alt="Hair Coloring Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Hair Coloring</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Pewarnaan rambut aman dan tahan lama, mulai dari highlight hingga full color.
          </p>
        </div>

        <!-- Facial -->
        <div
          class="bg-gradient-to-t from-gray-800 to-gray-900 border border-gray-700 rounded-3xl p-10 text-center shadow-lg hover:shadow-pink-400/50 transform hover:scale-105 transition duration-500 cursor-pointer"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <div
            class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center"
          >
            <img
              src="@/assets/client/images/icons/facial.webp"
              alt="Facial Icon"
              class="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h3 class="text-3xl font-semibold mb-3 drop-shadow-md">Facial</h3>
          <p class="text-gray-400 text-base leading-relaxed">
            Perawatan kulit wajah dengan teknik relaksasi dan produk terbaik untuk hasil maksimal.
          </p>
        </div>
      </div>

      <ServicesSection class="max-w-7xl mx-auto mt-20" />

      <!-- CTA Button -->
      <div class="text-center mt-20">
        <a
          href="/reservation"
          class="inline-block bg-yellow-500 hover:bg-yellow-600 focus:ring-4 focus:ring-yellow-300 text-black font-bold text-lg px-10 py-4 rounded-full shadow-lg transition transform hover:-translate-y-1 active:scale-95"
          role="button"
          aria-label="Booking Sekarang"
        >
          Booking Sekarang
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import ServicesSection from '@/components/client/home/ServicesPriceSection.vue'
</script>
