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
          <Title>NJ 11th Special Election | {{ race?.name }}</Title>
        </Head>
      </Html>
      <p class="like-h4 mb-2">The Polls Open In</p>
      <CountdownTimer
        v-if="race?.election_date"
        :end-date="race.election_date"
        class="mb-4"
      />
      <h1 class="mb-4">{{ race?.name }}</h1>
      <p v-if="race?.description" class="mb-4">{{ race.description }}</p>
    </section>
    <Candidates :candidates="candidates" :loading="loading" />

    <!-- Not Found Message -->
    <section v-if="notFound" class="container p-4 text-center py-16">
      <i class="pi pi-exclamation-triangle text-2xl text-red mb-4"></i>
      <h1 class="mb-4">404 Not Found</h1>
      <p class="mb-6">Sorry! The page you're looking for could not be found.</p>
    </section>
  </div>
</template>
