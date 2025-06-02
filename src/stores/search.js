// stores/search.js
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    isFocused: false,
    searchHistory: [],
    recentSearches: [],
    maxHistoryItems: 10,
  }),

  getters: {
    // Check if search is active
    isSearchActive: (state) => {
      return state.isFocused && state.query.length > 0
    },

    // Get trimmed query
    trimmedQuery: (state) => {
      return state.query.trim().toLowerCase()
    },

    // Check if query is valid for search
    isValidQuery: (state) => {
      return state.query.trim().length > 0
    },

    // Get recent unique searches
    uniqueRecentSearches: (state) => {
      return [...new Set(state.recentSearches)].slice(0, 5)
    },
  },

  actions: {
    setQuery(value) {
      this.query = value || ''
    },

    setFocused(value) {
      this.isFocused = Boolean(value)
    },

    // Clear search
    clearSearch() {
      this.query = ''
      this.isFocused = false
    },

    // Add to search history
    addToHistory(term) {
      if (!term || !term.trim()) return

      const trimmedTerm = term.trim()

      // Remove if already exists
      this.searchHistory = this.searchHistory.filter((item) => item !== trimmedTerm)

      // Add to beginning
      this.searchHistory.unshift(trimmedTerm)

      // Limit history size
      if (this.searchHistory.length > this.maxHistoryItems) {
        this.searchHistory = this.searchHistory.slice(0, this.maxHistoryItems)
      }
    },

    // Add to recent searches
    addToRecentSearches(term) {
      if (!term || !term.trim()) return

      const trimmedTerm = term.trim()

      // Remove if already exists
      this.recentSearches = this.recentSearches.filter((item) => item !== trimmedTerm)

      // Add to beginning
      this.recentSearches.unshift(trimmedTerm)

      // Limit to 10 items
      if (this.recentSearches.length > 10) {
        this.recentSearches = this.recentSearches.slice(0, 10)
      }
    },

    // Perform search with data
    performSearch(searchData, query = null) {
      const term = (query || this.query).trim().toLowerCase()
      if (!term || !searchData?.length) return []

      const results = searchData
        .filter((item) => {
          const nameMatch = item.name?.toLowerCase().includes(term)
          const categoryMatch = item.category?.toLowerCase().includes(term)
          const keywordMatch = item.keywords?.some((k) => k.includes(term))
          return nameMatch || categoryMatch || keywordMatch
        })
        .sort((a, b) => {
          // Prioritize exact matches
          const aExact = a.name?.toLowerCase().startsWith(term)
          const bExact = b.name?.toLowerCase().startsWith(term)
          if (aExact && !bExact) return -1
          if (!aExact && bExact) return 1
          return 0
        })
        .slice(0, 8)

      return results
    },

    // Clear search history
    clearHistory() {
      this.searchHistory = []
    },

    // Clear recent searches
    clearRecentSearches() {
      this.recentSearches = []
    },

    // Handle search result selection
    selectSearchResult(result) {
      if (result?.name) {
        this.addToRecentSearches(result.name)
      }
      this.clearSearch()
    },
  },
})
