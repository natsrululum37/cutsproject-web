<!-- ErrorBoundary.vue - Component Error Handling -->
<template>
  <div class="error-boundary">
    <div
      v-if="hasError"
      class="error-container bg-red-900/20 border border-red-500/30 rounded-lg p-6 m-4"
    >
      <div class="flex items-center mb-4">
        <ExclamationTriangleIcon class="h-8 w-8 text-red-400 mr-3" />
        <h2 class="text-xl font-semibold text-red-400">Something went wrong</h2>
      </div>

      <p class="text-gray-300 mb-4">
        We're sorry, but there was an error loading this component. Please try refreshing the page.
      </p>

      <details v-if="errorInfo && isDevelopment" class="mb-4">
        <summary class="cursor-pointer text-yellow-400 hover:text-yellow-300 mb-2">
          Show Error Details (Development Mode)
        </summary>
        <div
          class="bg-black/50 p-4 rounded border text-sm font-mono text-gray-300 overflow-auto max-h-48"
        >
          <p class="text-red-400 font-semibold mb-2">Error: {{ errorInfo.message }}</p>
          <pre class="whitespace-pre-wrap">{{ errorInfo.stack }}</pre>
        </div>
      </details>

      <div class="flex gap-3">
        <button
          @click="retry"
          class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          Try Again
        </button>
        <button
          @click="goHome"
          class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          Go Home
        </button>
      </div>
    </div>

    <slot v-else />
  </div>
</template>

<script setup>
import { ref, onErrorCaptured, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['error', 'retry'])
const router = useRouter()

const hasError = ref(false)
const errorInfo = ref(null)
const isDevelopment = ref(import.meta.env.DEV)

// Capture errors from child components
onErrorCaptured((error, instance, info) => {
  hasError.value = true
  errorInfo.value = {
    message: error.message,
    stack: error.stack,
    info: info,
  }

  // Emit error for parent components or analytics
  emit('error', { error, instance, info })

  // Log error in development
  if (isDevelopment.value) {
    console.error('ErrorBoundary caught an error:', error)
    console.error('Component stack:', info)
  }

  // Prevent error from propagating
  return false
})

const retry = () => {
  hasError.value = false
  errorInfo.value = null
  emit('retry')
}

const goHome = () => {
  router.push('/')
}
</script>

<style scoped>
.error-boundary {
  min-height: 200px;
}

.error-container {
  max-width: 600px;
  margin: 0 auto;
}

details > summary {
  list-style: none;
}

details > summary::-webkit-details-marker {
  display: none;
}

details[open] > summary::after {
  content: ' ▼';
}

details:not([open]) > summary::after {
  content: ' ▶';
}
</style>
