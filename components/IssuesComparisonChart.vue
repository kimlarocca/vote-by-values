<script setup>
import surveyData from "~/survey.json"

const props = defineProps({
  candidates: {
    type: Array,
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

// Get all yes/no questions that at least one candidate has answered
const yesNoQuestions = computed(() => {
  const questions = []
  const questionKeys = new Set()

  // Collect all questions that have yes/no/nr responses from any candidate
  props.candidates.forEach((candidate) => {
    if (!candidate.survey_response) return

    Object.keys(candidate.survey_response).forEach((key) => {
      // Skip metadata and comment fields
      if (
        key === "HappendAt" ||
        key === "InstanceId" ||
        key.startsWith("question100") ||
        key.endsWith("-Comment")
      )
        return

      const questionData = questionMap.value[key]
      if (questionData) {
        // Check if this is a yes/no question
        const hasYesNoChoices = questionData.choices.some(
          (choice) =>
            choice.value === "yes" ||
            choice.value === "no" ||
            choice.value === "yes-2" ||
            choice.value === "no-2" ||
            choice.value === "nr"
        )

        if (hasYesNoChoices && !questionKeys.has(key)) {
          questionKeys.add(key)
          questions.push({
            key: key,
            title: questionData.title,
            page: questionData.page,
          })
        }
      }
    })
  })

  return questions
})

// Group questions by section/page
const groupedQuestions = computed(() => {
  const groups = {}

  yesNoQuestions.value.forEach((question) => {
    if (!groups[question.page]) {
      groups[question.page] = []
    }
    groups[question.page].push(question)
  })

  return groups
})

// Get a candidate's response for a specific question
const getResponse = (candidate, questionKey) => {
  if (!candidate.survey_response) return null
  return candidate.survey_response[questionKey] || null
}

// Check if answer is a yes/no type response
const isYesNoResponse = (answer) => {
  return (
    answer === "yes" ||
    answer === "yes-2" ||
    answer === "no" ||
    answer === "no-2" ||
    answer === "nr"
  )
}

// Get the text label for a response from choices
const getResponseLabel = (answer, questionKey) => {
  if (!answer) return null

  const questionData = questionMap.value[questionKey]
  if (!questionData) return answer

  const choice = questionData.choices.find((c) => c.value === answer)
  return choice ? choice.text : answer
}

// Get the icon class for an answer
const getAnswerIcon = (answer) => {
  if (answer === "yes" || answer === "yes-2") return "pi pi-check-circle"
  if (answer === "no" || answer === "no-2") return "pi pi-times-circle"
  return null
}

// Get styling class for an answer
const getAnswerClass = (answer) => {
  if (answer === "yes" || answer === "yes-2") return "text-green-600"
  if (answer === "no" || answer === "no-2") return "text-red-600"
  return ""
}

// Check if there's a valid response
const hasResponse = (answer) => {
  return answer && answer !== "nr"
}
</script>

<template>
  <div
    v-if="candidates.length > 0 && yesNoQuestions.length > 0"
    class="issues-comparison-chart"
  >
    <h2 class="like-h1 mb-6 text-center">Candidate Issues</h2>

    <div
      v-for="(questions, section) in groupedQuestions"
      :key="section"
      class="mb-8 border-1 rounded-xl border-black overflow-hidden"
    >
      <p class="inline-block bg-black text-white px-4 py-2 w-full">
        {{ section }}
      </p>

      <div class="overflow-x-auto">
        <table class="w-full bg-white">
          <thead>
            <tr class="bg-gray-100">
              <th
                class="text-left p-4 font-semibold sticky left-0 bg-gray-100 z-10 min-w-[400px]"
              >
                Issue
              </th>
              <th
                v-for="candidate in candidates"
                :key="candidate.id"
                class="text-center p-4 font-semibold min-w-[150px]"
              >
                <div class="flex flex-col items-center gap-1">
                  <span>{{ candidate.name }}</span>
                  <span
                    v-if="candidate.party"
                    class="text-xs font-normal text-gray-600"
                    >{{ candidate.party }}</span
                  >
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="question in questions"
              :key="question.key"
              class="border-t border-gray-200 hover:bg-gray-50"
            >
              <td class="p-4 text-sm sticky left-0 bg-white z-10 min-w-[400px]">
                {{ question.title }}
              </td>
              <td
                v-for="candidate in candidates"
                :key="candidate.id"
                class="p-4 text-center bg-white"
              >
                <i
                  v-if="
                    hasResponse(getResponse(candidate, question.key)) &&
                    isYesNoResponse(getResponse(candidate, question.key))
                  "
                  :class="[
                    getAnswerIcon(getResponse(candidate, question.key)),
                    getAnswerClass(getResponse(candidate, question.key)),
                  ]"
                  class="text-2xl"
                ></i>
                <span
                  v-else-if="hasResponse(getResponse(candidate, question.key))"
                  class="text-sm"
                >
                  {{
                    getResponseLabel(getResponse(candidate, question.key), question.key)
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="Object.keys(groupedQuestions).length === 0" class="text-center py-8">
      <p class="text-gray-500">No survey responses available for comparison.</p>
    </div>
  </div>
</template>

<style scoped>
.issues-comparison-chart table {
  border-collapse: separate;
  border-spacing: 0;
}

.issues-comparison-chart thead th.sticky {
  position: sticky;
  left: 0;
  z-index: 10;
}

.issues-comparison-chart tbody td.sticky {
  position: sticky;
  left: 0;
  z-index: 5;
}
</style>
