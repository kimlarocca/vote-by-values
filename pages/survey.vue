<template>
  <ClientOnly>
    <SurveyComponent :model="survey" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { Model } from "survey-core"
import "survey-core/survey-core.min.css"

definePageMeta({
  layout: "blank",
})

// Dynamic import for survey-vue3-ui to avoid SSR issues
const SurveyComponent = defineAsyncComponent(() =>
  import("survey-vue3-ui").then(
    (m) => m.SurveyComponent || m.default?.SurveyComponent || m.default
  )
)

const json = {
  surveyId: "be7196bc-3e95-44d4-bdb9-1c983ac8c056",
  surveyPostId: "700905ee-4e2f-4271-8ade-0da59dabc23d",
}
const surveyServiceUrl = "https://api.surveyjs.io/public/v1/Survey"
const surveyIOMaxPostSize = 65536

function loadSurvey(survey: Model, surveyId: string) {
  survey.beginLoading()
  fetch(surveyServiceUrl + "/getSurvey?surveyId=" + surveyId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      }
      throw new Error("Could not load the survey JSON schema")
    })
    .then((data) => {
      survey.fromJSON(data)
      survey.endLoading()
    })
    .catch((error) => console.log(error))
}

function postResults(survey: Model, options: any, surveyPostId: string) {
  const resultAsStr = JSON.stringify(survey.data)
  // Display an error if survey results exceed the maximum post size
  if (resultAsStr.length >= surveyIOMaxPostSize) {
    options.showSaveError(survey.getLocalizationString("savingExceedSize"))
    return
  }
  // Display the "Saving..." message (pass a string value to display a custom message)
  options.showSaveInProgress()
  const dataObj = { postId: surveyPostId, surveyResult: resultAsStr }
  const dataStr = JSON.stringify(dataObj)
  const headers = new Headers({ "Content-Type": "application/json; charset=utf-8" })
  fetch(surveyServiceUrl + "/post/", {
    method: "POST",
    body: dataStr,
    headers: headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not post the survey results")
      }
      // Display the "Success" message (pass a string value to display a custom message)
      options.showSaveSuccess()
      // Alternatively, you can clear all messages:
      // options.clearSaveMessages();
    })
    .catch((error) => {
      // Display the "Error" message (pass a string value to display a custom message)
      options.showSaveError()
      console.log(error)
    })
}

const survey = new Model()
survey.onComplete.add((sender: any, options: any) => {
  console.log(JSON.stringify(sender.data, null, 3))
})
loadSurvey(survey, json.surveyId)
survey.onComplete.add((survey: any, options: any) => {
  postResults(survey, options, json.surveyPostId)
})
</script>
