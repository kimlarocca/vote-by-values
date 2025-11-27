<script setup>
const supabase = useSupabaseClient()
const route = useRoute()
const candidates = ref([])
const races = ref([])
const loading = ref(true)
const searchQuery = ref(route.query.query)

const search = async () => {
  loading.value = true
  const q = route.query.query
  searchQuery.value = ((Array.isArray(q) ? q[0] : q) || "").trim()

  if (!searchQuery.value) {
    candidates.value = []
    races.value = []
    loading.value = false
    return
  }

  const { data, error } = await supabase
    .from("candidates")
    .select("*")
    .or(
      `name.ilike.%${searchQuery.value}%,micro_bio.ilike.%${searchQuery.value}%,bio.ilike.%${searchQuery.value}%,experience.ilike.%${searchQuery.value}%`
    )
    .order("party")
    .order("name")
  if (error) {
    console.error(error)
  } else {
    candidates.value = data || []
  }

  const { data: racesData, error: racesError } = await supabase
    .from("races")
    .select("*")
    .order("name")

  if (racesError) {
    console.error(racesError)
  } else {
    const query = searchQuery.value.toLowerCase()
    races.value = (racesData || []).filter((race) => {
      return (
        (race.name && race.name.toLowerCase().includes(query)) ||
        (race.description && race.description.toLowerCase().includes(query)) ||
        (race.slug && race.slug.toLowerCase().includes(query))
      )
    })
  }

  loading.value = false
}

// Watch for query parameter changes
watch(
  () => route.query.query,
  () => {
    search()
  }
)

onMounted(() => {
  search()
})
</script>

<template>
  <div class="container px-4 xl:px-0">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Search Results | {{ searchQuery }}</Title>
      </Head>
    </Html>

    <!-- Search Query Display -->
    <div v-if="searchQuery" class="mb-8">
      <hr class="mt-12 mb-1" />
      <p class="mb-6 uppercase small">
        {{ candidates.length + races.length }} result{{
          candidates.length + races.length !== 1 ? "s" : ""
        }}
        for:
      </p>
      <h1 class="mb-6 uppercase">{{ searchQuery }}</h1>
    </div>

    <!-- Loading State -->
    <CandidatesSkeleton v-if="loading" />

    <!-- No Query -->
    <div v-else-if="!searchQuery" class="bg-white rounded-xl p-8 text-center">
      <i class="pi pi-search text-6xl text-gray-400 mb-4"></i>
      <h2 class="mb-4">No Search Query</h2>
      <p class="mb-6">Please enter a search term to find candidates.</p>
    </div>

    <!-- Results -->
    <div v-else-if="candidates.length > 0 || races.length > 0">
      <!-- Races Results -->
      <div v-if="races.length > 0" class="mb-12">
        <h2 class="mb-6">Races</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <NuxtLink
            v-for="race in races"
            :key="race.id"
            :to="`/race/${race.slug}`"
            class="p-6 rounded-xl shadow-lg border-black text-center clickable plain"
          >
            <states-nj />
            <h2 class="mb-2">{{ race.name }}</h2>
            <p class="small mb-2">{{ race.description }}</p>
            <p class="tag m-auto">
              Election Date: {{ new Date(race.election_date).toLocaleDateString() }}
            </p>
          </NuxtLink>
        </div>
      </div>

      <!-- Candidates Results -->
      <div v-if="candidates.length > 0">
        <h2 v-if="races.length > 0" class="mb-6">Candidates</h2>
        <Candidates :candidates="candidates" :loading="loading" />
      </div>
    </div>

    <!-- No Results -->
    <div v-else class="bg-white rounded-xl pt-6">
      <i class="pi pi-search text-6xl mb-4"></i>
      <h2 class="mb-4">No Results Found</h2>
      <p class="mb-6">Please try a different search term.</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.candidate-card-details {
  position: relative;
  margin: -2rem auto 0;
  width: calc(100% - 3rem);
}
</style>
