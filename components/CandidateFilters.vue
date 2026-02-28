<script setup>
const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
  defaultIncludeWithdrawn: {
    type: Boolean,
    default: true,
  },
  defaultIncludeLost: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(["update:filteredCandidates"])

const selectedParties = ref([])
const selectedCandidates = ref([])
const includeWithdrawn = ref(props.defaultIncludeWithdrawn)
const includeLost = ref(props.defaultIncludeLost)
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
  let filtered = props.candidates

  // Exclude withdrawn candidates by default
  if (!includeWithdrawn.value) {
    filtered = filtered.filter((candidate) => candidate.candidate_status !== "Withdrawn")
  }

  // Exclude lost candidates by default
  if (!includeLost.value) {
    filtered = filtered.filter((candidate) => candidate.candidate_status !== "Lost")
  }

  // Filter by party
  if (selectedParties.value.length > 0) {
    filtered = filtered.filter((candidate) =>
      selectedParties.value.includes(candidate.party)
    )
  }

  // Filter by specific candidates
  if (selectedCandidates.value.length > 0) {
    filtered = filtered.filter((candidate) =>
      selectedCandidates.value.includes(candidate.id)
    )
  }

  return filtered
})

// Emit filtered candidates whenever filters change
watch(
  filteredCandidates,
  (newValue) => {
    emit("update:filteredCandidates", newValue)
  },
  { immediate: true }
)

const filterLabel = computed(() => {
  const totalFilters =
    selectedParties.value.length +
    selectedCandidates.value.length +
    (includeWithdrawn.value ? 1 : 0) +
    (includeLost.value ? 1 : 0)
  if (totalFilters === 0) {
    return "Filter"
  }
  return `Clear ${totalFilters} Filter${totalFilters > 1 ? "s" : ""}`
})

const clearFilters = () => {
  selectedParties.value = []
  selectedCandidates.value = []
  includeWithdrawn.value = props.defaultIncludeWithdrawn
  includeLost.value = props.defaultIncludeLost
}

const hasActiveFilters = computed(() => {
  return (
    selectedParties.value.length > 0 ||
    selectedCandidates.value.length > 0 ||
    !includeWithdrawn.value ||
    !includeLost.value
  )
})
</script>

<template>
  <div class="candidate-filters">
    <!-- Filter Button -->
    <div class="filter-section flex items-center justify-end gap-2">
      <div
        class="flex items-center gap-2 cursor-pointer uppercase text-sm"
        @click="filterDialogVisible = true"
      >
        <i class="pi pi-filter text-2xl" />Filter Candidates
      </div>
    </div>

    <!-- Filter Dialog -->
    <Dialog
      v-model:visible="filterDialogVisible"
      modal
      header="Filter Candidates"
      :style="{ width: '90vw', maxWidth: '600px' }"
    >
      <div class="flex flex-col gap-4">
        <!-- Filter by Status -->
        <div>
          <h3 class="mb-3 font-bold">Status</h3>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <Checkbox v-model="includeLost" inputId="include-lost" :binary="true" />
              <label for="include-lost" class="cursor-pointer"
                >Include Candidates Who Have Lost</label
              >
            </div>
            <div class="flex items-center gap-3">
              <Checkbox
                v-model="includeWithdrawn"
                inputId="include-withdrawn"
                :binary="true"
              />
              <label for="include-withdrawn" class="cursor-pointer"
                >Include Candidates Who Have Withdrawn</label
              >
            </div>
          </div>
        </div>

        <Divider />

        <!-- Filter by Party Section -->
        <div>
          <h3 class="mb-3 font-bold">By Party</h3>
          <div class="flex flex-col gap-3">
            <div v-for="party in parties" :key="party" class="flex items-center gap-3">
              <Checkbox
                v-model="selectedParties"
                :inputId="`party-${party}`"
                :value="party"
                name="party"
              />
              <label :for="`party-${party}`" class="cursor-pointer">{{ party }}</label>
            </div>
          </div>
        </div>

        <Divider />

        <!-- Filter by Candidate Section -->
        <div>
          <h3 class="mb-3 font-bold">By Candidate</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
            <div
              v-for="candidate in candidates"
              :key="candidate.id"
              class="flex items-center gap-3"
            >
              <Checkbox
                v-model="selectedCandidates"
                :inputId="`candidate-${candidate.id}`"
                :value="candidate.id"
                name="candidate"
              />
              <label :for="`candidate-${candidate.id}`" class="cursor-pointer">
                {{ candidate.name }}
              </label>
            </div>
          </div>
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
  </div>
</template>
