<template>
  <section class="bg-black text-white py-20 px-6">
    <!-- Judul -->
    <div class="max-w-6xl mx-auto text-center mb-12">
      <h2 class="text-4xl font-bold mb-4">Apa Kata Mereka ?</h2>
      <p class="text-gray-400 text-lg">
        Testimoni dari pelanggan setia kami yang puas dengan layanan CutsProject.
      </p>
    </div>

    <!-- List Testimoni -->
    <div class="flex md:grid md:grid-cols-3 gap-6 overflow-x-auto px-1 pb-4">
      <div
        v-for="(testimonial, index) in showAll ? testimonials : testimonials.slice(0, 3)"
        :key="index"
        class="bg-gray-700 p-6 rounded-lg shadow-lg min-w-[280px]"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <p class="text-gray-300 mb-4 italic">"{{ testimonial.text }}"</p>
        <div class="flex items-center gap-3">
          <img
            :src="testimonial.photo"
            alt="Foto"
            class="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h4 class="font-semibold">{{ testimonial.name }}</h4>
            <p class="text-sm text-gray-400">{{ testimonial.role }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol Toggle -->
    <div class="text-center mt-8">
      <button
        @click="showAll = !showAll"
        class="text-yellow-400 font-semibold hover:underline transition"
      >
        {{ showAll ? 'Sembunyikan' : 'Lihat Selengkapnya' }}
      </button>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const showAll = ref(false)

const testimonials = [
  {
    name: 'Rizky Fadillah',
    role: 'Pelanggan Tetap',
    text: 'Potongannya selalu rapi dan sesuai request. Tempatnya nyaman, pelayanannya top!',
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Andi Saputra',
    role: 'Model Freelance',
    text: 'Barbernya ramah dan tahu gaya kekinian. Recommended banget! Selalu setia potong sama mas Titis.',
    photo: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    name: 'Fajar Hidayat',
    role: 'Karyawan Swasta',
    text: 'Sudah langganan dari lama, hasilnya selalu memuaskan. Kalian wajib kesini! Dijamin ngga nyesel.',
    photo: 'https://randomuser.me/api/portraits/men/60.jpg',
  },
  {
    name: 'Yoga Prasetya',
    role: 'Mahasiswa',
    text: 'Pelayanan cepat dan hasil potongannya keren. Cocok banget buat mahasiswa seperti saya.',
    photo: 'https://randomuser.me/api/portraits/men/65.jpg',
  },
  {
    name: 'Ari Wibowo',
    role: 'Content Creator',
    text: 'Tempatnya instagramable, hasil potongannya pas banget buat konten. Suka banget!',
    photo: 'https://randomuser.me/api/portraits/men/27.jpg',
  },
  {
    name: 'Dimas Ramadhan',
    role: 'Entrepreneur',
    text: 'Pelayanan cepat, rapi, dan nyaman. Cocok buat kamu yang sibuk dan tetap ingin tampil oke.',
    photo: 'https://randomuser.me/api/portraits/men/21.jpg',
  },
  {
    name: 'Reza Maulana',
    role: 'Graphic Designer',
    text: 'Gaya potongan sesuai tren! Barbershop ini tahu cara memanjakan pelanggannya.',
    photo: 'https://randomuser.me/api/portraits/men/51.jpg',
  },
  {
    name: 'Rendy Kurniawan',
    role: 'Videografer',
    text: 'Sudah beberapa kali ke sini, hasilnya selalu konsisten dan memuaskan!',
    photo: 'https://randomuser.me/api/portraits/men/38.jpg',
  },
  {
    name: 'Ilham Saputra',
    role: 'Sales Executive',
    text: 'Kesan pertama luar biasa. Sekarang jadi langganan tetap. Thanks CutsProject!',
    photo: 'https://randomuser.me/api/portraits/men/58.jpg',
  },
  {
    name: 'Alfan Nugraha',
    role: 'Guru Bahasa Inggris',
    text: 'Bukan cuma potong rambut, tapi juga pengalaman menyenangkan setiap datang.',
    photo: 'https://randomuser.me/api/portraits/men/43.jpg',
  },
  {
    name: 'Steven Hartono',
    role: 'Konsultan',
    text: 'Tepat waktu, hasil profesional, dan suasananya bikin betah!',
    photo: 'https://randomuser.me/api/portraits/men/12.jpg',
  },
  {
    name: 'Bayu Aditya',
    role: 'Dokter Gigi',
    text: 'Mereka benar-benar peduli dengan detail. Sangat puas dengan hasil akhirnya.',
    photo: 'https://randomuser.me/api/portraits/men/19.jpg',
  },
  {
    name: 'Daniel Permadi',
    role: 'Software Engineer',
    text: 'Nyaman, bersih, dan profesional. Suka banget sama vibe-nya!',
    photo: 'https://randomuser.me/api/portraits/men/22.jpg',
  },
]
</script>

<style scoped>
/* Sembunyikan scrollbar horizontal di mobile */
::-webkit-scrollbar {
  display: none;
}
</style>
