<script setup>
const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
})

// Social media platforms to display
const socialMediaPlatforms = [
  { key: "facebook", label: "Facebook", icon: "pi-facebook", urlFormatter: (val) => val },
  {
    key: "twitter",
    label: "twitter",
    icon: "pi-twitter",
    urlFormatter: (val) => `https://x.com/${val}`,
  },
  {
    key: "instagram",
    label: "Instagram",
    icon: "pi-instagram",
    urlFormatter: (val) => `https://www.instagram.com/${val}`,
  },
  {
    key: "bluesky",
    label: "Bluesky",
    icon: null,
    urlFormatter: (val) =>
      val.includes("bsky.app") ? val : `https://bsky.app/profile/${val}.bsky.social`,
  },
  {
    key: "tiktok",
    label: "TikTok",
    icon: "pi-tiktok",
    urlFormatter: (val) => `https://www.tiktok.com/@${val}`,
  },
  {
    key: "youtube",
    label: "YouTube",
    icon: "pi-youtube",
    urlFormatter: (val) => `https://www.youtube.com/@${val}`,
  },
  {
    key: "threads",
    label: "Threads",
    icon: "pi-at",
    urlFormatter: (val) => `https://www.threads.net/@${val}`,
  },
  {
    key: "substack",
    label: "Substack",
    icon: "pi-book",
    urlFormatter: (val) => `https://www.substack.com/@${val}`,
  },
]

// Check if candidate has a specific social media account
const hasSocialMedia = (candidate, platform) => {
  return candidate[platform.key] && candidate[platform.key].trim() !== ""
}

// Get formatted URL for social media
const getSocialMediaUrl = (candidate, platform) => {
  if (!hasSocialMedia(candidate, platform)) return ""
  return platform.urlFormatter(candidate[platform.key])
}

// Filtered candidates from the filter component
const filteredCandidates = ref([])

// Update filtered candidates when filters change
const updateFilteredCandidates = (filtered) => {
  filteredCandidates.value = filtered
}

// Use filtered candidates for comparison, fallback to all candidates
const displayedCandidates = computed(() => {
  return filteredCandidates.value.length > 0 ? filteredCandidates.value : props.candidates
})
</script>

<template>
  <div v-if="candidates.length > 0" class="social-media-comparison">
    <!-- Candidate Filters -->
    <div class="mb-6 flex justify-end">
      <CandidateFilters
        :candidates="candidates"
        @update:filteredCandidates="updateFilteredCandidates"
      />
    </div>

    <!-- Desktop Table View -->
    <div class="overflow-x-auto desktop-view">
      <table class="w-full rounded-xl border-1 border-black">
        <thead>
          <tr class="bg-black text-white">
            <th class="rounded-tl-xl">&nbsp;</th>
            <th v-for="platform in socialMediaPlatforms" :key="platform.key" class="p-4">
              <div class="flex flex-col items-center gap-1">
                <span class="text-xs uppercase mb-1">{{ platform.label }}</span>
                <i v-if="platform.icon" :class="`pi ${platform.icon}`"></i>
                <Bluesky v-else-if="platform.key === 'bluesky'" class="white" />
              </div>
            </th>
            <th class="rounded-tr-xl">&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(candidate, index) in displayedCandidates"
            :key="candidate.id"
            :class="[
              'border-b border-gray-200 last:border-b-0',
              index % 2 === 0 ? 'bg-white' : 'bg-gray-100',
            ]"
          >
            <td class="p-4 font-medium">
              <NuxtLink :to="`/${candidate.slug}`" class="plain">
                {{ candidate.name }}
              </NuxtLink>
            </td>
            <td
              v-for="platform in socialMediaPlatforms"
              :key="platform.key"
              class="p-4 text-center"
            >
              <a
                v-if="hasSocialMedia(candidate, platform)"
                :href="getSocialMediaUrl(candidate, platform)"
                target="_blank"
                :aria-label="`${candidate.name} on ${platform.label}`"
                class="inline-block text-blue hover:text-blue-dark"
              >
                <i
                  v-if="platform.icon"
                  :class="`pi-check pi pi-check-circle text-green-600`"
                ></i>
                <i
                  v-else-if="platform.key === 'bluesky'"
                  class="pi-check pi pi-check-circle text-green-600"
                ></i>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile View -->
    <div class="mobile-view">
      <div
        v-for="platform in socialMediaPlatforms"
        :key="platform.key"
        class="mb-6 border-1 rounded-xl border-black section-container"
      >
        <!-- Platform Header -->
        <div class="bg-black text-white font-bold p-4 flex items-center gap-3">
          <i v-if="platform.icon" :class="`pi ${platform.icon}`"></i>
          <Bluesky v-else-if="platform.key === 'bluesky'" />
          <span>{{ platform.label }}</span>
        </div>

        <!-- Candidates List -->
        <div class="bg-white rounded-b-xl">
          <div
            v-for="(candidate, index) in displayedCandidates"
            :key="candidate.id"
            :class="[
              'p-4 border-b border-gray-200 last:border-b-0',
              index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
            ]"
          >
            <div
              v-if="hasSocialMedia(candidate, platform)"
              class="flex items-center gap-2"
            >
              <i class="pi pi-check-circle text-green-600"></i>
              <a
                :href="getSocialMediaUrl(candidate, platform)"
                target="_blank"
                :aria-label="`${candidate.name} on ${platform.label}`"
                class="text-blue hover:text-blue-dark"
              >
                {{ candidate.name }}
              </a>
            </div>
            <div v-else class="flex items-center gap-2">
              <i class="pi pi-times-circle text-red-600"></i>
              <p>{{ candidate.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-view {
  display: none;
}

.mobile-view {
  display: block;
}

.section-container {
  overflow: hidden;
}

@media (min-width: 1024px) {
  .desktop-view {
    display: block;
  }

  .mobile-view {
    display: none;
  }
}

.social-media-comparison table {
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
}

.social-media-comparison tbody tr:hover {
  transition: background-color 0.2s ease;
}

.social-media-comparison tbody tr:last-child td:first-child {
  border-bottom-left-radius: 0.75rem;
}

.social-media-comparison tbody tr:last-child td:last-child {
  border-bottom-right-radius: 0.75rem;
}
</style>
