<template>
  <div class="min-h-screen section-dark">
    <div class="view-section section-spacing-y">
      <div class="container-narrow">
        <h1 class="text-4xl font-bold text-center mb-8" data-aos="fade-up">Reservasi</h1>

        <div class="bg-zinc-900 rounded-xl p-6 md:p-8 shadow-xl border border-zinc-800">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-4">
              <label class="block">
                <span class="text-white">Nama Lengkap</span>
                <input
                  type="text"
                  v-model="form.name"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">WhatsApp</span>
                <input
                  type="tel"
                  v-model="form.whatsapp"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">Tanggal</span>
                <input
                  type="date"
                  v-model="form.date"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">Waktu</span>
                <select
                  v-model="form.time"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                >
                  <option value="">Pilih Waktu</option>
                  <option v-for="time in availableTimes" :key="time" :value="time">
                    {{ time }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="text-white">Layanan</span>
                <select
                  v-model="form.service"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                >
                  <option value="">Pilih Layanan</option>
                  <option v-for="service in services" :key="service" :value="service">
                    {{ service }}
                  </option>
                </select>
              </label>

              <label class="block">
                <span class="text-white">Catatan (opsional)</span>
                <textarea
                  v-model="form.notes"
                  rows="3"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                ></textarea>
              </label>
            </div>

            <div class="text-center">
              <button
                type="submit"
                class="bg-yellow-500 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
              >
                Buat Reservasi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  whatsapp: '',
  date: '',
  time: '',
  service: '',
  notes: '',
})

const availableTimes = [
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
]

const services = [
  'Haircut Classic',
  'Haircut + Wash',
  'Hair Coloring',
  'Beard Trim',
  'Full Package (Haircut + Wash + Styling)',
]

const handleSubmit = () => {
  // Handle form submission
  console.log('Form submitted:', form.value)
}
</script>
