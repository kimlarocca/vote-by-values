<script setup>
onMounted(() => {
  const script = document.createElement("script")
  script.src = "https://noteforms.com/widgets/iframe.min.js"
  script.onload = () => {
    if (window.initEmbed) {
      window.initEmbed("votebyvalues-suggestions-9lm10t")
    }
  }
  document.body.appendChild(script)
})
</script>

<template>
  <div class="home container p-4">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Suggest a Race</Title>
      </Head>
    </Html>
    <section class="text-center bg-white rounded-xl pb-8">
      <i class="pi pi-plus text-2xl mb-3" />
      <h1 class="text-center mb-5">Suggest a Race</h1>
      <p class="max-w-2xl m-auto">
        We starting small, but do you want to see a local election here? Share some
        details.
      </p>
      <iframe
        title="Suggest a Race Form"
        style="border: none; width: 100%; height: 800px"
        id="votebyvalues-suggestions-9lm10t"
        src="https://noteforms.com/forms/votebyvalues-suggestions-9lm10t"
      ></iframe>
    </section>
  </div>
</template>
