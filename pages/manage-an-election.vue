<script setup>
onMounted(() => {
  // Load the NoteForm embed script
  const script = document.createElement("script")
  script.type = "text/javascript"
  script.src = "https://noteforms.com/widgets/iframe.min.js"
  script.onload = () => {
    // Initialize the embed after script loads
    if (window.initEmbed) {
      window.initEmbed("votebyvalues-manage-an-election-tgerxf", { autoResize: true })
    }
  }
  document.head.appendChild(script)
})
</script>

<template>
  <div class="home container p-4">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Manage An Election</Title>
      </Head>
    </Html>
    <section class="text-center bg-white rounded-xl pb-8">
      <i class="pi pi-briefcase text-2xl mb-3" />
      <h1 class="text-center mb-5">Manage An Election</h1>
      <p class="text-center mb-6">
        Want to help your neighbors choose wisely? Fill out the form below and become an
        Election Manager!
      </p>
      <iframe
        aria-label="manage an election contact form"
        style="border: none; width: 100%; height: 650px"
        id="votebyvalues-manage-an-election-tgerxf"
        src="https://noteforms.com/forms/votebyvalues-manage-an-election-tgerxf"
      ></iframe>
    </section>
  </div>
</template>
