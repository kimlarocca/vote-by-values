<script setup>
const supabase = useSupabaseClient()

const candidates = ref([])
const loading = ref(true)
const notFound = ref(false)
const race = ref(null)
const route = useRoute()
const keywords = computed(() => route.query.keywords || "")

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
    <section v-if="race" class="text-center mb-12">
      <Html lang="en">
        <Head>
          <Title>VoteByValues.com | {{ race?.name }} - Issues Comparison</Title>
        </Head>
      </Html>
      <NuxtLink :to="`/race/${route.params.slug}`" class="inline-block mb-4">
        <i class="pi pi-arrow-left mr-2"></i>Back to Race
      </NuxtLink>
      <h1 class="mb-4">Issues Comparison</h1>
      <p class="like-h3">{{ race?.name }}</p>
    </section>

    <!-- Issues Comparison Chart -->
    <section v-if="!loading && candidates.length > 0">
      <IssuesComparisonChart :candidates="candidates" :initial-keywords="keywords" />
    </section>

    <!-- Not Found Message -->
    <section v-if="notFound" class="text-center py-16">
      <i class="pi pi-exclamation-triangle text-2xl text-red mb-4"></i>
      <h1 class="mb-4">404 Not Found</h1>
      <p class="mb-6">Sorry! The page you're looking for could not be found.</p>
    </section>
  </div>
</template>
