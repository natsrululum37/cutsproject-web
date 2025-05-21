<template>
  <!-- Form -->
  <div class="max-w-3xl mx-auto px-6 py-16">
    <h3 class="text-2xl font-semibold mb-6 text-center">Tinggalkan Pesan Disini</h3>
    <form class="space-y-4">
      <input
        type="text"
        placeholder="Nama Anda"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
      />
      <input
        type="email"
        placeholder="Email"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
      />
      <input
        type="tel"
        placeholder="No. WhatsApp"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
      />
      <textarea
        rows="4"
        placeholder="Pesan Anda"
        class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
      ></textarea>
      <button
        type="submit"
        class="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition font-semibold"
      >
        Kirim Pesan
      </button>
    </form>
  </div>
</template>
