<script setup>
const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
})

// Check if candidate has an issues page URL
const hasIssuesPage = (candidate) => {
  return candidate.issues_page_url && candidate.issues_page_url.trim() !== ""
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
  <div v-if="candidates.length > 0" class="issues-page-comparison">
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
            <th class="rounded-tl-xl p-4 text-left">Candidate</th>
            <th class="p-4 text-center">
              <div class="flex flex-col items-center gap-1">Issues Page</div>
            </th>
            <th class="rounded-tr-xl p-4 text-left">Summary</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(candidate, index) in displayedCandidates"
            :key="candidate.id"
            :class="[index % 2 === 0 ? 'bg-white' : 'bg-gray-100']"
          >
            <td class="p-4 font-medium">
              <NuxtLink :to="`/${candidate.slug}`" class="plain">
                {{ candidate.name }}
              </NuxtLink>
            </td>
            <td class="p-4 text-center">
              <a
                v-if="hasIssuesPage(candidate)"
                :href="candidate.issues_page_url"
                target="_blank"
                :aria-label="`${candidate.name} Issues Page`"
                class="inline-block text-blue hover:text-blue-dark"
              >
                <i class="pi pi-check-circle text-green-600"></i>
              </a>
              <i v-else class="pi pi-times-circle text-red-600"></i>
            </td>
            <td class="p-4">
              <span class="text-sm">{{ candidate.issues_page_summary || "" }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile View -->
    <div class="mobile-view">
      <div class="border-1 rounded-xl border-black section-container">
        <!-- Header -->
        <div class="bg-black text-white font-bold p-4 flex items-center gap-3">
          <i class="pi pi-file"></i>
          <span>Issues Page</span>
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
            <div v-if="hasIssuesPage(candidate)" class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <i class="pi pi-check-circle text-green-600"></i>
                <a
                  :href="candidate.issues_page_url"
                  target="_blank"
                  :aria-label="`${candidate.name} Issues Page`"
                  class="text-blue hover:text-blue-dark"
                >
                  {{ candidate.name }}
                </a>
              </div>
              <p v-if="candidate.issues_page_summary" class="text-sm text-gray-600 ml-6">
                {{ candidate.issues_page_summary }}
              </p>
            </div>
            <div v-else class="flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <i class="pi pi-times-circle text-red-600"></i>
                <p>{{ candidate.name }}</p>
              </div>
              <p v-if="candidate.issues_page_summary" class="text-sm text-gray-600 ml-6">
                {{ candidate.issues_page_summary }}
              </p>
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

.issues-page-comparison table {
  border-collapse: separate;
  border-spacing: 0;
  overflow: hidden;
}

.issues-page-comparison tbody tr:hover {
  transition: background-color 0.2s ease;
}

.issues-page-comparison tbody tr:last-child td:first-child {
  border-bottom-left-radius: 0.75rem;
}

.issues-page-comparison tbody tr:last-child td:last-child {
  border-bottom-right-radius: 0.75rem;
}
</style>
