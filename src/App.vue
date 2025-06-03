<template>
  <div class="flex flex-col min-h-screen bg-black text-white">
    <Header v-if="showHeaderFooter" />

    <main id="main-content" class="flex-grow w-full px-4 sm:px-8 py-6">
      <!-- RouterView akan mengisi ini -->
      <RouterView v-slot="{ Component, route }">
        <Transition name="fade" mode="out-in">
          <div :key="route.path">
            <component :is="Component" />
          </div>
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

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
