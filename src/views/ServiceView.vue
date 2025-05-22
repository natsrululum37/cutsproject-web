<template>
  <section class="bg-black text-white py-24 px-6" id="layanan">
    <div class="max-w-6xl mx-auto text-center mb-20">
      <h2 class="text-4xl md:text-5xl font-bold mb-4">Layanan Kami</h2>
      <p class="text-gray-400 text-lg max-w-2xl mx-auto">
        Dapatkan layanan grooming premium dengan barber berpengalaman, suasana nyaman, dan produk berkualitas tinggi.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
      <!-- Haircut -->
      <div
        class="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-8 text-center hover:scale-105 hover:border-white transition duration-300"
        data-aos="fade-up"
      >
        <div class="w-16 h-16 mx-auto mb-5 text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 12H9m12 0A9 9 0 1 1 3 12a9 9 0 0 1 18 0z" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Haircut</h3>
        <p class="text-gray-400 text-sm">
          Potongan rambut presisi, baik klasik maupun modern, yang disesuaikan dengan bentuk wajah dan gaya pribadi Anda.
        </p>
      </div>

      <!-- Shaving -->
      <div
        class="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-8 text-center hover:scale-105 hover:border-white transition duration-300"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div class="w-16 h-16 mx-auto mb-5 text-green-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M3 17l6-6 4 4L21 3" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Shaving</h3>
        <p class="text-gray-400 text-sm">
          Layanan cukur bersih atau trim rapi dengan teknik barber tradisional dan alat higienis.
        </p>
      </div>

      <!-- Hair Coloring -->
      <div
        class="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-8 text-center hover:scale-105 hover:border-white transition duration-300"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div class="w-16 h-16 mx-auto mb-5 text-yellow-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 20h9" />
            <path d="M12 4v16" />
            <path d="M4 4h16" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Hair Coloring</h3>
        <p class="text-gray-400 text-sm">
          Pewarnaan rambut dengan bahan aman dan tahan lama, mulai dari highlight hingga full color.
        </p>
      </div>

      <!-- Facial -->
      <div
        class="bg-gradient-to-b from-gray-900 to-black border border-gray-700 rounded-2xl p-8 text-center hover:scale-105 hover:border-white transition duration-300"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div class="w-16 h-16 mx-auto mb-5 text-pink-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4s-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">Facial</h3>
        <p class="text-gray-400 text-sm">
          Perawatan kulit wajah menggunakan teknik relaksasi dan produk terbaik untuk hasil maksimal.
        </p>
      </div>
    </div>

    <!-- CTA Button -->
    <div class="text-center mt-16">
      <a href="#booking" class="inline-block bg-indigo-600 hover:bg-indigo-700 transition text-white text-lg px-8 py-3 rounded-full shadow-lg">
        Booking Sekarang
      </a>
    </div>
  </section>
</template>
