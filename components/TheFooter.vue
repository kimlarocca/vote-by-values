<script setup>
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="bg-dark-gray text-white px-6 py-16">
    <div class="text-center">
      <p class="mb-2 text-white">
        Copyright © {{ currentYear }} People Are People NJ. All Rights Reserved.
      </p>
      <p class="italic text-sm text-white">
        Paid for by People Are People NJ. Because New Jersey deserves a governor
        with backbone—not a weathervane.
      </p>
    </div>
  </footer>
</template>
