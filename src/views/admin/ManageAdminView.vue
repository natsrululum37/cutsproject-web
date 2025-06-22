<template>
  <section>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2 text-yellow-400">Kelola Admin</h1>
      <p class="text-gray-400">Lihat dan kelola data admin CutsProject.</p>
    </div>
    <div class="max-w-2xl mx-auto bg-zinc-900 rounded-lg p-6 mb-8 border border-zinc-700">
      <h2 class="text-lg font-semibold mb-4">Tambah/Edit Admin</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-300 mb-1">Nama</label>
          <input v-model="form.name" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
        </div>
        <div>
          <label class="block text-gray-300 mb-1">Email</label>
          <input v-model="form.email" type="email" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
        </div>
        <div>
          <label class="block text-gray-300 mb-1">Foto (URL)</label>
          <input v-model="form.photo" class="w-full px-4 py-2 rounded bg-zinc-800 border border-zinc-700 text-white" />
        </div>
        <div class="flex gap-4 justify-end">
          <button type="button" @click="resetForm" class="px-6 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white font-semibold">Reset</button>
          <button type="submit" class="px-6 py-2 rounded bg-yellow-400 hover:bg-yellow-300 text-black font-semibold">Simpan</button>
        </div>
      </form>
    </div>
    <div class="w-full max-w-4xl mx-auto">
      <table class="w-full text-sm text-left bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden">
        <thead class="bg-yellow-400 text-black">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Nama</th>
            <th class="px-4 py-3">Email</th>
            <th class="px-4 py-3">Foto</th>
            <th class="px-4 py-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(admin, idx) in admins" :key="idx" class="border-b border-zinc-700">
            <td class="px-4 py-3">{{ idx + 1 }}</td>
            <td class="px-4 py-3">{{ admin.name }}</td>
            <td class="px-4 py-3">{{ admin.email }}</td>
            <td class="px-4 py-3">
              <img :src="admin.photo" alt="Foto" class="w-12 h-12 rounded-full object-cover border-2 border-yellow-400" />
            </td>
            <td class="px-4 py-3 space-x-2">
              <button @click="editAdmin(idx)" class="text-yellow-400 hover:text-yellow-300 text-xs">Edit</button>
              <button @click="deleteAdmin(idx)" class="text-red-400 hover:text-red-300 text-xs">Hapus</button>
            </td>
          </tr>
          <tr v-if="admins.length === 0">
            <td colspan="5" class="px-4 py-6 text-center text-gray-500">Belum ada admin.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const admins = ref([
  { name: 'Admin Utama', email: 'admin@cutsproject.com', photo: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { name: 'Admin 2', email: 'admin2@cutsproject.com', photo: 'https://randomuser.me/api/portraits/women/44.jpg' },
])

const form = ref({ name: '', email: '', photo: '' })
const editIdx = ref(null)

function handleSubmit() {
  if (editIdx.value !== null) {
    admins.value[editIdx.value] = { ...form.value }
    editIdx.value = null
  } else {
    admins.value.push({ ...form.value })
  }
  resetForm()
}
function editAdmin(idx) {
  form.value = { ...admins.value[idx] }
  editIdx.value = idx
}
function deleteAdmin(idx) {
  if (confirm('Yakin ingin menghapus admin ini?')) {
    admins.value.splice(idx, 1)
    resetForm()
  }
}
function resetForm() {
  form.value = { name: '', email: '', photo: '' }
  editIdx.value = null
}
</script>