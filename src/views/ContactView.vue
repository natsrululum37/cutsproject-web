<template>
  <!-- Form -->
  <div class="max-w-3xl mx-auto px-6 py-16" data-aos="fade-up">
    <h3
      class="text-2xl font-semibold mb-6 text-center"
      data-aos="fade-up"
      data-aos-delay="100"
    >
      Tinggalkan Pesan Disini
    </h3>
    <form class="space-y-4" data-aos="fade-up" data-aos-delay="200">
      <input
        type="text"
        placeholder="Nama Anda"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
        data-aos="fade-up"
        data-aos-delay="300"
      />
      <input
        type="email"
        placeholder="Email"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
        data-aos="fade-up"
        data-aos-delay="400"
      />
      <input
        type="tel"
        placeholder="No. WhatsApp"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
        data-aos="fade-up"
        data-aos-delay="500"
      />
      <textarea
        rows="4"
        placeholder="Pesan Anda"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
        data-aos="fade-up"
        data-aos-delay="600"
      ></textarea>
      <button
        type="submit"
        class="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition font-semibold"
        data-aos="fade-up"
        data-aos-delay="700"
      >
        Kirim Pesan
      </button>
    </form>
  </div>
</template>
