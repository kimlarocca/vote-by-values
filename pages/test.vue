<template>
  <div class="min-h-screen">
    <h1>Test Page</h1>
    <p>This is a minimal test to isolate the router injection error.</p>
  </div>
</template>

<script setup>
// Minimal script setup to test if the error persists
useSeoMeta({
  title: 'Test Page'
})
</script>
