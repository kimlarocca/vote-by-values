<script setup>
const props = defineProps({
  topic: {
    type: String,
    required: true
  }
})
const issueDescription = issues.find(issue => issue.topic === props.topic)
</script>
<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
    <div class="py-4 px-12">
      <h1 class="mb-4" v-html="issueDescription?.topic" />
      <p v-html="issueDescription?.blurb" />
    </div>

    <div class="hidden lg:block text-right">
      <img
        src="/images/PuppetJack.jpg"
        alt="Donald Trump's Puppet - Jack the Flipper"
        class="w-full lg:w-fit pb-6"
      />
    </div>
  </div>
</template>
