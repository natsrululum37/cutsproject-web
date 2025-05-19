<template>
  <div class="bg-black text-white font-sans">
    <!-- Hero Section -->
    <section class="relative h-screen bg-cover bg-center" style="background-image: url('/hero.jpg')">
      <div class="absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center text-center p-4">
        <h1 class="text-4xl md:text-6xl font-bold mb-4">CutsProject Barbershop</h1>
        <p class="text-lg md:text-xl mb-6">Barbershop premium untuk pria modern</p>
        <router-link
          to="/reservation"
          class="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition"
        >
          Reservasi Sekarang
        </router-link>
      </div>
    </section>


    <!-- CTA -->
    <section class="py-20 text-center bg-yellow-400 text-black">
      <h2 class="text-3xl font-bold mb-4">Siap Tampil Lebih Ganteng?</h2>
      <p class="mb-6">Booking sekarang dan nikmati pengalaman potong rambut terbaik.</p>
      <a
        href="https://wa.me/6281234567890"
        target="_blank"
        class="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
      >
        Hubungi via WhatsApp
      </a>
    </section>
  </div>
</template>
