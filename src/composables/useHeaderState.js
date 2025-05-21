// src/composables/useHeaderState.js
import { ref, reactive } from 'vue'

export function useHeaderState() {
  // State for header component
  const isOpen = ref(false)
  const scrolled = ref(false)

  // Handle scroll tracking
  const handleScroll = () => {
    scrolled.value = window.scrollY > 50
  }

  return reactive({
    isOpen,
    scrolled,
    handleScroll
  })
}
