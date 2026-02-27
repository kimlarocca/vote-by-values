<script setup>
import surveyData from "~/survey.json"

const supabase = useSupabaseClient()

const props = defineProps({
  candidates: {
    type: Array,
    required: true,
  },
  initialKeywords: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    default: "",
  },
  raceSlug: {
    type: String,
    default: "",
  },
  showQuickFilters: {
    type: Boolean,
    default: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Load database questions
const dbQuestions = ref([])
const dbCategories = ref([])
const dbChoices = ref([])

const loadDatabaseQuestions = async () => {
  try {
    // Load categories
    const { data: categories } = await supabase
      .from("survey-categories")
      .select("*")
      .order("sort_order", { ascending: true })

    dbCategories.value = categories || []

    // Load questions (national + all state surveys)
    const { data: questions } = await supabase
      .from("survey-questions")
      .select("*")
      .order("sort_order", { ascending: true })

    dbQuestions.value = questions || []

    // Load choices
    const { data: choices } = await supabase
      .from("survey-choices")
      .select("*")
      .order("sort_order", { ascending: true })

    dbChoices.value = choices || []
  } catch (err) {
    console.error("Error loading database questions:", err)
  }
}

onMounted(() => {
  loadDatabaseQuestions()
})

// Create a map of question names to their full question text
// Now supports both legacy (survey.json) and new database format
const questionMap = computed(() => {
  const map = {}

  // Legacy survey.json format (for backward compatibility)
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

  // New database format - use "question{id}" as key
  dbQuestions.value.forEach((question) => {
    const category = dbCategories.value.find((c) => c.id === question.category_id)
    const questionChoices = dbChoices.value.filter((c) => c.question_id === question.id)

    const key = `question${question.id}`
    map[key] = {
      title: question.title,
      choices: questionChoices.map((c) => ({
        value: c.value,
        text: c.text,
      })),
      page: category?.title || "Other",
      sortOrder: question.sort_order || 0,
      categoryOrder: category?.sort_order || 0,
    }
  })

  return map
})

// Helper function to convert category name to slug
const getCategorySlug = (categoryName) => {
  return categoryName.toLowerCase().replace(/[^a-z0-9]+/g, "-")
}

// Get all yes/no questions from the database
const yesNoQuestions = computed(() => {
  const questions = []

  // Get all questions from the questionMap that have yes/no choices
  Object.keys(questionMap.value).forEach((key) => {
    const questionData = questionMap.value[key]

    // Check if this is a yes/no question
    const hasYesNoChoices = questionData.choices.some(
      (choice) =>
        choice.value === "yes" ||
        choice.value === "no" ||
        choice.value === "yes-2" ||
        choice.value === "yes-3" ||
        choice.value === "yes-4" ||
        choice.value === "yes-5" ||
        choice.value === "no-2" ||
        choice.value === "no-3" ||
        choice.value === "no-4" ||
        choice.value === "no-5" ||
        choice.value === "nr" ||
        choice.value === "no-response"
    )

    if (hasYesNoChoices) {
      questions.push({
        key: key,
        title: questionData.title,
        page: questionData.page,
        sortOrder: questionData.sortOrder || 0,
        categoryOrder: questionData.categoryOrder || 0,
      })
    }
  })

  // Sort questions by category order, then by question sort order
  return questions.sort((a, b) => {
    if (a.categoryOrder !== b.categoryOrder) {
      return a.categoryOrder - b.categoryOrder
    }
    return a.sortOrder - b.sortOrder
  })
})

// Group questions by section/page
const groupedQuestions = computed(() => {
  const groups = {}

  yesNoQuestions.value.forEach((question) => {
    // If a category is specified, only include questions from that category
    if (props.category && question.page !== props.category) {
      return
    }

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

  // Try the key as-is first
  if (candidate.survey_response[questionKey]) {
    return candidate.survey_response[questionKey]
  }

  // If key is "question{number}", try just the number
  if (questionKey.startsWith("question")) {
    const numericKey = questionKey.replace("question", "")
    return candidate.survey_response[numericKey] || null
  }

  return null
}

// Check if answer is a yes/no type response
const isYesNoResponse = (answer) => {
  return (
    answer === "yes" ||
    answer === "yes-2" ||
    answer === "yes-3" ||
    answer === "yes-4" ||
    answer === "yes-5" ||
    answer === "no" ||
    answer === "no-2" ||
    answer === "no-3" ||
    answer === "no-4" ||
    answer === "no-5" ||
    answer === "nr" ||
    answer === "no-response"
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
  if (
    answer === "yes" ||
    answer === "yes-2" ||
    answer === "yes-3" ||
    answer === "yes-4" ||
    answer === "yes-5"
  )
    return "pi pi-check-circle"
  if (
    answer === "no" ||
    answer === "no-2" ||
    answer === "no-3" ||
    answer === "no-4" ||
    answer === "no-5"
  )
    return "pi pi-times-circle"
  return null
}

// Get styling class for an answer
const getAnswerClass = (answer) => {
  if (
    answer === "yes" ||
    answer === "yes-2" ||
    answer === "yes-3" ||
    answer === "yes-4" ||
    answer === "yes-5"
  )
    return "text-green-600"
  if (
    answer === "no" ||
    answer === "no-2" ||
    answer === "no-3" ||
    answer === "no-4" ||
    answer === "no-5"
  )
    return "text-red-600"
  return ""
}

// Check if there's a valid response
const hasResponse = (answer) => {
  return answer && answer !== "nr" && answer !== "no-response"
}

// Get comment for a specific question
const getComment = (candidate, questionKey) => {
  if (!candidate.survey_response) return null

  // Try the key as-is first
  let commentKey = `${questionKey}-Comment`
  if (candidate.survey_response[commentKey]) {
    return candidate.survey_response[commentKey]
  }

  // If key is \"question{number}\", try just the number
  if (questionKey.startsWith("question")) {
    const numericKey = questionKey.replace("question", "")
    commentKey = `${numericKey}-Comment`
    return candidate.survey_response[commentKey] || null
  }

  return null
}

// Check if candidate has a comment for a question
const hasComment = (candidate, questionKey) => {
  const comment = getComment(candidate, questionKey)
  return comment && comment.trim() !== ""
}

// Dialog state for showing comments
const commentDialogVisible = ref(false)
const currentComment = ref(null)

// Show comment dialog
const showComment = (candidate, questionKey) => {
  const comment = getComment(candidate, questionKey)
  if (comment) {
    currentComment.value = {
      candidateName: candidate.name,
      questionTitle: questionMap.value[questionKey]?.title || "",
      comment: comment,
    }
    commentDialogVisible.value = true
  }
}

// Dialog state for showing answer details
const answerDialogVisible = ref(false)
const currentAnswer = ref(null)

// Show answer detail dialog
const showAnswerDetail = (candidate, questionKey) => {
  const answer = getResponse(candidate, questionKey)
  if (answer) {
    const comment = getComment(candidate, questionKey)
    currentAnswer.value = {
      candidateName: candidate.name,
      questionTitle: questionMap.value[questionKey]?.title || "",
      answerText: getResponseLabel(answer, questionKey),
      comment: comment && comment.trim() !== "" ? comment : null,
    }
    answerDialogVisible.value = true
  }
}

// Search keyword
const searchKeyword = ref(props.initialKeywords)

// Quick filter options from database
const quickFilters = ref([])

// Fetch quick filters from settings
const fetchQuickFilters = async () => {
  const { data, error } = await supabase
    .from("vote-by-values-settings")
    .select("issue_quick_filters")
    .eq("id", 1)
    .single()

  if (error) {
    console.error("Error fetching quick filters:", error)
  } else if (data?.issue_quick_filters) {
    quickFilters.value = data.issue_quick_filters
  }
}

// Fetch filters on mount
onMounted(() => {
  fetchQuickFilters()
})

// Apply quick filter
const applyQuickFilter = (keyword) => {
  searchKeyword.value = keyword
}

// Filtered candidates from the filter component
const filteredCandidates = ref([])

// Update filtered candidates when filters change
const updateFilteredCandidates = (filtered) => {
  filteredCandidates.value = filtered
}

// Use filtered candidates for comparison, fallback to all candidates
const displayedCandidates = computed(() => {
  return filteredCandidates.value.length > 0 ? filteredCandidates.value : props.candidates
})

// Filter questions based on search keyword
const filteredGroupedQuestions = computed(() => {
  if (!searchKeyword.value.trim()) {
    return groupedQuestions.value
  }

  const keyword = searchKeyword.value.toLowerCase()
  const filtered = {}

  Object.keys(groupedQuestions.value).forEach((section) => {
    const matchingQuestions = groupedQuestions.value[section].filter((question) =>
      question.title.toLowerCase().includes(keyword)
    )

    if (matchingQuestions.length > 0) {
      filtered[section] = matchingQuestions
    }
  })

  return filtered
})

// Track expanded sections for mobile view
const expandedSections = ref(new Set())

// Initialize first section as expanded
onMounted(() => {
  const firstSection = Object.keys(groupedQuestions.value)[0]
  if (firstSection) {
    expandedSections.value.add(firstSection)
  }
})

// Toggle section expansion
const toggleSection = (section) => {
  if (expandedSections.value.has(section)) {
    expandedSections.value.delete(section)
  } else {
    expandedSections.value.add(section)
  }
}

// Check if section is expanded
const isSectionExpanded = (section) => {
  return expandedSections.value.has(section)
}

// Check if any candidate has responded to a question
const hasAnyResponse = (questionKey) => {
  return displayedCandidates.value.some((candidate) =>
    hasResponse(getResponse(candidate, questionKey))
  )
}

// Track hovered column for desktop hover highlighting
const hoveredColumnIndex = ref(null)

const setHoveredColumn = (index) => {
  hoveredColumnIndex.value = index
}

const clearHoveredColumn = () => {
  hoveredColumnIndex.value = null
}
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="text-center bg-white rounded-xl p-8">
    <i class="pi pi-spin pi-spinner text-4xl mb-4" />
    <p>Loading issues comparison...</p>
  </div>

  <div
    v-else-if="candidates.length > 0 && yesNoQuestions.length > 0"
    class="issues-comparison-chart"
  >
    <!-- Search and Filter Row -->
    <div class="mb-6 flex flex-col lg:flex-row justify-center items-center gap-2">
      Quick Filters:
      <div class="flex gap-3 items-center">
        <Button
          v-if="showQuickFilters"
          v-for="filter in quickFilters"
          :key="filter.keyword"
          :label="filter.label"
          class="outlined trim"
          @click="applyQuickFilter(filter.keyword)"
        />
      </div>
      <div class="flex gap-3 items-center">
        <!-- Search Input -->
        <div class="flex-1">
          <InputGroup>
            <InputText
              v-model="searchKeyword"
              placeholder="Filter by keyword..."
              class="w-full"
            />
            <InputGroupAddon>
              <Button icon="pi pi-search" severity="secondary" variant="text" />
            </InputGroupAddon>
            <InputGroupAddon v-if="searchKeyword">
              <Button
                icon="pi pi-times"
                severity="secondary"
                variant="text"
                @click="searchKeyword = ''"
              />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <!-- Candidate Filters -->
        <CandidateFilters
          :candidates="candidates"
          @update:filteredCandidates="updateFilteredCandidates"
        />
      </div>
    </div>

    <div
      v-for="(questions, section) in filteredGroupedQuestions"
      :key="section"
      class="mb-6 lg:mb-12 border-1 rounded-xl border-black section-container"
    >
      <p
        class="inline-block bg-black text-white font-bold p-4 w-full section-header"
        @click="toggleSection(section)"
      >
        <span class="flex items-center justify-between">
          <NuxtLink
            v-if="raceSlug"
            :to="`/race/${raceSlug}/categories/${getCategorySlug(section)}`"
            class="text-white font-bold cursor-pointer section-header"
          >
            <span>{{ section }}</span>
          </NuxtLink>
          <span v-else>{{ section }}</span>
          <i
            class="pi mobile-chevron"
            :class="isSectionExpanded(section) ? 'pi-chevron-up' : 'pi-chevron-down'"
          ></i>
        </span>
      </p>

      <!-- Desktop Table View -->
      <div class="overflow-x-auto desktop-view">
        <table class="bg-white table-fixed-mobile">
          <thead>
            <tr>
              <th
                class="bg-white sticky left-0 z-20 p-4 text-left font-semibold question-column"
              >
                Issue
              </th>
              <th
                v-for="(candidate, colIndex) in displayedCandidates"
                :key="candidate.id"
                class="text-center font-semibold candidate-header"
                :class="{ 'column-hover': hoveredColumnIndex === colIndex }"
                @mouseenter="setHoveredColumn(colIndex)"
                @mouseleave="clearHoveredColumn"
              >
                <div class="candidate-header-content">
                  <NuxtLink :to="`/${candidate.slug}`" class="plain">
                    <img
                      v-if="candidate.image"
                      :src="candidate.image"
                      :alt="candidate.name"
                      class="w-24 h-24 object-cover rounded-full mx-auto mb-2"
                    />
                    <div
                      v-else
                      class="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-2"
                    >
                      <i class="pi pi-user text-3xl text-gray-400" />
                    </div>
                    <span class="block text-xs candidate-name">{{ candidate.name }}</span>
                  </NuxtLink>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(question, qIndex) in questions"
              :key="question.key"
              class="border-t border-gray-200 table-row"
              :class="{ 'row-odd': qIndex % 2 === 0, 'row-even': qIndex % 2 !== 0 }"
            >
              <td class="p-4 text-sm sticky left-0 z-10 question-column table-cell">
                {{ question.title }}
              </td>
              <td
                v-for="(candidate, colIndex) in displayedCandidates"
                :key="candidate.id"
                class="text-center candidate-cell table-cell"
                :class="{ 'column-hover': hoveredColumnIndex === colIndex }"
                @mouseenter="setHoveredColumn(colIndex)"
                @mouseleave="clearHoveredColumn"
              >
                <div class="icon-wrapper">
                  <i
                    v-if="
                      hasResponse(getResponse(candidate, question.key)) &&
                      isYesNoResponse(getResponse(candidate, question.key))
                    "
                    :class="[
                      getAnswerIcon(getResponse(candidate, question.key)),
                      getAnswerClass(getResponse(candidate, question.key)),
                    ]"
                    class="text-2xl cursor-pointer"
                    @click="showAnswerDetail(candidate, question.key)"
                    v-tooltip="'View Answer Details'"
                  />
                  <p v-else>
                    <span
                      v-if="hasResponse(getResponse(candidate, question.key))"
                      class="text-sm"
                    >
                      {{
                        getResponseLabel(
                          getResponse(candidate, question.key),
                          question.key
                        )
                      }}
                    </span>
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Table View -->
      <div v-if="isSectionExpanded(section)" class="mobile-view bg-white">
        <div
          v-for="question in questions"
          :key="question.key"
          class="mobile-question-item p-4 border-b border-gray-200 last:border-b-0"
        >
          <p class="font-semibold mb-4">{{ question.title }}</p>
          <div v-if="!hasAnyResponse(question.key)" class="text-sm text-gray-500 italic">
            No candidates have responded to this question yet.
          </div>
          <div v-else class="space-y-3">
            <div v-for="candidate in displayedCandidates" :key="candidate.id">
              <!-- Yes/No Response: Image + Icon + Name -->
              <div
                v-if="
                  hasResponse(getResponse(candidate, question.key)) &&
                  isYesNoResponse(getResponse(candidate, question.key))
                "
                class="flex items-center gap-2"
              >
                <NuxtLink :to="`/${candidate.slug}`" class="plain shrink-0">
                  <img
                    v-if="candidate.image"
                    :src="candidate.image"
                    :alt="candidate.name"
                    class="w-8 h-8 object-cover rounded-full"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <i class="pi pi-user text-xs text-gray-400" />
                  </div>
                </NuxtLink>
                <div class="w-6">
                  <i
                    :class="[
                      getAnswerIcon(getResponse(candidate, question.key)),
                      getAnswerClass(getResponse(candidate, question.key)),
                    ]"
                    class="text-xl cursor-pointer"
                    @click="showAnswerDetail(candidate, question.key)"
                  ></i>
                </div>
                <NuxtLink :to="`/${candidate.slug}`" class="text-sm plain">
                  {{ candidate.name }}
                </NuxtLink>
              </div>

              <!-- Non-Yes/No Response: Image + Name with Response Below -->
              <div
                v-else-if="hasResponse(getResponse(candidate, question.key))"
                class="mb-3 flex gap-2"
              >
                <NuxtLink :to="`/${candidate.slug}`" class="plain shrink-0">
                  <img
                    v-if="candidate.image"
                    :src="candidate.image"
                    :alt="candidate.name"
                    class="w-8 h-8 object-cover rounded-full"
                  />
                  <div
                    v-else
                    class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                  >
                    <i class="pi pi-user text-xs text-gray-400" />
                  </div>
                </NuxtLink>
                <div class="flex-1">
                  <div class="text-sm font-medium flex items-center">
                    <NuxtLink :to="`/${candidate.slug}`" class="plain">
                      {{ candidate.name }}
                    </NuxtLink>
                    <i
                      v-if="hasComment(candidate, question.key)"
                      class="pi pi-info-circle text-sm text-blue-600 cursor-pointer ml-2"
                      @click.stop="showAnswerDetail(candidate, question.key)"
                      title="View answer details"
                    ></i>
                  </div>
                  <div class="text-sm text-gray-600 mt-1">
                    {{
                      getResponseLabel(getResponse(candidate, question.key), question.key)
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="Object.keys(filteredGroupedQuestions).length === 0 && searchKeyword"
      class="text-center py-8"
    >
      <p class="text-gray-500">Sorry! No questions match your search.</p>
    </div>

    <div v-if="Object.keys(groupedQuestions).length === 0" class="text-center py-8">
      <p class="text-gray-500">No survey responses available for comparison.</p>
    </div>

    <!-- Answer Detail Dialog -->
    <Dialog
      v-model:visible="answerDialogVisible"
      modal
      :header="currentAnswer?.candidateName"
      :style="{ width: '90vw', maxWidth: '600px' }"
    >
      <div v-if="currentAnswer">
        <p class="font-semibold mb-3">{{ currentAnswer.questionTitle }}</p>
        <p class="text-gray-700 mb-4">{{ currentAnswer.answerText }}</p>
        <div v-if="currentAnswer.comment" class="mt-4 pt-4 border-t border-gray-200">
          <p class="font-semibold mb-2">Additional Comment:</p>
          <p class="text-gray-700">{{ currentAnswer.comment }}</p>
        </div>
      </div>
    </Dialog>
  </div>

  <!-- No Survey Responses -->
  <div v-else class="text-center bg-white rounded-xl p-8">
    <p>No survey responses are available for comparison yet. Please check back later!</p>
  </div>
</template>

<style scoped>
.desktop-view {
  display: none;
}

.mobile-view {
  display: block;
}

.mobile-question-item {
  background-color: white;
}

.mobile-question-item:nth-child(even) {
  background-color: #f9fafb;
}

.section-container {
  overflow: hidden;
}

.section-header {
  user-select: none;
}

.mobile-chevron {
  display: none;
}

@media (max-width: 1199px) {
  .mobile-chevron {
    display: inline-block;
  }
}

@media (min-width: 1200px) {
  .desktop-view {
    display: block;
  }

  .mobile-view {
    display: none;
  }
}

.issues-comparison-chart table {
  border-collapse: separate;
  border-spacing: 0;
}

.table-fixed-mobile {
  width: 100%;
  table-layout: fixed;
}

.question-column {
  width: 50%;
  min-width: 300px;
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

.candidate-header-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
}

.candidate-name {
  word-break: break-word;
  hyphens: auto;
  line-height: 1.2;
}

.candidate-header {
  vertical-align: top !important;
  padding: 16px 4px !important;
  width: 96px;
  max-width: 96px;
}

.candidate-header:nth-child(even) {
  background-color: #f9fafb !important;
}

.candidate-cell {
  vertical-align: middle !important;
  padding: 12px 4px !important;
  width: 96px;
  max-width: 96px;
  overflow: hidden;
}

/* Column striping */
.candidate-cell:nth-child(even) {
  background-color: #f9fafb !important;
}

/* Row striping */
.row-even .question-column {
  background-color: #f3f4f6 !important;
}

.row-even .candidate-cell {
  background-color: #f3f4f6 !important;
}

.row-even .candidate-cell:nth-child(even) {
  background-color: #e5e7eb !important;
}

.row-odd .question-column,
.row-odd .candidate-cell {
  background-color: #ffffff !important;
}

.row-odd .candidate-cell:nth-child(even) {
  background-color: #f9fafb !important;
}

/* Hover effects - light purple */
@media (min-width: 1200px) {
  /* Row hover */
  .table-row:hover .table-cell {
    background-color: #f3e8ff !important;
  }

  /* Column hover - need to override all striping patterns */
  .column-hover,
  .candidate-cell.column-hover,
  .candidate-header.column-hover {
    background-color: #f3e8ff !important;
  }

  /* Override striping for column hover on even columns */
  .candidate-cell:nth-child(even).column-hover,
  .row-even .candidate-cell.column-hover,
  .row-even .candidate-cell:nth-child(even).column-hover,
  .row-odd .candidate-cell.column-hover,
  .row-odd .candidate-cell:nth-child(even).column-hover {
    background-color: #f3e8ff !important;
  }

  /* Combined row and column hover - darker purple */
  .table-row:hover .column-hover,
  .table-row:hover .candidate-cell.column-hover,
  .table-row:hover .candidate-cell:nth-child(even).column-hover {
    background-color: #e9d5ff !important;
  }
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
}

.candidate-cell i,
.candidate-cell span {
  display: inline-block;
  line-height: 1;
}
</style>
