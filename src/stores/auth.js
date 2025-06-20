import { defineStore } from "pinia"
import { useNavigationStore } from './client/navigation'

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        user: null
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
    },
    actions: {
        login(token, userData) {
            this.token = token
            this.user = userData || {}
            localStorage.setItem("token", token)
            // Update navigation store user
            const navigationStore = useNavigationStore()
            navigationStore.setUser(userData)
        },
        logout() {
            this.token = null;
            this.user = null;
            localStorage.removeItem("token")
            // Update navigation store user
            const navigationStore = useNavigationStore()
            navigationStore.logout()
        }
    }
})