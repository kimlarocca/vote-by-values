<script setup>
const { setDarkMode, setLightMode, isDarkMode } = useDarkMode()
</script>

<template>
  <div>
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink
            to="/"
            class="text-2xl font-bold text-red-800 hover:text-red-600 transition-colors"
          >
            CantFixJack.com
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <Button
              label="Share"
              icon="pi pi-share-alt"
              severity="secondary"
              size="small"
              class="hidden md:inline-flex"
            />
            <Button
              label="Donate"
              severity="danger"
              size="small"
              class="bg-red-600 hover:bg-red-700"
            />
            <i
              v-if="isDarkMode"
              @click="setLightMode"
              class="pi pi-sun clickable text-xl text-gray-600 hover:text-gray-800 cursor-pointer"
            />
            <i
              v-else
              @click="setDarkMode"
              class="pi pi-moon clickable text-xl text-gray-600 hover:text-gray-800 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
