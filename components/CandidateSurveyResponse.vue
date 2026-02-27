<script setup>
import surveyData from "~/survey.json"

const supabase = useSupabaseClient()

const props = defineProps({
  surveyResponse: {
    type: Object,
    required: true,
  },
  candidate: {
    type: Object,
    required: true,
  },
})

const loading = ref(true)
const surveyQuestions = ref([])
const surveyCategories = ref([])

// Load survey questions from database
const loadSurveyQuestions = async () => {
  loading.value = true

  try {
    // Load categories
    const { data: categories, error: catError } = await supabase
      .from("survey-categories")
      .select("*")
      .order("sort_order", { ascending: true })

    if (catError) {
      console.error("Error loading categories:", catError)
      return
    }

    surveyCategories.value = categories || []

    // Find relevant survey IDs
    const surveyIds = [1] // National survey

    // State-specific survey
    if (props.candidate.state) {
      const { data: stateSurvey } = await supabase
        .from("surveys")
        .select("id")
        .eq("state", props.candidate.state)
        .single()

      if (stateSurvey) {
        surveyIds.push(stateSurvey.id)
      }
    }

    // Race-specific survey
    if (props.candidate.race_slug) {
      const { data: raceSurvey } = await supabase
        .from("surveys")
        .select("id")
        .eq("race_slug", props.candidate.race_slug)
        .single()

      if (raceSurvey) {
        surveyIds.push(raceSurvey.id)
      }
    }

    // Load questions
    const orConditions = surveyIds.map((id) => `survey_id.eq.${id}`).join(",")
    const { data: questions, error: qError } = await supabase
      .from("survey-questions")
      .select("*")
      .or(orConditions)
      .order("sort_order", { ascending: true })

    if (qError) {
      console.error("Error loading questions:", qError)
      return
    }

    // Load choices
    const { data: choices, error: cError } = await supabase
      .from("survey-choices")
      .select("*")
      .order("sort_order", { ascending: true })

    if (cError) {
      console.error("Error loading choices:", cError)
      return
    }

    // Attach choices to questions
    surveyQuestions.value = (questions || []).map((q) => ({
      ...q,
      choices: (choices || []).filter((c) => c.question_id === q.id),
    }))
  } catch (err) {
    console.error("Error loading survey questions:", err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadSurveyQuestions()
})

// Create a map of question IDs to their full question data (for new numeric ID format)
const questionMap = computed(() => {
  const map = {}
  const categoryMap = {}

  surveyCategories.value.forEach((cat) => {
    categoryMap[cat.id] = cat
  })

  surveyQuestions.value.forEach((question) => {
    const category = categoryMap[question.category_id]
    map[question.id] = {
      title: question.title,
      choices: question.choices || [],
      page: category?.title || "Other",
    }
  })

  return map
})

// Create a map for legacy question keys (for old "question1" format)
const legacyQuestionMap = computed(() => {
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

      // Try numeric ID first (new format)
      const questionId = parseInt(questionKey)
      let questionData = !isNaN(questionId) ? questionMap.value[questionId] : null

      // Fall back to legacy format
      if (!questionData) {
        questionData = legacyQuestionMap.value[questionKey]
      }

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

    // Try numeric ID first (new format)
    const questionId = parseInt(key)
    let questionData = !isNaN(questionId) ? questionMap.value[questionId] : null

    // Fall back to legacy format
    if (!questionData) {
      questionData = legacyQuestionMap.value[key]
    }

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
  if (!answer || answer === "nr" || answer === "no-response")
    return "bg-gray-200 text-gray-700"
  if (
    answer === "yes" ||
    answer === "yes-2" ||
    answer === "yes-3" ||
    answer === "yes-4" ||
    answer === "yes-5"
  )
    return "bg-green-100 text-green-800"
  if (
    answer === "no" ||
    answer === "no-2" ||
    answer === "no-3" ||
    answer === "no-4" ||
    answer === "no-5"
  )
    return "bg-red-100 text-red-800"
  return "bg-gray-200 text-gray-700"
}
</script>

<template>
  <div v-if="surveyResponse" class="survey-response">
    <h2 class="mb-6">Survey Responses</h2>

    <div v-if="loading" class="text-center py-8">
      <p class="text-gray-500">Loading survey questions...</p>
    </div>

    <div v-else>
      <div
        v-for="(responses, section) in groupedResponses"
        :key="section"
        class="mb-8 border-1 rounded-xl border-black"
      >
        <h3
          class="inline-block bg-black text-white px-4 py-2 rounded-tl-xl rounded-br-xl"
        >
          {{ section }}
        </h3>

        <div class="space-y-4 p-6">
          <div
            v-for="response in responses"
            :key="response.question"
            class="bg-white-opacity-70 rounded-lg p-4"
          >
            <p class="font-semibold mb-2">{{ response.title }}</p>
            <div class="flex items-start gap-3">
              <span
                class="inline-block px-3 py-1 rounded-xl text-sm font-medium"
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
  </div>
</template>
