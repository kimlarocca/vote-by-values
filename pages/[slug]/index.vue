<script setup>
const supabase = useSupabaseClient()
const candidate = ref(null)
const route = useRoute()
const notFound = ref(false)
const loading = ref(true)

const getCandidate = async () => {
  const { data, error } = await supabase
    .from("candidates")
    .select(`*`)
    .eq("slug", route.params.slug)
  if (error) {
    console.error(error)
  } else {
    if (data && data.length > 0) {
      candidate.value = data[0]
    } else {
      notFound.value = true
    }
  }
  loading.value = false
}

onMounted(async () => {
  getCandidate()
})
</script>

<template>
  <div>
    <Html lang="en" v-if="candidate?.name">
      <Head>
        <Title>VoteByValues.com | {{ candidate.name }}</Title>
      </Head>
    </Html>

    <div v-if="loading" class="container p-4">
      <CandidateDetailSkeleton />
    </div>

    <!-- Not Found Message -->
    <section v-if="notFound" class="container p-4 text-center py-16">
      <i class="pi pi-exclamation-triangle text-2xl text-red mb-4"></i>
      <h1 class="mb-4">404 Not Found</h1>
      <p class="mb-6">Sorry! The candidate you're looking for could not be found.</p>
    </section>

    <CandidateDetail v-else :candidate="candidate" />
  </div>
</template>
