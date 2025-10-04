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
  <footer class="blue-section">
    <div class="bg-red h-16" />
    <div class="p-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <p class="mb-6">
          The views expressed herein are exclusively those of the authors and do
          not reflect the official stance of any political candidate or other
          organization and have not been requested or endorsed by any related
          entity. Information presented has been verified as accurate to the
          best of our ability.
        </p>
        <p class="mb-6">
          This advertisement was not requested or authorized by any candidate or
          candidate's committee.Paid for by People Are People LLC, 971 US
          Highway 202N #8014, Branchburg, NJ 08876.
        </p>
        <p>Copyright © {{ currentYear }}</p>
      </div>
      <div>
        <p class="mb-2">
          <a href="https://papnj.com" target="_blank"> People Are People </a>
        </p>
      </div>
    </div>
  </footer>
</template>
