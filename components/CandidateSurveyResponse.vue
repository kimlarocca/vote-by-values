<script setup>
import surveyData from "~/survey.json"

const props = defineProps({
  surveyResponse: {
    type: Object,
    required: true,
  },
})

// Create a map of question names to their full question text
const questionMap = computed(() => {
  const map = {}
  surveyData.pages.forEach((page) => {
    page.elements.forEach((element) => {
      if (element.name && element.title) {
        map[element.name] = {
          title: element.title,
          choices: element.choices || [],
          page: page.title,
        }
      }
    })
  })
  return map
})

// Group responses by page/section
const groupedResponses = computed(() => {
  const groups = {}

  Object.keys(props.surveyResponse).forEach((key) => {
    // Skip metadata fields and candidate code
    if (key === "HappendAt" || key === "InstanceId" || key.startsWith("question100"))
      return

    // Handle comment fields
    if (key.endsWith("-Comment")) {
      const questionKey = key.replace("-Comment", "")
      const questionData = questionMap.value[questionKey]
      if (questionData) {
        const page = questionData.page
        if (!groups[page]) groups[page] = []

        const existingQuestion = groups[page].find((q) => q.question === questionKey)
        if (existingQuestion) {
          existingQuestion.comment = props.surveyResponse[key]
        }
      }
      return
    }

    const questionData = questionMap.value[key]
    if (questionData) {
      const page = questionData.page
      if (!groups[page]) groups[page] = []

      const answer = props.surveyResponse[key]
      const answerLabel = getAnswerLabel(answer, questionData.choices)

      groups[page].push({
        question: key,
        title: questionData.title,
        answer: answer,
        answerLabel: answerLabel,
        comment: props.surveyResponse[`${key}-Comment`] || null,
      })
    }
  })

  return groups
})

const getAnswerLabel = (answer, choices) => {
  if (!answer) return "No Response"

  const choice = choices.find((c) => c.value === answer)
  return choice ? choice.text : answer
}

const getAnswerClass = (answer) => {
  if (!answer || answer === "nr") return "bg-gray-200 text-gray-700"
  if (answer === "yes" || answer === "yes-2") return "bg-green-100 text-green-800"
  if (answer === "no" || answer === "no-2") return "bg-red-100 text-red-800"
  return "bg-gray-200 text-gray-700"
}
</script>

<template>
  <div v-if="surveyResponse" class="survey-response">
    <h2 class="mb-6">Survey Responses</h2>

    <div
      v-for="(responses, section) in groupedResponses"
      :key="section"
      class="mb-8 border-1 rounded-xl border-black"
    >
      <h3 class="inline-block bg-black text-white px-4 py-2 rounded-tl-xl rounded-br-xl">
        {{ section }}
      </h3>

      <div class="space-y-4 p-6">
        <div
          v-for="response in responses"
          :key="response.question"
          class="bg-white rounded-lg p-4"
        >
          <p class="font-semibold mb-2">{{ response.title }}</p>
          <div class="flex items-start gap-3">
            <span
              class="inline-block px-3 py-1 rounded-full text-sm font-medium"
              :class="getAnswerClass(response.answer)"
            >
              {{ response.answerLabel }}
            </span>
          </div>
          <p v-if="response.comment" class="mt-3 text-sm text-gray-700 italic">
            {{ response.comment }}
          </p>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(groupedResponses).length === 0" class="text-center py-8">
      <p class="text-gray-500">No survey responses available.</p>
    </div>
  </div>
</template>
