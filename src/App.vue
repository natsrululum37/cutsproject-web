<template>
  <div class="app-wrapper">
    <Header v-if="showHeaderFooter" />
    <main>
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer v-if="showHeaderFooter" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/layouts/HeaderComponent.vue'
import Footer from './components/layouts/FooterComponent.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const route = useRoute()

const showHeaderFooter = ref(true)
watch(
  () => route.meta,
  (meta) => {
    showHeaderFooter.value = meta?.layout !== 'minimal'
  },
  { immediate: true },
)

// Initialize AOS
onMounted(() => {
  AOS.init({
    duration: 800,
    once: true,
    mirror: false,
    easing: 'ease-in-out',
    offset: 60,
  })
})
</script>
