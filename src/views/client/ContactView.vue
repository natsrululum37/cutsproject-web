<template>
  <div class="min-h-screen bg-black">
    <!-- Informasi Kontak -->
    <section class="view-section text-white py-16">
      <div class="grid md:grid-cols-3 gap-10 items-start" data-aos="fade-up">
        <!-- Alamat -->
        <div>
          <h4 class="text-white font-bold text-xl mb-2 border-b-4 border-yellow-400 inline-block">
            Alamat
          </h4>
          <p class="mt-4 text-gray-300">
            Jl. Jend. Sudirman, Sidomulyo, Sragen Wetan,<br />
            Kec. Sragen, Kabupaten Sragen,<br />
            Jawa Tengah 57214
          </p>
        </div>

        <!-- Hubungi Kami -->
        <div>
          <h4 class="text-white font-bold text-xl mb-2 border-b-4 border-yellow-400 inline-block">
            Hubungi kami
          </h4>
          <ul class="mt-4 space-y-3 text-gray-300">
            <li v-for="(social, platform) in socials" :key="platform">
              <a
                :href="social.url"
                target="_blank"
                class="group flex items-center space-x-3 hover:text-yellow-400 transition"
              >
                <font-awesome-icon :icon="social.icon" class="text-xl" />
                <span>{{ social.name }}</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Map -->
        <div class="w-full aspect-video overflow-hidden rounded">
          <iframe
            class="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.5937999999997!2d111.5322504!3d-7.9371239!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e79bc1ea2e3c401%3A0x3f20a14940475a0e!2sBarbershop%20Cuts%20Project!5e0!3m2!1sid!2sid!4v1716537999999"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="max-w-2xl mx-auto mt-16 pt-16 border-t border-zinc-800" data-aos="fade-up" ref="formSection">
    <h2 class="text-2xl font-bold text-center mb-8">Kirim Pesan</h2>

    <div v-if="formSuccess" class="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
      <p class="text-green-400 text-center">
        Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.
      </p>
    </div>
    <div v-if="formError" class="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
      <p class="text-red-400 text-center">{{ formError }}</p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="space-y-6"
      :class="{ 'opacity-50 pointer-events-none': submitted }"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Nama -->
        <div>
          <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nama</label>
          <input
            id="name"
            v-model="name"
            type="text"
            required
            minlength="3"
            class="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            :class="{ 'border-red-500': v$.name.$error }"
          />
          <p v-if="v$.name.$error" class="mt-1 text-sm text-red-400">Nama minimal 3 karakter</p>
        </div>

        <!-- WhatsApp -->
        <div>
          <label for="whatsapp" class="block text-sm font-medium text-gray-300 mb-2">WhatsApp</label>
          <input
            id="whatsapp"
            v-model="whatsapp"
            type="tel"
            required
            pattern="[0-9]*"
            minlength="10"
            class="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
            :class="{ 'border-red-500': v$.whatsapp.$error }"
          />
          <p v-if="v$.whatsapp.$error" class="mt-1 text-sm text-red-400">Nomor WhatsApp tidak valid</p>
        </div>
      </div>

      <!-- Email -->
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-2">Email</label>
        <input
          id="email"
          v-model="emailAddress"
          type="email"
          required
          class="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          :class="{ 'border-red-500': v$.email.$error }"
        />
        <p v-if="v$.email.$error" class="mt-1 text-sm text-red-400">Email tidak valid</p>
      </div>

      <!-- Pesan -->
      <div>
        <label for="message" class="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
        <textarea
          id="message"
          v-model="message"
          rows="4"
          required
          minlength="10"
          class="w-full px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-lg text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400"
          :class="{ 'border-red-500': v$.message.$error }"
        ></textarea>
        <p v-if="v$.message.$error" class="mt-1 text-sm text-red-400">Pesan minimal 10 karakter</p>
      </div>

      <!-- Tombol -->
      <div class="text-center">
        <button
          type="submit"
          :disabled="submitted || v$.$invalid"
          class="px-8 py-3 bg-yellow-500 text-black font-semibold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
        >
          <span :class="{ invisible: submitted }">Kirim Pesan</span>
          <div v-if="submitted" class="absolute inset-0 flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          </div>
        </button>
      </div>
    </form>
  </div>
    </section>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
// import { useSocialStore } from '@/stores/client/social'
import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'
import axios from 'axios'
import { helpers } from '@vuelidate/validators'

const name = ref('')
const whatsapp = ref('')
const emailAddress = ref('')
const message = ref('')
const submitted = ref(false)
const formSuccess = ref(false)
const formError = ref('')
const isPhone = helpers.regex(/^[0-9]{10,15}$/)
const formSection = ref(null)
const toast = useToast()

const scrollToAlert = () => {
  setTimeout(() => {
    formSection.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 200)
}

const rules = {
  name: { required, minLength: minLength(3) },
  whatsapp: { required, isPhone },
  email: { required, email },
  message: { required, minLength: minLength(10) },
}

const v$ = useVuelidate(rules, { name, whatsapp, email: emailAddress, message })

const handleSubmit = async () => {
  v$.value.$touch()
  if (v$.value.$invalid) return

  submitted.value = true
  formError.value = ''
  try {
    await axios.post('https://formspree.io/f/xgvyzjld', {
      name: name.value,
      whatsapp: whatsapp.value,
      email: emailAddress.value,
      message: message.value,
    })

    formSuccess.value = true
    toast.success('Pesan berhasil dikirim!')

    // Reset form
    name.value = ''
    whatsapp.value = ''
    emailAddress.value = ''
    message.value = ''
    v$.value.$reset()
  } catch (err) {
    console.error(err)
    formError.value = 'Gagal mengirim pesan. Silakan coba lagi.'
    toast.error('Gagal mengirim pesan.')
  } finally {
    submitted.value = false
    scrollToAlert()
  }
}

// const name = ref('')
// const emailAddress = ref('')
// const whatsapp = ref('')
// const message = ref('')
// const submitted = ref(false)
// const formSuccess = ref(false)
// const formError = ref('')

// const socialStore = useSocialStore()
// const socials = computed(() => socialStore.getAllSocials)

// const rules = {
//   name: { required, minLength: minLength(3) },
//   email: { required, email },
//   whatsapp: {
//     required,
//     validPhone: helpers.regex(/^[0-9]{10,}$/),
//   },
//   message: { required, minLength: minLength(10) },
// }

// const v$ = useVuelidate(rules, {
//   name,
//   email: emailAddress,
//   whatsapp,
//   message,
// })

// const handleSubmit = async () => {
//   formError.value = ''

//   const isValid = await v$.value.$validate()
//   if (!isValid) return

//   try {
//     submitted.value = true
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))

//     formSuccess.value = true
//     v$.value.$reset()
//     name.value = ''
//     emailAddress.value = ''
//     whatsapp.value = ''
//     message.value = ''

//     setTimeout(() => {
//       formSuccess.value = false
//     }, 5000)
//   } catch {
//     formError.value =
//       'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami melalui WhatsApp.'
//     setTimeout(() => {
//       formError.value = ''
//     }, 5000)
//   } finally {
//     submitted.value = false
//   }
// }
</script>
