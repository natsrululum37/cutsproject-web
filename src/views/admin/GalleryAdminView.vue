<template>
  <section>
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-yellow-400 mb-2">Galeri Foto</h1>
      <p class="text-gray-400">Tambah, edit, atau hapus foto dari galeri.</p>
    </div>
    <div class="w-full max-w-2xl bg-zinc-900 shadow rounded-lg p-6 mb-10 border border-zinc-700 mx-auto">
      <h2 class="text-lg font-semibold mb-4">Tambah Gambar</h2>
      <form @submit.prevent="handleUpload" class="space-y-4">
        <div>
          <label class="block text-sm text-gray-400 mb-1">Judul Gambar</label>
          <input v-model="form.title" type="text" class="w-full bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400" />
        </div>
        <div>
          <label class="block text-sm text-gray-400 mb-1">Pilih Gambar</label>
          <input type="file" accept="image/*" @change="handleFileChange" class="block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-yellow-400 file:text-black hover:file:bg-yellow-300" />
        </div>
        <div v-if="preview" class="mt-4">
          <p class="text-sm text-gray-400 mb-1">Preview:</p>
          <img :src="preview" alt="Preview" class="rounded shadow w-full max-h-64 object-cover" />
        </div>
        <button type="submit" class="mt-4 bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded shadow font-semibold">Upload</button>
      </form>
    </div>
    <div class="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mx-auto">
      <div v-for="(image, index) in gallery" :key="index" class="bg-gray-900 border border-zinc-700 rounded-lg overflow-hidden shadow">
        <img :src="image.url" :alt="image.title" class="w-full h-48 object-cover" />
        <div class="p-4">
          <h3 class="text-sm font-medium text-white truncate">{{ image.title }}</h3>
          <div class="mt-2 flex justify-end space-x-2">
            <button @click="editImage(index)" class="text-yellow-400 hover:text-yellow-300 text-sm">Edit</button>
            <button @click="deleteImage(index)" class="text-red-400 hover:text-red-300 text-sm">Hapus</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  title: '',
  file: null,
})

const preview = ref(null)
const gallery = ref([])

function handleFileChange(event) {
  const file = event.target.files[0]
  if (file) {
    form.file = file
    preview.value = URL.createObjectURL(file)
  }
}

function handleUpload() {
  if (form.title && form.file) {
    gallery.value.push({
      title: form.title,
      url: preview.value,
    })
    form.title = ''
    form.file = null
    preview.value = null
  } else {
    alert('Lengkapi judul dan pilih gambar.')
  }
}

function deleteImage(index) {
  gallery.value.splice(index, 1)
}

function editImage(index) {
  const image = gallery.value[index]
  form.title = image.title
  preview.value = image.url
  form.file = null
  gallery.value.splice(index, 1)
}
</script>

<style scoped>
input[type="file"]::file-selector-button {
  font-weight: 500;
  border-radius: 0.375rem;
  margin-right: 1rem;
  cursor: pointer;
}
</style>
