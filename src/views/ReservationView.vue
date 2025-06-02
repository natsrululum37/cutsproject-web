<template>
  <section class="bg-black text-white py-20 px-6">
    <div class="max-w-4xl mx-auto">
      <!-- Judul -->
      <div class="text-center mb-12" data-aos="fade-down">
        <h2 class="text-4xl font-bold mb-4">Reservasi Online</h2>
        <p class="text-gray-400 text-lg">Pesan jadwal potong rambut Anda dengan mudah dan cepat.</p>
      </div>

      <!-- Form Reservasi -->
      <form
        class="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-800 p-8 rounded-2xl shadow-xl"
        data-aos="fade-up"
        @submit.prevent="handleSubmit"
      >
        <div class="col-span-1">
          <label class="block mb-2 font-semibold text-gray-200">Nama Lengkap</label>
          <input
            v-model="nama"
            type="text"
            placeholder="Masukkan nama Anda"
            class="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div class="col-span-1">
          <label class="block mb-2 font-semibold text-gray-200">Nomor Telepon</label>
          <input
            v-model="telepon"
            type="tel"
            placeholder="+62..."
            class="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div class="col-span-1">
          <label class="block mb-2 font-semibold text-gray-200">Tanggal</label>
          <input
            v-model="tanggal"
            type="date"
            class="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div class="col-span-1">
          <label class="block mb-2 font-semibold text-gray-200">Waktu</label>
          <input
            v-model="waktu"
            type="time"
            class="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
        </div>

        <div class="col-span-2">
          <label class="block mb-2 font-semibold text-gray-200">Pilih Layanan</label>
          <select
            v-model="layanan"
            class="w-full p-3 rounded-lg bg-black text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          >
            <option value="" disabled>Pilih layanan...</option>
            <option>Haircut</option>
            <option>Shaving</option>
            <option>Hair Coloring</option>
            <option>Facial</option>
            <option>Package (Cut + Shave)</option>
          </select>
        </div>

        <div class="col-span-2">
          <label class="block mb-2 font-semibold text-gray-200">Catatan Tambahan</label>
          <textarea
            v-model="catatan"
            rows="3"
            placeholder="Tuliskan permintaan khusus jika ada..."
            class="w-full p-3 rounded-lg bg-black text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          ></textarea>
        </div>

        <div class="col-span-2 text-center">
          <button
            type="submit"
            class="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
          >
            Kirim Reservasi
          </button>
        </div>
      </form>

      <!-- Notifikasi submit -->
      <div v-if="showSuccess" class="mt-8 text-center">
        <p class="text-green-400 font-semibold">Reservasi berhasil dikirim!</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const nama = ref('')
const telepon = ref('')
const tanggal = ref('')
const waktu = ref('')
const layanan = ref('')
const catatan = ref('')
const showSuccess = ref(false)

onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
  })
})

function handleSubmit() {
  showSuccess.value = true
  // Reset form (opsional, jika ingin reset otomatis setelah submit)
  nama.value = ''
  telepon.value = ''
  tanggal.value = ''
  waktu.value = ''
  layanan.value = ''
  catatan.value = ''
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}
</script>
