<script setup>
definePageMeta({
  ssr: false,
  layout: 'blank',
})
// No router needed - using native navigation
</script>

<template>
  <div class="home container p-4">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Survey Complete</Title>
      </Head>
    </Html>

    <section class="text-center bg-white rounded-xl p-8 max-w-2xl m-auto">
      <i class="pi pi-check-circle text-6xl text-green-500 mb-6" />
      <h1 class="mb-6">Thank You!</h1>
      
      <p class="text-lg mb-4">
        Your survey responses have been successfully submitted.
      </p>
      
      <p class="text-gray-600 mb-8">
        Your positions on these important issues will help voters make informed decisions. 
        We appreciate you taking the time to share your views.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          label="Return to Home"
          icon="pi pi-home"
          @click="window.location.href = '/'"
        />
      </div>
    </section>
  </div>
</template>
