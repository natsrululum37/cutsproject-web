<template>
  <section class="bg-[#121212] text-white py-16">
    <div class="max-w-6xl mx-auto px-4 text-center">
      <h2 class="text-3xl font-bold text-yellow-400 mb-8">Cuts Team</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="bg-[#1e1e1e] p-6 rounded-lg shadow-lg hover:shadow-yellow-500/20 transition duration-300"
        >
          <img
            :src="member.image"
            :alt="member.name"
            class="w-32 h-32 mx-auto rounded-full object-cover mb-4"
          />
          <h3 class="text-xl font-semibold text-yellow-300">{{ member.name }}</h3>
          <p class="text-sm text-gray-400">{{ member.role }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const teamMembers = [
  {
    name: 'Anggit',
    role: 'Senior Barber',
    image: new URL('@/assets/images/team/anggit.png', import.meta.url).href,
  },
  {
    name: 'Bima',
    role: 'Stylist',
    image: new URL('@/assets/images/team/bima.png', import.meta.url).href,
  },
  {
    name: 'Edo',
    role: 'Customer Service',
    image: new URL('@/assets/images/team/edo.png', import.meta.url).href,
  },
  // Tambahkan anggota tim lainnya sesuai kebutuhan
]
</script>
