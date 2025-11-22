<script setup>
const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    required: true,
  },
})
</script>

<template>
  <CandidatesSkeleton v-if="loading" />
  <section v-else-if="candidates.length" class="candidates">
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <NuxtLink
        :to="`/${candidate.slug}`"
        class="plain flex flex-col h-full"
        v-for="candidate in candidates"
        :key="candidate.id"
      >
        <div class="candidate-card rounded-xl">
          <div class="candidate-card-image z-0">
            <img
              :src="candidate.image"
              :alt="candidate.name"
              class="w-full h-auto rounded-xl"
            />
          </div>
          <div
            class="candidate-card-details bg-white border-blue z-10 rounded-xl p-2 text-center text-black"
            style="min-height: 138px"
          >
            <p class="small font-bold mb-1">{{ candidate.name }}</p>
            <p class="text-sm mb-3">{{ candidate.micro_bio }}</p>
            <div class="flex space-x-4 items-center justify-center">
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
                :href="`https://bsky.app/profile/${candidate.bluesky}.bsky.social`"
                aria-label="instagram"
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
    </div>
  </section>
  <p v-else class="text-center">No candidates found.</p>
</template>

<style lang="scss">
.candidate-card-details {
  position: relative;
  margin: -2rem auto 0;
  width: calc(100% - 3rem);
}
</style>
