<template>
  <div class="max-w-6xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold text-yellow-400 mb-8">Cuts Team</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(member, index) in team"
        :key="index"
        class="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 group"
      >
        <div class="aspect-square overflow-hidden">
          <img
            :src="member.image"
            :alt="member.nama"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            @error="handleImgError"
          />
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-semibold mb-1 text-white">{{ member.nama }}</h3>
          <p class="text-sm text-gray-300 mb-1">{{ member.nim }}</p>
          <p class="text-yellow-400 text-sm mb-3">{{ member.peran }}</p>
          <p class="text-gray-400 text-sm">{{ member.tugas }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL
const team = [
  {
    nama: 'Ahmad Natsrul Ulum',
    nim: '23.11.5524',
    peran: 'Frontend, Backend',
    tugas: 'Homepage, Header, Navbar, Store',
    image: baseUrl + '/images/team/arul.webp',
  },
  {
    nama: 'Zulfa Meydita Rahma',
    nim: '23.11.5512',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'About, Team, Footer, Design Figma',
    image: baseUrl + '/images/team/ulpa.webp',
  },
  {
    nama: 'Anung Binartanto',
    nim: '23.11.5520',
    peran: 'Frontend',
    tugas: 'Booking',
    image: baseUrl + '/images/team/anung.webp',
  },
  {
    nama: 'Eria Syalwa',
    nim: '23.11.5535',
    peran: 'Frontend',
    tugas: 'Kontak',
    image: baseUrl + '/images/team/eria.webp',
  },
  {
    nama: 'Agi Muhammad Tengku Aqamaddin',
    nim: '23.11.5518',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Ulasan, Design Figma',
    image: baseUrl + '/images/team/agi.webp',
  },
  {
    nama: 'Cleova Calista Aziza Kayviar',
    nim: '23.11.5532',
    peran: 'Frontend',
    tugas: 'Layanan',
    image: baseUrl + '/images/team/cleo.webp',
  },
  {
    nama: 'Arya Kusuma Wijaya',
    nim: '23.11.5554',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Galeri, Design Figma',
    image: baseUrl + '/images/team/arya.webp',
  },
]
</script>
