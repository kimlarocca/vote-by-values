<script setup>
import { formatFacebookUrl, formatUrl } from "~/utils/helpers"

const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
  raceSlug: {
    type: String,
    default: null,
  },
})

const filteredCandidates = ref([])

const updateFilteredCandidates = (filtered) => {
  filteredCandidates.value = filtered
}

const truncateText = (text, maxLength) => {
  if (!text) return ""
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + "..."
}

const getBlueskyUrl = (candidate) => {
  if (!candidate?.bluesky) return ""
  if (candidate.bluesky.includes("bsky.app")) {
    return candidate.bluesky
  }
  return `https://bsky.app/profile/${candidate.bluesky}.bsky.social`
}
</script>

<template>
  <CandidatesSkeleton v-if="loading" />
  <section v-else-if="candidates.length" class="candidates">
    <!-- Filter Component -->
    <CandidateFilters
      :candidates="candidates"
      @update:filteredCandidates="updateFilteredCandidates"
      class="mb-4"
    />

    <div
      class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      <NuxtLink
        :to="`/${candidate.slug}`"
        class="plain flex flex-col h-full"
        v-for="candidate in filteredCandidates"
        :key="candidate.id"
      >
        <div class="candidate-card rounded-xl">
          <div class="candidate-card-image z-0 relative">
            <img
              v-if="candidate.image"
              :src="candidate.image"
              :alt="candidate.name"
              class="w-full aspect-square object-cover rounded-xl"
            />
            <div
              v-else
              class="w-full aspect-square rounded-xl bg-gray-200 flex items-center justify-center"
            >
              <i class="pi pi-user text-6xl text-gray-400" />
            </div>
            <div
              v-if="
                candidate.candidate_status === 'Won' ||
                candidate.candidate_status === 'Lost' ||
                candidate.candidate_status === 'Withdrawn'
              "
              class="candidate-status absolute top-0 right-0 rounded-tr-xl rounded-bl-xl p-2 font-bold uppercase"
              :class="{
                'bg-green-600': candidate.candidate_status === 'Won',
                'bg-red-600': candidate.candidate_status === 'Lost',
                'bg-gray-300': candidate.candidate_status === 'Withdrawn',
              }"
            >
              {{ candidate.candidate_status }}
            </div>
          </div>
          <div
            class="candidate-card-details bg-white z-10 rounded-xl p-2 text-center text-black"
            :class="{
              'border-blue': candidate.party === 'Democrat',
              'border-red': candidate.party === 'Republican',
              'border-purple': candidate.party === 'Independent',
            }"
          >
            <p
              v-if="candidate.incumbent"
              :class="{
                'bg-blue': candidate.party === 'Democrat',
                'bg-red': candidate.party === 'Republican',
                'bg-purple': candidate.party === 'Independent',
              }"
              class="mb-2 text-xs text-black font-bold p-1 rounded uppercase"
            >
              Incumbent
            </p>
            <p class="small font-bold mb-1">
              {{ candidate.name }}
            </p>
            <p class="text-xs mb-2" style="height: 40px">
              {{ candidate.micro_bio }}
            </p>
            <div class="flex space-x-3 items-center justify-center">
              <a
                v-if="candidate.website_url"
                :href="candidate.website_url"
                aria-label="website"
                class="text-xl text-black plain block relative z-20"
                target="_blank"
                @click.stop
              >
                <i class="pi pi-globe"></i>
              </a>

              <a
                v-if="candidate.tiktok"
                :href="`https://www.tiktok.com/@${candidate.tiktok}`"
                aria-label="tiktok"
                class="text-xl text-black plain block relative z-20"
                target="_blank"
                @click.stop
              >
                <i class="pi pi-tiktok"></i>
              </a>
              <a
                v-if="candidate.instagram"
                :href="`https://www.instagram.com/${candidate.instagram}`"
                aria-label="instagram"
                class="text-xl text-black plain block relative z-20"
                target="_blank"
                @click.stop
              >
                <i class="pi pi-instagram"></i>
              </a>
              <a
                v-if="candidate.bluesky"
                :href="getBlueskyUrl(candidate)"
                aria-label="bluesky"
                class="text-xl text-black plain block relative z-20"
                target="_blank"
                @click.stop
              >
                <Bluesky />
              </a>
              <a
                v-if="candidate.youtube"
                :href="`https://www.youtube.com/@${candidate.youtube}`"
                aria-label="youtube"
                class="text-xl text-black plain block relative z-20"
                target="_blank"
                @click.stop
              >
                <i class="pi pi-youtube"></i>
              </a>
            </div>
          </div>
        </div>
      </NuxtLink>

      <!-- Compare Issues Card -->
      <NuxtLink
        v-if="raceSlug"
        :to="`/race/${raceSlug}/compare`"
        class="plain flex flex-col h-full"
      >
        <div
          class="candidate-card p-4 rounded-xl h-full flex items-center justify-center bg-black text-white"
        >
          <div class="text-center">
            <Compare />
            <p class="font-bold">Candidate Super Comparison</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Issues-Like Page Card -->
      <NuxtLink
        v-if="raceSlug"
        :to="`/race/${raceSlug}/issues-page`"
        class="plain flex flex-col h-full"
      >
        <div
          class="candidate-card p-4 rounded-xl h-full flex items-center justify-center bg-black text-white"
        >
          <div class="text-center">
            <i class="pi pi-book text-2xl mb-4" />
            <p class="font-bold">Website Issues Pages</p>
          </div>
        </div>
      </NuxtLink>

      <!-- Compare Socials Card -->
      <NuxtLink
        v-if="raceSlug"
        :to="`/race/${raceSlug}/social-media`"
        class="plain flex flex-col h-full min-h-[200px]"
      >
        <div
          class="candidate-card p-4 rounded-xl h-full flex items-center justify-center bg-black text-white"
        >
          <div class="text-center">
            <i class="pi pi-share-alt text-2xl mb-4" />
            <p class="font-bold">Compare Social Media</p>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<style lang="scss">
.candidate-card-details {
  position: relative;
  margin: -2rem auto 0;
  width: calc(100% - 1.5rem);
}
</style>
