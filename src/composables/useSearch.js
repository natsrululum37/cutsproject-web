// src/composables/useSearch.js
import {reactive, nextTick } from 'vue'
// import { useRouter } from 'vue-router' // Uncomment if you enable navigation here

export function useSearch(headerState) {
  // const router = useRouter() // Uncomment if you enable navigation here
  let mobileSearchInputRef = null

  // Search state
  const state = reactive({
    query: '',
    isFocused: false,
    isMobileOpen: false,
    terms: [
      'Haircut Pria',
      'Pompadour Style',
      'Fade Haircut',
      'Grooming Janggut',
      'Coloring Rambut',
      'Paket Pengantin',
      'Styling Rambut',
      'Hair Spa Treatment',
    ],
    // Computed inside the reactive object as getter
    get suggestions() {
      if (!state.query) return []
      return state.terms
        .filter((term) => term.toLowerCase().includes(state.query.toLowerCase()))
        .slice(0, 5) // Limit to 5 suggestions
    }
  })

  // Handle search functionality
  const handleSelection = (suggestion) => {
    state.query = suggestion
    // Here you would typically navigate to search results page
    // router.push({ name: 'search-results', query: { q: state.query } }) // Uncomment and use router if needed
    state.isMobileOpen = false
  }

  const clearSearch = () => {
    state.query = ''
  }

  const toggleMobileSearch = () => {
    state.isMobileOpen = !state.isMobileOpen

    if (headerState.isOpen && state.isMobileOpen) {
      headerState.isOpen = false
    }

    // Focus the search input when opening
    if (state.isMobileOpen && mobileSearchInputRef) {
      nextTick(() => {
        mobileSearchInputRef.value?.focus()
      })
    }
  }

  // Set mobile search input reference for focus handling
  const setMobileSearchInput = (inputRef) => {
    mobileSearchInputRef = inputRef
  }

  return reactive({
    state,
    handleSelection,
    clearSearch,
    toggleMobileSearch,
    setMobileSearchInput
  })
}
