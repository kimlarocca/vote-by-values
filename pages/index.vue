<script setup>
const supabase = useSupabaseClient()

const candidates = ref([])
const loading = ref(true)

const getCandidates = async () => {
  const { data, error } = await supabase
    .from("candidates")
    .select(`*`)
    .eq("race", "NJ-11")
    .order("party")
    .order("name")
  if (error) {
    console.error(error)
  } else {
    candidates.value = data
  }
  loading.value = false
}

onMounted(async () => {
  getCandidates()
})
</script>

<template>
  <div class="home container p-4">
    <section class="text-center">
      <p class="like-h4 mb-2">Primary Polls Open In</p>
      <CountdownTimer end-date="2026-02-05T06:00:00-05:00" class="mb-4" />
      <h1 class="text-center mb-12">Choose wisely. Vote informed.</h1>
    </section>
    <Candidates :candidates="candidates" :loading="loading" />
  </div>
</template>
