<script setup>
const currentYear = new Date().getFullYear()

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
  <footer class="bg-black text-white px-6 py-16">
    <div class="text-center">
      <!-- Action Buttons -->
      <div class="flex justify-center items-center space-x-4 mb-6">
        <Button
          label="Share"
          icon="pi pi-share-alt"
          severity="secondary"
          size="small"
          class="bg-white text-black border-white hover:bg-gray-200"
          @click="shareWebsite"
        />
        <Button
          label="Donate"
          severity="danger"
          size="small"
          class="bg-red text-white border-red hover:bg-red-700"
          @click="openDonateLink"
        />
      </div>
      <p class="text-lg text-whit4 mb-2">
        Paid for by People Are People NJ. Because New Jersey deserves a governor
        with backbone—not a weathervane.
      </p>
      <p class="text-white">
        Copyright © {{ currentYear }} People Are People NJ. All Rights Reserved.
      </p>
    </div>
  </footer>
</template>
