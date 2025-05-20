import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import AOS from 'aos'
import 'aos/dist/aos.css'
// Font Awesome setup
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faInstagram, faWhatsapp, faTiktok } from '@fortawesome/free-brands-svg-icons'

library.add(faInstagram, faWhatsapp, faTiktok)
const app = createApp(App)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
AOS.init({
  once: true, // animasi hanya jalan sekali
})
