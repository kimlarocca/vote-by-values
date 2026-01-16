<script setup>
import surveyData from "~/survey.json"

const supabase = useSupabaseClient()

const candidates = ref([])
const loading = ref(true)
const notFound = ref(false)
const race = ref(null)
const route = useRoute()
const keywords = computed(() => route.query.keywords || "")

// Get the category slug from route params
const categorySlug = computed(() => route.params.category)

// Find the category name from survey.json
const categoryName = computed(() => {
  const category = surveyData.pages.find(
    (page) => page.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") === categorySlug.value
  )
  return category ? category.title : categorySlug.value
})

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
          <Title>VoteByValues.com | {{ race?.name }} | Issues | {{ categoryName }}</Title>
        </Head>
      </Html>
      <NuxtLink :to="`/race/${route.params.slug}`" class="inline-block mb-4">
        <i class="pi pi-arrow-left mr-2"></i>Back to Race
      </NuxtLink>
      <h1 class="mb-4">{{ categoryName }}</h1>
      <p class="like-h3">{{ race?.name }}</p>
    </section>

    <!-- Issues Comparison Chart -->
    <section v-if="!loading && candidates.length > 0">
      <IssuesComparisonChart
        :candidates="candidates"
        :initial-keywords="keywords"
        :category="categoryName"
        :show-quick-filters="false"
      />

      <!-- Link to view all issues -->
      <div class="text-center mt-12">
        <NuxtLink :to="`/race/${route.params.slug}/compare`" class="inline-block">
          View All Issues<i class="pi pi-arrow-right ml-2" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
