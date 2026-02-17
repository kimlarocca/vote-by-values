<script setup>
const supabase = useSupabaseClient()

// start of today (midnight) in timestampz format
const today = new Date()
today.setHours(0, 0, 0, 0)
const todayStart = today.toISOString()
const loading = ref(true)
const races = ref([])

const getRaces = async () => {
  const { data, error } = await supabase
    .from("races")
    .select(`*`)
    .gte("election_date", todayStart)
    .eq("draft", false)
    .order("name")
  if (error) {
    console.error(error)
  } else {
    races.value = data
  }
  loading.value = false
}

// Helper function to determine which date to display
const getDisplayDate = (race) => {
  if (!race) return { label: "Election Date", date: null }

  const now = new Date()
  const todayStart = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())

  // Check if there's a primary date
  if (race.primary_date) {
    const primaryDate = new Date(race.primary_date)
    const primaryDateStart = Date.UTC(
      primaryDate.getUTCFullYear(),
      primaryDate.getUTCMonth(),
      primaryDate.getUTCDate()
    )

    // Add 1 day to primary date (in milliseconds)
    const primaryDatePlusOne = primaryDateStart + 24 * 60 * 60 * 1000

    // If we're before primary date + 1 day, show primary date
    if (todayStart < primaryDatePlusOne) {
      return { label: "Primary Date", date: race.primary_date }
    }
  }

  // Otherwise, show election date
  return { label: "Election Date", date: race.election_date }
}

onMounted(async () => {
  getRaces()
})
</script>

<template>
  <div class="home container p-4">
    <section class="text-center mb-16">
      <p class="tag mb-5 m-auto">
        <i class="pi pi-check-circle ml-3" />
        <template v-if="!loading">{{ races.length }}</template> Upcoming
        {{ races.length === 1 ? "Race" : "Races" }}
      </p>
      <h1 class="text-center mb-5">Choose wisely. Vote informed.</h1>
      <p class="max-w-2xl m-auto">
        Helping you compare your personal values with political candidates' positions so
        you can make informed, confident decisions at the ballot box.
      </p>
    </section>

    <RacesSkeleton v-if="loading" />

    <section v-if="!loading && races.length" class="races-list mb-12">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <NuxtLink
          to="/suggest-a-race"
          class="p-6 rounded-xl border-black flex flex-col justify-center items-center text-center clickable plain"
        >
          <i class="pi pi-plus text-2xl mb-3" />
          <h2 class="mb-2">Suggest a Race</h2>
          <p class="small mb-2">
            We starting small, but do you want to see a local election here? Click here to
            share some details!
          </p>
        </NuxtLink>
        <NuxtLink
          v-for="race in races"
          :key="race.id"
          :to="`/race/${race.slug}`"
          class="p-6 rounded-xl border-black text-center clickable plain"
        >
          <states-nj />
          <h2 class="mb-2">{{ race.name }}</h2>
          <p class="small mb-2">{{ race.description }}</p>
          <p class="tag m-auto">
            {{ getDisplayDate(race).label }}:
            {{ new Date(getDisplayDate(race).date).toLocaleDateString() }}
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
