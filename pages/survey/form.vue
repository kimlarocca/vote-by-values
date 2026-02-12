<script setup>
definePageMeta({
  ssr: false,
  layout: "blank",
})

const supabase = useSupabaseClient()

// Check if user is verified
const candidateInfo = ref(null)
const loading = ref(true)
const submitting = ref(false)
const surveyData = ref([])
const responses = ref({})
const currentCategoryIndex = ref(0)

// Autosave state
const saving = ref(false)
const saveError = ref(null)
const lastSaved = ref(null)
let saveTimeout = null

// Update last saved time display every 30 seconds
const lastSavedUpdateInterval = ref(null)

// Load candidate info from database using URL parameter
const loadCandidateInfo = async () => {
  // Get candidate ID from URL parameters
  const urlParams = new URLSearchParams(window.location.search)
  const candidateId = urlParams.get("id")

  if (!candidateId) {
    window.location.href = "/survey"
    return false
  }

  try {
    const { data, error } = await supabase
      .from("candidates")
      .select("id, name, candidate_code, race_slug, party")
      .eq("id", candidateId)
      .single()

    if (error || !data) {
      console.error("Error loading candidate:", error)
      window.location.href = "/survey"
      return false
    }

    candidateInfo.value = data
    return true
  } catch (err) {
    console.error("Error in loadCandidateInfo:", err)
    window.location.href = "/survey"
    return false
  }
}

onMounted(async () => {
  const candidateLoaded = await loadCandidateInfo()

  if (!candidateLoaded) return

  await loadSurveyQuestions()
  await loadExistingResponses()

  // Start interval to update "last saved" text
  lastSavedUpdateInterval.value = setInterval(() => {
    if (lastSaved.value) {
      // Force re-render by creating new date object
      lastSaved.value = new Date(lastSaved.value)
    }
  }, 30000) // Update every 30 seconds
})

// Load survey questions from database
const loadSurveyQuestions = async () => {
  loading.value = true

  const { data, error } = await supabase.rpc("get_survey_questions", {
    p_survey_id: 1,
  })

  if (error) {
    console.error("Error loading survey:", error)
    // Fallback to direct query if RPC doesn't exist
    await loadSurveyQuestionsDirect()
  } else {
    processSurveyData(data)
  }

  loading.value = false
}

// Direct query fallback
const loadSurveyQuestionsDirect = async () => {
  try {
    // Load categories first
    const { data: categories, error: catError } = await supabase
      .from("survey-categories")
      .select("*")
      .order("sort_order", { ascending: true })

    if (catError) {
      console.error("Error loading categories:", catError)
      return
    }

    // Load questions
    const { data: questions, error: qError } = await supabase
      .from("survey-questions")
      .select("*")
      .eq("survey_id", 1)
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

    // Create category lookup
    const categoryMap = {}
    categories.forEach((cat) => {
      categoryMap[cat.id] = cat
    })

    // Group questions by category
    const grouped = {}

    questions.forEach((q) => {
      const category = categoryMap[q.category_id]
      if (!category) return

      const categoryKey = category.slug

      if (!grouped[categoryKey]) {
        grouped[categoryKey] = {
          name: category.name,
          title: category.title,
          slug: category.slug,
          sort_order: category.sort_order,
          questions: [],
        }
      }

      const questionChoices = choices?.filter((c) => c.question_id === q.id) || []

      grouped[categoryKey].questions.push({
        id: q.id,
        question_key: q.question_key,
        question_type: q.question_type,
        title: q.title,
        description: q.description,
        show_comment_area: q.show_comment_area,
        comment_text: q.comment_text,
        sort_order: q.sort_order,
        choices: questionChoices,
      })
    })

    surveyData.value = Object.values(grouped).sort((a, b) => a.sort_order - b.sort_order)
  } catch (err) {
    console.error("Error in loadSurveyQuestionsDirect:", err)
  }
}

const processSurveyData = (data) => {
  // Group questions by category
  const grouped = {}

  data.forEach((item) => {
    const categorySlug = item.category_slug

    if (!grouped[categorySlug]) {
      grouped[categorySlug] = {
        name: item.category_name,
        title: item.category_title,
        slug: item.category_slug,
        sort_order: item.category_sort_order,
        questions: [],
      }
    }

    grouped[categorySlug].questions.push({
      id: item.question_id,
      question_key: item.question_key,
      question_type: item.question_type,
      title: item.question_title,
      description: item.description,
      show_comment_area: item.show_comment_area,
      comment_text: item.comment_text,
      sort_order: item.sort_order,
      choices: item.choices || [],
    })
  })

  surveyData.value = Object.values(grouped).sort((a, b) => a.sort_order - b.sort_order)
}

// Load existing responses if any
const loadExistingResponses = async () => {
  try {
    const { data, error } = await supabase
      .from("candidates")
      .select("survey_response")
      .eq("id", candidateInfo.value.id)
      .single()

    if (error) throw error

    if (data?.survey_response) {
      responses.value = { ...data.survey_response }
    }
  } catch (err) {
    console.error("Error loading existing responses:", err)
  }
}

// Autosave function with debouncing
const autoSave = async () => {
  saving.value = true
  saveError.value = null

  try {
    const { error } = await supabase
      .from("candidates")
      .update({ survey_response: responses.value })
      .eq("id", candidateInfo.value.id)

    if (error) throw error

    lastSaved.value = new Date()
  } catch (err) {
    console.error("Autosave error:", err)
    saveError.value = "Failed to save"
  } finally {
    saving.value = false
  }
}

// Debounced autosave - waits 1 second after last change
const debouncedAutoSave = () => {
  if (saveTimeout) clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    autoSave()
  }, 1000)
}

// Watch for response changes and trigger autosave
watch(
  responses,
  () => {
    debouncedAutoSave()
  },
  { deep: true }
)

// Cleanup on unmount
onUnmounted(() => {
  if (saveTimeout) clearTimeout(saveTimeout)
  if (lastSavedUpdateInterval.value) clearInterval(lastSavedUpdateInterval.value)
})

// Format last saved time
const lastSavedText = computed(() => {
  if (!lastSaved.value) return ""
  const minutes = Math.floor((new Date() - lastSaved.value) / 60000)
  if (minutes === 0) return "Saved just now"
  if (minutes === 1) return "Saved 1 minute ago"
  return `Saved ${minutes} minutes ago`
})

// Current category
const currentCategory = computed(() => {
  return surveyData.value[currentCategoryIndex.value] || null
})

// Navigation
const canGoBack = computed(() => currentCategoryIndex.value > 0)
const canGoNext = computed(() => currentCategoryIndex.value < surveyData.value.length - 1)
const isLastCategory = computed(
  () => currentCategoryIndex.value === surveyData.value.length - 1
)

const goToCategory = (index) => {
  currentCategoryIndex.value = index
  window.scrollTo({ top: 0, behavior: "smooth" })
}

const nextCategory = () => {
  if (canGoNext.value) {
    currentCategoryIndex.value++
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

const previousCategory = () => {
  if (canGoBack.value) {
    currentCategoryIndex.value--
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

// Progress
const totalQuestions = computed(() => {
  return surveyData.value.reduce((total, category) => {
    return total + (category.questions?.length || 0)
  }, 0)
})

const answeredQuestions = computed(() => {
  return Object.keys(responses.value).filter((key) => {
    const value = responses.value[key]
    // Count as answered if it has a value (for radio/select) or text content (for textarea)
    return value !== null && value !== undefined && value !== ""
  }).length
})

const progress = computed(() => {
  if (totalQuestions.value === 0) return 0
  return Math.round((answeredQuestions.value / totalQuestions.value) * 100)
})

// Submit survey
const submitSurvey = async () => {
  submitting.value = true

  try {
    // Final save before submission
    await autoSave()

    // Redirect to success
    window.location.href = "/survey/success"
  } catch (err) {
    console.error("Error submitting survey:", err)
    alert("There was an error submitting your survey. Please try again.")
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="home container p-4">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Candidate Survey</Title>
      </Head>
    </Html>

    <!-- Loading State -->
    <div v-if="loading" class="text-center bg-white rounded-xl p-8">
      <ProgressSpinner />
      <p class="mt-4">Loading survey...</p>
    </div>

    <!-- Survey Form -->
    <div v-else-if="candidateInfo && surveyData.length > 0">
      <!-- Header -->
      <section class="text-center bg-white rounded-xl p-6 mb-6">
        <Logo class="m-auto mb-4" />
        <h1 class="mb-3">Candidate Survey: {{ candidateInfo.name }}</h1>
        <p class="text-sm text-gray-500 mt-2 flex items-center justify-center gap-1">
          <i class="pi pi-info-circle" />
          Your responses are automatically saved as you answer
        </p>
      </section>

      <!-- Progress Bar & Save Status -->
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <span class="text-sm font-semibold">Progress</span>
          <div class="flex items-center gap-3">
            <!-- Save Status -->
            <span v-if="saving" class="text-sm text-gray-600 flex items-center gap-1">
              <i class="pi pi-spin pi-spinner" />
              Saving...
            </span>
            <button
              v-else-if="saveError"
              @click="autoSave"
              class="text-sm text-red-600 flex items-center gap-1 hover:text-red-700 cursor-pointer"
              title="Click to retry"
            >
              <i class="pi pi-exclamation-circle" />
              {{ saveError }} - Retry
            </button>
            <span
              v-else-if="lastSaved"
              class="text-sm text-green-600 flex items-center gap-1"
            >
              <i class="pi pi-check" />
              {{ lastSavedText }}
            </span>
            <span class="text-sm text-gray-600">
              {{ answeredQuestions }} Questions Answered
            </span>
          </div>
        </div>
        <ProgressBar :value="progress" />
      </div>

      <!-- Main Content with Sidebar Layout -->
      <div class="flex flex-col lg:flex-row gap-6 mb-6">
        <!-- Category Sidebar Navigation -->
        <aside class="category-sidebar hidden lg:block">
          <nav class="space-y-2">
            <p
              v-for="(category, index) in surveyData"
              :key="category.slug"
              @click="goToCategory(index)"
              :class="[
                'w-full p-2 rounded-lg text-sm',
                index === currentCategoryIndex
                  ? 'bg-black text-white font-semibold'
                  : 'bg-white border-black text-black hover:bg-gray-100',
              ]"
            >
              {{ index + 1 }}. {{ category.title }}
            </p>
          </nav>
        </aside>

        <!-- Mobile Category Dropdown (shown on smaller screens) -->
        <div class="lg:hidden w-full mb-4">
          <select
            v-model="currentCategoryIndex"
            @change="goToCategory(currentCategoryIndex)"
            class="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option
              v-for="(category, index) in surveyData"
              :key="category.slug"
              :value="index"
            >
              {{ index + 1 }}. {{ category.title }}
            </option>
          </select>
        </div>

        <!-- Current Category Questions -->
        <div v-if="currentCategory" class="flex-1 bg-white rounded-xl p-6">
          <h2 class="mb-6">{{ currentCategory.title }}</h2>

          <div class="space-y-8">
            <div
              v-for="question in currentCategory.questions"
              :key="question.question_key"
              class="question-block"
            >
              <!-- Question Title -->
              <label class="block font-semibold mb-3">
                {{ question.title }}
              </label>

              <!-- Radio Group Questions -->
              <div v-if="question.question_type === 'radiogroup'" class="space-y-2">
                <div
                  v-for="choice in question.choices"
                  :key="choice.value"
                  class="flex items-center"
                >
                  <RadioButton
                    v-model="responses[question.question_key]"
                    :inputId="`${question.question_key}-${choice.value}`"
                    :value="choice.value"
                    :name="question.question_key"
                  />
                  <label
                    :for="`${question.question_key}-${choice.value}`"
                    class="ml-2 cursor-pointer"
                  >
                    {{ choice.text }}
                  </label>
                </div>
              </div>

              <!-- Comment Area -->
              <div v-if="question.show_comment_area" class="mt-4">
                <label class="block text-sm font-medium mb-2">
                  {{ question.comment_text || "Additional Comments" }}
                </label>
                <Textarea
                  v-model="responses[`${question.question_key}-Comment`]"
                  rows="3"
                  class="w-full"
                  placeholder="Provide your nuanced position..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between items-center gap-4">
        <Button
          v-if="canGoBack"
          label="Previous"
          icon="pi pi-arrow-left"
          @click="previousCategory"
          outlined
        />
        <div v-else />

        <Button
          v-if="!isLastCategory"
          label="Next"
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="nextCategory"
        />
        <Button
          v-else
          label="Submit Survey"
          icon="pi pi-check"
          iconPos="right"
          @click="submitSurvey"
          :loading="submitting"
          severity="success"
        />
      </div>
    </div>

    <!-- Error State -->
    <section v-else class="text-center bg-white rounded-xl p-8">
      <i class="pi pi-exclamation-triangle text-4xl text-red-500 mb-4" />
      <h2 class="mb-4">Unable to Load Survey</h2>
      <p class="mb-4">There was an error loading the survey questions.</p>
      <Button
        label="Return to Start"
        icon="pi pi-arrow-left"
        @click="window.location.href = '/survey'"
      />
    </section>
  </div>
</template>

<style scoped>
.question-block {
  padding-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
}

.question-block:last-child {
  border-bottom: none;
}

.category-sidebar {
  width: 280px;
  position: sticky;
  top: 20px;
  flex-shrink: 0;
}

.category-sidebar::-webkit-scrollbar {
  width: 6px;
}

.category-sidebar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.category-sidebar::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.category-sidebar::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.bg-primary {
  background-color: var(--primary-color);
}
</style>
