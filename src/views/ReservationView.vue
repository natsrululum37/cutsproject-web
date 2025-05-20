<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Judul -->
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold mb-4">Reservasi Online</h2>
        <p class="text-gray-400 text-lg">Pesan jadwal potong rambut Anda dengan mudah dan cepat.</p>
      </div>

      <!-- Form Reservasi -->
      <form class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-yellow-400 p-8 rounded-lg shadow-lg">
        <div class="col-span-1">
          <label class="block mb-1">Nama Lengkap</label>
          <input
            type="text"
            placeholder="Masukkan nama Anda"
            class="w-full p-3 rounded bg-black text-white focus:outline-none"
          />
        </div>
        <div class="col-span-1">
          <label class="block mb-1">Nomor Telepon</label>
          <input
            type="tel"
            placeholder="+62..."
            class="w-full p-3 rounded bg-black text-white focus:outline-none"
          />
        </div>
        <div class="col-span-1">
          <label class="block mb-1">Tanggal</label>
          <input type="date" class="w-full p-3 rounded bg-black text-white focus:outline-none" />
        </div>
        <div class="col-span-1">
          <label class="block mb-1">Waktu</label>
          <input type="time" class="w-full p-3 rounded bg-black text-white focus:outline-none" />
        </div>
        <div class="col-span-2">
          <label class="block mb-1">Pilih Layanan</label>
          <select class="w-full p-3 rounded bg-black text-white focus:outline-none">
            <option>Haircut</option>
            <option>Shaving</option>
            <option>Hair Coloring</option>
            <option>Facial</option>
            <option>Package (Cut + Shave)</option>
          </select>
        </div>
        <div class="col-span-2">
          <label class="block mb-1">Catatan Tambahan</label>
          <textarea
            rows="3"
            placeholder="Tuliskan permintaan khusus jika ada..."
            class="w-full p-3 rounded bg-black text-white focus:outline-none"
          ></textarea>
        </div>
        <div class="col-span-2 text-center">
          <button
            type="submit"
            class="bg-black text-white px-8 py-3 rounded font-semibold hover:bg-yellow-500 transition"
          >
            Kirim Reservasi
          </button>
        </div>
      </form>
    </div>
  </section>
</template>
