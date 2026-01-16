<script setup>
const route = useRoute()
const supabase = useSupabaseClient()

const race = ref(null)
const candidates = ref([])
const loading = ref(true)

// Fetch race and candidates
const fetchRaceData = async () => {
  loading.value = true

  // Fetch race info
  const { data: raceData, error: raceError } = await supabase
    .from("races")
    .select("*")
    .eq("slug", route.params.slug)
    .single()

  if (raceError) {
    console.error("Error fetching race:", raceError)
    loading.value = false
    return
  }

  race.value = raceData

  // Fetch candidates for this race
  const { data: candidatesData, error: candidatesError } = await supabase
    .from("candidates")
    .select("*")
    .eq("race_slug", route.params.slug)
    .order("name")

  if (candidatesError) {
    console.error("Error fetching candidates:", candidatesError)
  } else {
    candidates.value = candidatesData || []
  }

  loading.value = false
}

onMounted(() => {
  fetchRaceData()
})
</script>

<template>
  <div class="home container p-4">
    <Html lang="en">
      <Head>
        <Title>
          VoteByValues.com | {{ race?.name || "Race" }} | Social Media Comparison
        </Title>
      </Head>
    </Html>

    <!-- Loading State -->
    <section v-if="loading" class="text-center bg-white rounded-xl p-8">
      <i class="pi pi-spin pi-spinner text-4xl mb-4" />
      <p>Loading social media comparison...</p>
    </section>

    <!-- Race Header -->
    <section v-else-if="race" class="text-center mb-12">
      <!-- Back to Race Link -->
      <div class="mb-4">
        <NuxtLink :to="`/race/${route.params.slug}`">
          <i class="pi pi-arrow-left mr-2"></i>Back to Race
        </NuxtLink>
      </div>
      <h1 class="text-center mb-4">Social Media Comparison</h1>
      <p class="like-h3">{{ race.name }}</p>
    </section>

    <!-- Social Media Comparison Component -->
    <section v-if="!loading && candidates.length > 0">
      <SocialMediaComparison :candidates="candidates" />
    </section>

    <!-- No Candidates -->
    <section
      v-else-if="!loading && candidates.length === 0"
      class="text-center bg-white rounded-xl p-8"
    >
      <p class="text-gray-500">No candidates found for this race.</p>
    </section>
  </div>
</template>
