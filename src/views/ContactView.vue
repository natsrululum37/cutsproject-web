<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-5xl mx-auto">
      <!-- Judul -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">Hubungi Kami</h2>
        <p class="text-gray-400 text-lg">Kami siap melayani pertanyaan, reservasi, dan konsultasi Anda.</p>
      </div>

      <!-- Kontak & Form -->
      <div class="grid md:grid-cols-2 gap-12">
        <!-- Informasi Kontak -->
        <div class="space-y-6">
          <div class="flex items-start space-x-4">
            <img src="" alt="WhatsApp" class="w-6 h-6 mt-1" />
            <p>WhatsApp: <a href="https://wa.me/6281390830955" class="text-yellow-400 hover:underline">+62 813-9083-0955</a></p>
          </div>
          <div class="flex items-start space-x-4">
            <img src="" alt="Instagram" class="w-6 h-6 mt-1" />
            <p>Instagram: <a href="https://instagram.com/cutsproject" class="text-yellow-400 hover:underline">@cutsproject</a></p>
          </div>
          <div class="flex items-start space-x-4">
            <img src="" alt="Location" class="w-6 h-6 mt-1" />
            <p>Alamat: Jl. Contoh Raya No.123, Jakarta</p>
          </div>
          <div class="flex items-start space-x-4">
            <img src="" alt="Jam Operasional" class="w-6 h-6 mt-1" />
            <p>Jam Buka: Senin - Sabtu, 10.00 - 20.00 WIB</p>
          </div>
        </div>

        <!-- Form Kontak -->
        <form class="space-y-4">
          <input type="text" placeholder="Nama Anda" class="w-full p-3 rounded bg-gray-800 text-white focus:outline-none" />
          <input type="email" placeholder="Email Anda" class="w-full p-3 rounded bg-gray-800 text-white focus:outline-none" />
          <textarea rows="4" placeholder="Pesan Anda" class="w-full p-3 rounded bg-gray-800 text-white focus:outline-none"></textarea>
          <button type="submit" class="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition">Kirim Pesan</button>
        </form>
      </div>
    </div>
  </section>
</template>
