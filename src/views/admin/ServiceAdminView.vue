<template>
  <section>
    <div class="mb-6 text-center">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Manajemen Layanan</h1>
      <p class="text-gray-300">Kelola semua layanan potong rambut dan styling.</p>
    </div>
    <div class="bg-zinc-900 shadow-md rounded-lg overflow-hidden text-white">
      <table class="min-w-full table-auto text-sm">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-6 py-3 text-left">#</th>
            <th class="px-6 py-3 text-left">Nama Layanan</th>
            <th class="px-6 py-3 text-left">Harga</th>
            <th class="px-6 py-3 text-left">Deskripsi</th>
            <th class="px-6 py-3 text-left">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(service, index) in services"
            :key="service.id"
            class="border-b border-zinc-700 hover:bg-zinc-800 transition-colors duration-200"
          >
            <td class="px-6 py-4">{{ index + 1 }}</td>
            <td class="px-6 py-4">
              <input
                v-if="editId === service.id"
                v-model="editedService.name"
                class="border border-zinc-600 bg-zinc-800 text-white px-2 py-1 w-full rounded"
              />
              <span v-else>{{ service.name }}</span>
            </td>
            <td class="px-6 py-4">
              <input
                v-if="editId === service.id"
                v-model="editedService.price"
                type="number"
                class="border border-zinc-600 bg-zinc-800 text-white px-2 py-1 w-full rounded"
              />
              <span v-else>Rp {{ service.price.toLocaleString() }}</span>
            </td>
            <td class="px-6 py-4">
              <input
                v-if="editId === service.id"
                v-model="editedService.description"
                class="border border-zinc-600 bg-zinc-800 text-white px-2 py-1 w-full rounded"
              />
              <span v-else>{{ service.description }}</span>
            </td>
            <td class="px-6 py-4">
              <div class="space-x-2">
                <button
                  v-if="editId === service.id"
                  @click="saveEdit(service.id)"
                  class="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                >Simpan</button>
                <button
                  v-if="editId === service.id"
                  @click="cancelEdit"
                  class="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                >Batal</button>
                <button
                  v-else
                  @click="startEdit(service)"
                  class="px-3 py-1 bg-yellow-400 text-black rounded text-sm hover:bg-yellow-300"
                >Edit</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const services = reactive([
  { id: 1, name: 'Potong Rambut', price: 50000, description: 'Potong rambut klasik dan modern' },
  { id: 2, name: 'Shaving', price: 30000, description: 'Cukur bersih dan rapi' },
  { id: 3, name: 'Hair Styling', price: 70000, description: 'Penataan rambut sesuai tren' },
])

const editId = ref(null)
const editedService = reactive({ name: '', price: 0, description: '' })

function startEdit(service) {
  editId.value = service.id
  editedService.name = service.name
  editedService.price = service.price
  editedService.description = service.description
}

function saveEdit(id) {
  const index = services.findIndex(s => s.id === id)
  if (index !== -1) {
    services[index].name = editedService.name
    services[index].price = editedService.price
    services[index].description = editedService.description
    editId.value = null
  }
}

function cancelEdit() {
  editId.value = null
}
</script>
