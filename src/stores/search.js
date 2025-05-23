import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    isFocused: false,
  }),
  actions: {
    setQuery(val) {
      this.query = val
    },
    setFocused(val) {
      this.isFocused = val
    },
    performSearch() {
    },
  },
})
