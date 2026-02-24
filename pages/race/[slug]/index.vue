<script setup>
const supabase = useSupabaseClient()

const candidates = ref([])
const loading = ref(true)
const notFound = ref(false)
const race = ref(null)
const route = useRoute()

const getCandidates = async () => {
  const { data, error } = await supabase
    .from("candidates")
    .select(`*`)
    .eq("race_slug", route.params.slug)
    .order("party")
    .order("name")
  if (error) {
    console.error(error)
  } else {
    if (data && data.length > 0) {
      candidates.value = data
    } else {
      notFound.value = true
    }
  }
  loading.value = false
}

const getRace = async () => {
  const { data, error } = await supabase
    .from("races")
    .select(`*`)
    .eq("slug", route.params.slug)
    .single()
  if (error) {
    console.error(error)
  } else {
    race.value = data
  }
  loading.value = false
}

const countdownStatus = computed(() => {
  if (!race.value) return null

  const now = new Date()
  // Use UTC to normalize dates to avoid timezone issues
  const todayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())

  // Check primary date
  if (race.value.primary_date) {
    const primaryDate = new Date(race.value.primary_date)
    const primaryDateStart = Date.UTC(
      primaryDate.getUTCFullYear(),
      primaryDate.getUTCMonth(),
      primaryDate.getUTCDate()
    )

    if (primaryDateStart > todayStart) {
      return { label: "The Primary Polls Open In", date: race.value.primary_date }
    }
    if (primaryDateStart === todayStart && race.value.primary_close) {
      // Primary is today - show countdown to close
      return { label: "The Primary Polls Close In", date: race.value.primary_close }
    }
    // If primary_date is in the past, continue to election logic
  }

  // Check election date
  if (race.value.election_date) {
    const electionDate = new Date(race.value.election_date)
    const electionDateStart = Date.UTC(
      electionDate.getUTCFullYear(),
      electionDate.getUTCMonth(),
      electionDate.getUTCDate()
    )

    if (electionDateStart > todayStart) {
      return { label: "The Polls Open In", date: race.value.election_date }
    }
    if (electionDateStart === todayStart && race.value.election_close) {
      // Election is today - show countdown to close
      return { label: "The Polls Close In", date: race.value.election_close }
    }

    // All dates have passed - show timer with the close date to display zeros
    return {
      label: "Polls Closed",
      date: race.value.election_close || race.value.election_date,
    }
  }

  return null
})

onMounted(async () => {
  getCandidates()
  getRace()
})
</script>

<template>
  <div class="home container p-4">
    <section v-if="race" class="text-center">
      <Html lang="en">
        <Head>
          <Title>VoteByValues.com | {{ race?.name }}</Title>
        </Head>
      </Html>
      <template v-if="countdownStatus">
        <p class="like-h4 mb-2">{{ countdownStatus.label }}</p>
        <CountdownTimer
          v-if="countdownStatus.date"
          :end-date="countdownStatus.date"
          class="mb-4"
        />
        <div v-else class="mb-4"></div>
      </template>
      <h1 class="mb-4">{{ race?.name }}</h1>
      <p v-if="race?.description" class="mb-4" v-html="race.description" />
    </section>
    <NJ11Carousel v-if="route.params.slug === 'NJ-11'" class="mb-8" />
    <Candidates
      :candidates="candidates"
      :loading="loading"
      :race-slug="route.params.slug"
    />

    <section v-if="race?.race_links" class="mt-16">
      <h2>Key Links</h2>
      <div v-html="race?.race_links" />
    </section>

    <!-- Not Found Message -->
    <section v-if="notFound" class="container p-4 text-center py-16">
      <i class="pi pi-exclamation-triangle text-2xl text-red mb-4"></i>
      <h1 class="mb-4">404 Not Found</h1>
      <p class="mb-6">Sorry! The page you're looking for could not be found.</p>
    </section>
  </div>
</template>
