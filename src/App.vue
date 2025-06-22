<template>
  <div class="app-wrapper">
    <Header v-if="showHeaderFooter" />
    <main class="flex-1 flex flex-col">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './components/client/layouts/HeaderComponent.vue'
import Footer from './components/client/layouts/FooterComponent.vue'

const route = useRoute()

// Navbar/footer user hanya tampil jika BUKAN di /admin
const showHeaderFooter = computed(() => !route.path.startsWith('/admin'))
</script>

<style>
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-wrapper main {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
