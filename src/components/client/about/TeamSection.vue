<template>
  <div class="max-w-6xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold text-yellow-400 mb-8">CUTS TEAM</h2>
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

          <!-- GitHub Link -->
          <a
            :href="member.github"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center justify-center mt-2 hover:opacity-80"
          >
            <!-- GitHub Logo SVG -->
            <svg class="w-5 h-5 text-white mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M12 0C5.372 0 0 5.373 0 12a12 12 0 008.208 11.386c.6.11.82-.26.82-.577v-2.165c-3.338.726-4.033-1.415-4.033-1.415-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.206.085 1.84 1.24 1.84 1.24 1.07 1.832 2.808 1.303 3.492.996.107-.776.42-1.303.763-1.602-2.665-.304-5.466-1.334-5.466-5.932 0-1.31.468-2.38 1.236-3.218-.124-.304-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.49 11.49 0 013.003-.403c1.02.005 2.047.137 3.004.403 2.29-1.553 3.296-1.23 3.296-1.23.653 1.653.242 2.873.12 3.176.77.838 1.234 1.908 1.234 3.218 0 4.61-2.806 5.625-5.48 5.922.43.37.823 1.102.823 2.222v3.293c0 .32.217.694.826.576A12.004 12.004 0 0024 12c0-6.627-5.373-12-12-12z"
              />
            </svg>
            <span class="text-sm text-white">GitHub</span>
          </a>
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
    github: 'https://github.com/natsrululum37',
    image: baseUrl + '/images/team/arul.webp',
  },
  {
    nama: 'Zulfa Meydita Rahma',
    nim: '23.11.5512',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'About, Team, Footer, Design Figma',
    github: 'https://github.com/ulpaav',
    image: baseUrl + '/images/team/ulpa.webp',
  },
  {
    nama: 'Anung Binartanto',
    nim: '23.11.5520',
    peran: 'Frontend',
    tugas: 'Booking, Profile, Dashboard Admin',
    github: 'https://github.com/anungbinartantoo',
    image: baseUrl + '/images/team/anung.webp',
  },
  {
    nama: 'Eria Syalwa',
    nim: '23.11.5535',
    peran: 'Frontend',
    tugas: 'Kontak',
    github: 'https://github.com/eriasy',
    image: baseUrl + '/images/team/eria.webp',
  },
  {
    nama: 'Agi Muhammad Tengku Aqamaddin',
    nim: '23.11.5518',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Ulasan, Design Figma',
    github: 'https://github.com/ATengkuuu',
    image: baseUrl + '/images/team/agi.webp',
  },
  {
    nama: 'Cleova Calista Aziza Kayviar',
    nim: '23.11.5532',
    peran: 'Frontend',
    tugas: 'Layanan',
    github: 'https://github.com/cleovacalista',
    image: baseUrl + '/images/team/cleo.webp',
  },
  {
    nama: 'Arya Kusuma Wijaya',
    nim: '23.11.5554',
    peran: 'Frontend, UI/UX Designer',
    tugas: 'Galeri, Design Figma',
    github: 'https://github.com/aryaks10235',
    image: baseUrl + '/images/team/arya.webp',
  },
]
</script>
