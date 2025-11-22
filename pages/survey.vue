<template>
  <ClientOnly>
    <SurveyComponent :model="survey" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Model } from "survey-core"
import "survey-core/survey-core.min.css"
import { json } from "~/assets/json.js"

definePageMeta({
  layout: "blank",
})

// Dynamic import for survey-vue3-ui to avoid SSR issues
const SurveyComponent = defineAsyncComponent(() =>
  import("survey-vue3-ui").then(
    (m) => m.SurveyComponent || m.default?.SurveyComponent || m.default
  )
)

const survey = new Model(json)
survey.onComplete.add((sender, options) => {
  console.log(JSON.stringify(sender.data, null, 3))
})
</script>
