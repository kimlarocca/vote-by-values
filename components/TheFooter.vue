<script setup>
const currentYear = new Date().getFullYear()
const socialLinks = [
  { icon: 'pi pi-link', url: 'https://linktr.ee/papnj', label: 'Linktree' },
  {
    icon: 'pi pi-tiktok',
    url: 'https://tiktok.com/@newjerseypeople',
    label: 'TikTok'
  },
  {
    icon: 'pi pi-facebook',
    url: 'https://www.facebook.com/NewJerseyPeople',
    label: 'Facebook'
  },
  {
    icon: 'pi pi-twitter',
    url: 'https://x.com/NewJerseyPeople',
    label: 'X (Twitter)'
  },
  {
    icon: 'pi pi-instagram',
    url: 'https://instagram.com/NJPeopleArePeople',
    label: 'Instagram'
  },
  {
    icon: 'custom',
    iconSrc: '/bluesky.svg',
    url: 'https://bsky.app/profile/newjerseypeople.bsky.social',
    label: 'Bluesky'
  },
  {
    icon: 'pi pi-youtube',
    url: 'https://www.youtube.com/@PeopleArePeopleNJ',
    label: 'YouTube'
  }
]
</script>

<template>
  <footer class="blue-section pb-20">
    <div class="bg-red" style="height: 56px" />
    <div
      class="relative container px-4 xl:px-12 grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-24"
    >
      <div class="lg:col-span-2 order-2 lg:order-1 pt-12">
        <p class="small mb-6">
          The views expressed herein are exclusively those of the authors and do
          not reflect the official stance of any political candidate or other
          organization and have not been requested or endorsed by any related
          entity. Information presented has been verified as accurate to the
          best of our ability.
        </p>
        <p class="small mb-6">
          This website was not requested or authorized by any candidate or
          candidate's committee. Paid for by People Are People LLC, 971 US
          Highway 202N #8014, Branchburg, NJ 08876.
        </p>
        <p class="small">
          Copyright © {{ currentYear }} — People Are People NJ. All Rights
          Reserved.
        </p>
      </div>
      <div class="order-3 lg:order-2 pt-12">
        <p class="mb-3">
          <a href="https://papnj.com" target="_blank"> People Are People </a>
        </p>
        <p class="mb-3">
          <a href="https://dearestjack.com" target="_blank"> Dearest Jack </a>
        </p>
        <p class="mb-3">
          <a href="https://ciattgpt.com" target="_blank"> Ciatt GPT </a>
        </p>
        <!-- Social Media Icons -->
        <div class="flex space-x-4 my-6">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.url"
            :aria-label="social.label"
            class="text-white text-xl icon-link"
          >
            <img
              v-if="social.icon === 'custom'"
              :src="social.iconSrc"
              :alt="social.label"
              class="custom filter invert"
            />
            <i v-else :class="social.icon"></i>
          </a>
        </div>
      </div>
      <div
        class="order-1 lg:order-3 lg:absolute lg:right-0"
        style="margin-top: -56px"
      >
        <NuxtLink to="/">
          <LogoFooter />
        </NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.icon-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}
.custom {
  max-width: 16px;
  width: 16px;
  height: 16px;
}
</style>
