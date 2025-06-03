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
            :alt="member.name"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            @error="handleImgError"
          />
        </div>
        <div class="p-6 text-center">
          <h3 class="text-xl font-semibold mb-1">{{ member.name }}</h3>
          <p class="text-yellow-400 text-sm mb-3">{{ member.role }}</p>
          <p class="text-gray-400 text-sm">{{ member.experience }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const baseUrl = import.meta.env.BASE_URL
const team = [
  {
    name: 'Anggit Pratama',
    role: 'Senior Barber',
    experience: '8+ tahun pengalaman',
    image: baseUrl + 'images/team/anggit.png',
  },
  {
    name: 'Bima Sakti',
    role: 'Style Specialist',
    experience: '6+ tahun pengalaman',
    image: baseUrl + 'images/team/bima.png',
  },
  {
    name: 'Edo Wijaya',
    role: 'Color Expert',
    experience: '5+ tahun pengalaman',
    image: baseUrl + 'images/team/edo.png',
  },
  {
    name: 'Tyo Nugraha',
    role: 'Master Barber',
    experience: '7+ tahun pengalaman',
    image: baseUrl + 'images/team/tyo.png',
  },
]
</script>
