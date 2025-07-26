<script setup>
const openDonateLink = () => {
  if (process.client) {
    window.open('https://papnj.com/donate', '_blank')
  }
}

const shareWebsite = async () => {
  if (process.client) {
    const shareData = {
      title:
        "Jack Can't Fix Jack - Exposing Jack Ciattarelli's Political Flip-Flops",
      text: "Watch Jack Ciattarelli flip-flop through 300+ policy reversals. From Trump critic to MAGA supporter, see how Jack can't stick to any position for millions of reasons.",
      url: window.location.href
    }

    try {
      // Try native Web Share API first (mobile devices)
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        // Fallback: Copy to clipboard
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(window.location.href)
          alert('Link copied to clipboard! Share it with your friends.')
        } else {
          // Final fallback: Manual copy with prompt
          const url = window.location.href
          if (window.prompt('Copy this link to share:', url)) {
            // User can manually copy
          }
        }
      }
    } catch (error) {
      // Final fallback: Manual copy with prompt
      const url = window.location.href
      if (window.prompt('Copy this link to share:', url)) {
        // User can manually copy
      }
    }
  }
}
</script>

<template>
  <div>
    <header
      class="w-full bg-cover bg-center bg-no-repeat relative"
      style="background-image: url('/images/hero.jpg'); height: 588px"
    >
      <!-- Navigation bar overlay -->
      <div class="absolute top-0 left-0 right-0 z-10">
        <div class="mx-auto px-4 py-4">
          <div class="flex justify-end items-center">
            <div class="flex items-center space-x-4">
              <Button
                label="Share"
                icon="pi pi-share-alt"
                severity="secondary"
                size="small"
                class="bg-white text-black border-white hover:bg-opacity-30"
                @click="shareWebsite"
              />
              <Button
                label="Donate"
                severity="danger"
                size="small"
                class="bg-black border-black text-white hover:bg-opacity-30"
                @click="openDonateLink"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
