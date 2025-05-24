<template>
  <section class="bg-black text-white py-16">
    <!-- Informasi Kontak -->
    <div class="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 items-start" data-aos="fade-up">
      <!-- Alamat -->
      <div>
        <h4 class="text-white font-bold text-xl mb-2 border-b-4 border-yellow-400 inline-block">Alamat</h4>
        <p class="mt-4 text-gray-300">
          Jl. Jend. Sudirman, Sidomulyo, Sragen Wetan,<br />
          Kec. Sragen, Kabupaten Sragen,<br />
          Jawa Tengah 57214
        </p>
      </div>

      <!-- Hubungi Kami -->
      <div>
        <h4 class="text-white font-bold text-xl mb-2 border-b-4 border-yellow-400 inline-block">Hubungi kami</h4>
        <ul class="mt-4 space-y-3 text-gray-300">
          <li>
            <a
              href="https://www.instagram.com/cutsproject"
              target="_blank"
              class="group flex items-center space-x-3 hover:text-yellow-400 transition"
            >
              <font-awesome-icon :icon="['fab', 'instagram']" />
              <span>@cutsproject</span>
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/6281567825713"
              target="_blank"
              class="group flex items-center space-x-3 hover:text-yellow-400 transition"
            >
              <font-awesome-icon :icon="['fab', 'whatsapp']" />
              <span>081567825713</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.tiktok.com/@cutsproject"
              target="_blank"
              class="group flex items-center space-x-3 hover:text-yellow-400 transition"
            >
              <font-awesome-icon :icon="['fab', 'tiktok']" />
              <span>cutsprojectofficial</span>
            </a>
          </li>
        </ul>
      </div>

      <!-- Map -->
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.5937999999997!2d111.5322504!3d-7.9371239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79bc1ea2e3c401%3A0x3f20a14940475a0e!2sBarbershop%20Cuts%20Project!5e0!3m2!1sid!2sid!4v1716537999999"
          width="100%"
          height="200"
          style="border:0;"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  </section>

  <!-- Form Kontak -->
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
  // Simulasi kirim pesan
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