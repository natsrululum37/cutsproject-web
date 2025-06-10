// stores/social.js
import { defineStore } from 'pinia'

export const useSocialStore = defineStore('social', {
  state: () => ({
    socials: {
      instagram: {
        name: '@cutsproject',
        url: 'https://instagram.com/cutsproject',
        icon: ['fab', 'instagram'],
      },
      whatsapp: {
        name: '0813-9083-0955',
        url: 'https://wa.me/6281390830955',
        icon: ['fab', 'whatsapp'],
      },
      tiktok: {
        name: 'cutsprojectofficial',
        url: 'https://www.tiktok.com/@cutsproject',
        icon: ['fab', 'tiktok'],
      },
    },
  }),
  getters: {
    getAllSocials: (state) => state.socials,
    getSocialByPlatform: (state) => (platform) => state.socials[platform],
  },
})
