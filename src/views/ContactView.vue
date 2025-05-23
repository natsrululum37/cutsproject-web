<template>
  <section>
    <div class="max-w-3xl mx-auto px-6 py-16" data-aos="fade-up">
      <h3 class="text-2xl font-semibold mb-6 text-center" data-aos="fade-up" data-aos-delay="100">
        Tinggalkan Pesan Disini
      </h3>
      <form class="space-y-4" data-aos="fade-up" data-aos-delay="200" @submit.prevent="handleSubmit">
        <input
          v-model="name"
          type="text"
          placeholder="Nama Anda"
          class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          data-aos="fade-up"
          data-aos-delay="300"
        />
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          data-aos="fade-up"
          data-aos-delay="400"
        />
        <input
          v-model="whatsapp"
          type="tel"
          placeholder="No. WhatsApp"
          class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          data-aos="fade-up"
          data-aos-delay="500"
        />
        <textarea
          v-model="message"
          rows="4"
          placeholder="Pesan Anda"
          class="w-full p-3 bg-gray-800 border border-gray-500 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
          data-aos="fade-up"
          data-aos-delay="600"
        ></textarea>
        <button
          type="submit"
          class="bg-yellow-400 text-black px-6 py-2 rounded hover:bg-yellow-500 transition font-semibold"
          data-aos="fade-up"
          data-aos-delay="700"
        >
          Kirim Pesan
        </button>
      </form>
      <p v-if="submitted" class="mt-6 text-green-400 text-center">Pesan berhasil dikirim!</p>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const name = ref('')
const email = ref('')
const whatsapp = ref('')
const message = ref('')
const submitted = ref(false)

const handleSubmit = () => {
  // Simulasi submit, ganti dengan logic kirim data ke backend jika diperlukan
  submitted.value = true
  setTimeout(() => {
    submitted.value = false
    name.value = ''
    email.value = ''
    whatsapp.value = ''
    message.value = ''
  }, 3000)
}
</script>
