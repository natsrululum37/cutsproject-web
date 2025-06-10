<template>
  <section class="view-section section-content" aria-label="Lokasi Cabang Barbershop">
    <div class="flex flex-col items-center">
      <div class="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div
          class="bg-yellow-400 text-black rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-lg sm:text-xl font-extrabold shadow-lg"
        >
          <span>4+</span>
        </div>
        <div>
          <h2 class="text-xl sm:text-2xl font-semibold text-white" tabindex="0">Lokasi</h2>
          <div class="text-xs text-gray-400 -mt-1">Di Semarang</div>
        </div>
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base text-gray-300 text-center mt-3 sm:mt-4 w-full max-w-2xl"
      >
        <div
          v-for="branch in branches"
          :key="branch.name"
          class="bg-zinc-900 border border-zinc-800 rounded-lg p-3 sm:p-4"
        >
          <span>{{ branch.name }} - {{ branch.address }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useBusinessStore } from '@/stores/business'

const businessStore = useBusinessStore()
const branches = computed(() => businessStore.getBranches)
</script>

<style scoped>
.view-section {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.location-section {
  padding-top: 1rem !important;
}

@media (max-width: 640px) {
  .view-section {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
  }
  .location-section .bg-zinc-900 {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  .location-section .flex.items-center.gap-3.mb-4 {
    flex-direction: column;
    gap: 0.5rem;
  }
}
</style>
