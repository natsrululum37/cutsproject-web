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
                  name="name"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">WhatsApp</span>
                <input
                  type="tel"
                  v-model="form.whatsapp"
                  name="whatsapp"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">Tanggal</span>
                <input
                  type="date"
                  v-model="form.date"
                  name="date"
                  class="mt-1 block w-full rounded-lg bg-zinc-800 border-zinc-700 text-white"
                  required
                />
              </label>

              <label class="block">
                <span class="text-white">Waktu</span>
                <select
                  v-model="form.time"
                  name="time"
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
                  name="service"
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
                  name="notes"
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
import axios from 'axios'
import { useToast } from 'vue-toastification' 

const toast = useToast()

const form = ref({
  name: '',
  whatsapp: '',
  date: '',
  time: '',
  service: '',
  notes: '',
})

const availableTimes = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
]

const services = [
  'Haircut Classic',
  'Haircut + Wash',
  'Hair Coloring',
  'Beard Trim',
  'Full Package (Haircut + Wash + Styling)',
]

const handleSubmit = async () => {
  const formData = new URLSearchParams()
  formData.append('name', form.value.name)
  formData.append('whatsapp', form.value.whatsapp)
  formData.append('date', form.value.date)
  formData.append('time', form.value.time)
  formData.append('service', form.value.service)
  formData.append('notes', form.value.notes)

  try {
    const response = await axios.post('https://formspree.io/f/mnnvzkwn', formData, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    // status 200 = OK atau 202 = Accepted
    if (response.status === 200 || response.status === 202) {
      toast.success('Reservasi berhasil dikirim 🎉')
      form.value = {
        name: '',
        whatsapp: '',
        date: '',
        time: '',
        service: '',
        notes: '',
      }
    } else {
      toast.warning('Reservasi terkirim tapi respon server tidak sesuai 😐')
      console.warn(response)
    }
  } catch (error) {
    console.error(error)
    toast.error('Gagal mengirim reservasi 😢 Cek koneksi atau endpoint kamu!')
  }
}
</script>


