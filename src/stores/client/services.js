// stores/services.js
import { defineStore } from 'pinia'

export const useServicesStore = defineStore('services', {
  state: () => ({
    services: {
      general: {
        title: 'General Service',
        items: [
          {
            name: 'Hair Cut',
            description: 'Potong + Keramas + hair tonic + hot towel + Blow dry + full styling',
            price: '50K',
          },
          {
            name: 'Shaving',
            description: 'Razor, facial shaves, full trim, dll',
            price: '5K',
          },
          {
            name: 'Treatments',
            description:
              'Protein hair mask, creambath, dandruff scalling, totok wajah, pijat 15 menit, dll',
            price: '20K',
          },
        ],
      },
      proSculpting: {
        title: 'Pro Sculpting & Coloring',
        items: [
          {
            name: 'Pro Sculpting',
            description: 'Pelurusan rambut permanen natural dengan 4 tahap proses',
            price: '205K',
          },
          {
            name: 'Paket Coloring',
            description: 'Merk reguler, merk premium, merk exotic',
            price: '188K',
          },
          {
            name: 'Top Perming',
            description: 'Keriting permanen dengan tingkat ke keritingan yang bervariatif',
            price: '196K',
          },
        ],
      },
      premium: {
        title: 'Premium Service',
        items: [
          {
            name: 'VIP Treatment',
            description: 'Full service dengan ruangan private dan layanan premium',
            price: '250K',
          },
          {
            name: 'Kids Haircut',
            description: 'Khusus anak-anak usia 5-12 tahun',
            price: '35K',
          },
        ],
      },
      hairCare: {
        title: 'Hair Care & Styling Product',
        items: [
          {
            name: 'Pomade',
            description: 'Pomade waterbased, oilbased, clay, wax, dan styling product lainnya',
            price: 'Mulai 30K',
          },
          {
            name: 'Shampoo',
            description: 'Shampoo khusus pria, anti ketombe, hair tonic, dan vitamin rambut',
            price: 'Mulai 25K',
          },
        ],
      },
    },
  }),
  getters: {
    getAllServices: (state) => state.services,
    getServiceByCategory: (state) => (category) => state.services[category],
  },
})
