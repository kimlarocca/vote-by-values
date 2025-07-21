<script setup>
const openDonateLink = () => {
  window.open('https://papnj.com/donate', '_blank')
}

const shareWebsite = async () => {
  const shareData = {
    title: 'Jack Can\'t Millions – Exposing Jack Ciattarelli\'s Political Flip-Flops',
    text: 'Watch Jack Ciattarelli flip-flop through 300+ policy reversals. From Trump critic to MAGA supporter, see how Jack can\'t stick to any position for millions of reasons.',
    url: window.location.href
  }

  try {
    // Try native Web Share API first (mobile devices)
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      // Fallback: Copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard! Share it with your friends.')
    }
  } catch (error) {
    // Final fallback: Manual copy with prompt
    const url = window.location.href
    if (window.prompt('Copy this link to share:', url)) {
      // User can manually copy
    }
  }
}
</script>

<template>
  <div>
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <NuxtLink to="/" class="text-2xl font-bold text-red-800 hover:text-red-600 transition-colors">
            CantFixJack.com
          </NuxtLink>
          <div class="flex items-center space-x-4">
            <Button label="Share" icon="pi pi-share-alt" severity="secondary" size="small" class="hidden md:inline-flex"
              @click="shareWebsite" />
            <Button label="Donate" severity="danger" size="small" class="bg-red-600 hover:bg-red-700"
              @click="openDonateLink" />
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
