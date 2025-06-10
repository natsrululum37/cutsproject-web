// stores/business.js
import { defineStore } from 'pinia'

export const useBusinessStore = defineStore('business', {
  state: () => ({
    openingHours: {
      weekday: {
        days: 'Senin – Jumat',
        hours: '09.30 – 21.00',
      },
      weekend: {
        days: 'Sabtu – Minggu',
        hours: '09.00 – 22.30',
      },
    },
    locations: {
      main: {
        address: 'Jl. Jend. Sudirman, Sidomulyo, Sragen Wetan, Kec. Sragen,\nJawa Tengah 57214',
        coordinates: {
          lat: -7.123456,
          lng: 110.123456,
        },
      },
      branches: [
        {
          name: 'CUTS 1',
          address: 'Jl. Pemuda No.1 (Simpang Lima)',
        },
        {
          name: 'CUTS 2',
          address: 'Jl. Pandanaran No.34',
        },
        {
          name: 'CUTS 3',
          address: 'Jl. S. Parman No.5',
        },
        {
          name: 'CUTS 4',
          address: 'Jl. Gajah Mada No.12',
        },
      ],
    },
  }),
  getters: {
    getOpeningHours: (state) => state.openingHours,
    getLocations: (state) => state.locations,
    getMainAddress: (state) => state.locations.main.address,
    getBranches: (state) => state.locations.branches,
  },
})
