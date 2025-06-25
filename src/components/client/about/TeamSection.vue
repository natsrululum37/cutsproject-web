<template>
  <div class="max-w-6xl mx-auto px-4 text-center">
    <h2 class="text-3xl font-bold text-yellow-400 mb-8">CUTS TEAM</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      <div
        v-for="(member, index) in team"
        :key="member.id || index"
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
    <div v-if="loading" class="text-yellow-400 mt-8">Memuat data tim...</div>
    <div v-if="error" class="text-red-400 mt-8">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const team = ref([])
const loading = ref(true)
const error = ref(null)

const handleImgError = (e) => {
  e.target.src = '/images/team/default.webp'
}

const fetchTeam = async () => {
  loading.value = true
  error.value = null
  try {
    const res = await axios.get('/api/team', { params: { limit: 20 } })
    // Jika backend return { data: [...] }
    team.value = Array.isArray(res.data.data) ? res.data.data : res.data
  } catch (err) {
    error.value = err.response?.data?.error || 'Gagal memuat data tim'
  } finally {
    loading.value = false
  }
}

onMounted(fetchTeam)
</script>
