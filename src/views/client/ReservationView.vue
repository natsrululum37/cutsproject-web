<template>
  <div class="min-h-screen bg-black">
    <section class="py-12 sm:py-16 px-4 md:px-8 max-w-2xl mx-auto text-white">
      <div class="text-center mb-10">
        <h1 class="text-3xl sm:text-4xl font-bold mb-3 text-yellow-400 drop-shadow-md">Reservasi</h1>
        <p class="text-gray-400 text-base sm:text-lg max-w-xl mx-auto">
          Isi formulir berikut untuk melakukan reservasi layanan di CutsProject. Kami akan menghubungi Anda melalui WhatsApp untuk konfirmasi.
        </p>
      </div>

      <div class="bg-zinc-900 rounded-xl p-6 sm:p-8 shadow-xl border border-zinc-800 fade-up-reservation">
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
              <input
                type="text"
                v-model="form.name"
                name="name"
                class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                required
                autocomplete="name"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
              <input
                type="tel"
                v-model="form.whatsapp"
                name="whatsapp"
                class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
                required
                autocomplete="tel"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-2">Tanggal</label>
      <input
        type="date"
        v-model="form.date"
        name="date"
        class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
        required
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-300 mb-2">Waktu</label>
      <select
        v-model="form.time"
        name="time"
        class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
        required
      >
        <option value="">Pilih Waktu</option>
        <option v-for="time in availableTimes" :key="time" :value="time">
          {{ time }}
        </option>
      </select>
    </div>
  </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Layanan</label>
            <select
              v-model="form.serviceId"
              name="service"
              class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
              required
            >
              <option value="">Pilih Layanan</option>
              <option v-for="service in services" :key="service.id" :value="service.id">
                {{ service.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Catatan (opsional)</label>
            <textarea
              v-model="form.notes"
              name="notes"
              rows="3"
              class="w-full px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            ></textarea>
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
            >
              Buat Reservasi
            </button>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<!-- <script setup>
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
</script> -->
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const toast = useToast()

const form = ref({
  name: '',
  whatsapp: '',
  date: '',
  time: '',
  serviceId: '',
  notes: '',
})

const services = ref([])
const availableTimes = [
  '10:00', '11:00', '12:00', '13:00', '14:00',
  '15:00', '16:00', '17:00', '18:00', '19:00',
]

// Ambil daftar layanan dari backend
const fetchServices = async () => {
  try {
    const res = await axios.get('http://localhost:3000/api/services')
    services.value = res.data
  } catch (e) {
    console.error('Gagal mengambil daftar layanan:', e)
    toast.error('Gagal mengambil daftar layanan')
  }
}

onMounted(() => {
  fetchServices()
})

// watch([() => form.value.date, () => form.value.serviceId], fetchAvailableTimes)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.whatsapp || !form.value.date || !form.value.time || !form.value.serviceId) {
    toast.error('Semua field wajib diisi')
    return
  }

  // Data untuk backend
  const payload = {
    name: form.value.name,
    phone: form.value.whatsapp,
    date: form.value.date,
    time: form.value.time,
    serviceId: form.value.serviceId,
    notes: form.value.notes,
  }

  // Data untuk Formspree
  const formData = new URLSearchParams()
  formData.append('name', form.value.name)
  formData.append('whatsapp', form.value.whatsapp)
  formData.append('date', form.value.date)
  formData.append('time', form.value.time)
  // Kirim nama layanan, bukan ID, ke Formspree
  const selectedService = services.value.find(s => s.id == form.value.serviceId)
  formData.append('service', selectedService ? selectedService.name : '')
  formData.append('notes', form.value.notes)

  let backendSuccess = false
  let formspreeSuccess = false

  try {
    // Kirim ke backend
    const resBackend = await axios.post('http://localhost:3000/api/bookings', payload)
    if (resBackend.status === 201) backendSuccess = true
  } catch (error) {
    toast.error('Gagal menyimpan reservasi ke database')
    console.error(error)
  }

  try {
    // Kirim ke Formspree
    const resFormspree = await axios.post('https://formspree.io/f/mnnvzkwn', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    if (resFormspree.status === 200 || resFormspree.status === 202) formspreeSuccess = true
  } catch (error) {
    toast.error('Gagal mengirim reservasi ke Formspree')
    console.error(error)
  }

  if (backendSuccess && formspreeSuccess) {
    toast.success('Reservasi berhasil dikirim ke database & email 🎉')
    form.value = {
      name: '',
      whatsapp: '',
      date: '',
      time: '',
      serviceId: '',
      notes: '',
    }
    availableTimes.value = []
  } else if (backendSuccess) {
    toast.warning('Reservasi hanya tersimpan di database, gagal kirim ke email')
  } else if (formspreeSuccess) {
    toast.warning('Reservasi hanya terkirim ke email, gagal simpan ke database')
  }
}
</script>

<style scoped>
.fade-up-reservation {
  opacity: 0;
  transform: translateY(40px) scale(0.98);
  animation: fadeUpReservation 0.7s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: 0.15s;
}
@keyframes fadeUpReservation {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>


