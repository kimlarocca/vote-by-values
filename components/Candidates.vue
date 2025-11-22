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

const selectedParties = ref([])
const filterDialogVisible = ref(false)

const parties = computed(() => {
  const uniqueParties = []
  props.candidates.forEach((candidate) => {
    if (candidate.party && !uniqueParties.includes(candidate.party)) {
      uniqueParties.push(candidate.party)
    }
  })
  return uniqueParties
})

const filteredCandidates = computed(() => {
  if (selectedParties.value.length === 0) {
    return props.candidates
  }
  return props.candidates.filter((candidate) =>
    selectedParties.value.includes(candidate.party)
  )
})

const filterLabel = computed(() => {
  if (selectedParties.value.length === 0) {
    return "Filter"
  }
  if (selectedParties.value.length === 1) {
    return `Filter (${selectedParties.value[0]})`
  }
  return `Filter (${selectedParties.value.length} selected)`
})

const clearFilters = () => {
  selectedParties.value = []
}
</script>

<template>
  <CandidatesSkeleton v-if="loading" />
  <section v-else-if="candidates.length" class="candidates">
    <!-- Filter Button -->
    <div
      class="filter-section mb-4 flex items-center justify-end gap-2 cursor-pointer"
      @click="filterDialogVisible = true"
    >
      <i class="pi pi-filter text-2xl" />
      <p class="like-h4">{{ filterLabel }}</p>
    </div>

    <!-- Filter Dialog -->
    <Dialog
      v-model:visible="filterDialogVisible"
      modal
      header="Filter by Party"
      :style="{ width: '90vw', maxWidth: '500px' }"
    >
      <div class="flex flex-col gap-4">
        <div v-for="party in parties" :key="party" class="flex items-center gap-3">
          <Checkbox
            v-model="selectedParties"
            :inputId="party"
            :value="party"
            name="party"
          />
          <label :for="party" class="cursor-pointer text-lg">{{ party }}</label>
        </div>

        <Divider />

        <div class="flex gap-3">
          <Button
            label="Clear All"
            severity="secondary"
            @click="clearFilters"
            class="flex-1"
            size="small"
          />
          <Button
            label="Apply"
            @click="filterDialogVisible = false"
            class="flex-1"
            size="small"
          />
        </div>
      </div>
    </Dialog>

    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
      <NuxtLink
        :to="`/${candidate.slug}`"
        class="plain flex flex-col h-full"
        v-for="candidate in filteredCandidates"
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
            class="candidate-card-details bg-white z-10 rounded-xl p-2 text-center text-black"
            :class="{
              'border-blue': candidate.party === 'Democrat',
              'border-red': candidate.party === 'Republican',
              'border-purple': candidate.party === 'Independent',
            }"
            style="min-height: 138px"
          >
            <p class="small font-bold mb-1">{{ candidate.name }}</p>
            <p class="text-sm mb-2">{{ candidate.micro_bio }}</p>
            <div class="flex space-x-3 items-center justify-center">
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
