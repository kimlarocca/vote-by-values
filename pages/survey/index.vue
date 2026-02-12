<script setup>
definePageMeta({
  ssr: false,
  layout: "blank",
})

const supabase = useSupabaseClient()

// State management
const candidateCode = ref("")
const isVerifying = ref(false)
const verificationError = ref("")
const candidateInfo = ref(null)

// Verify candidate code
const verifyCode = async () => {
  if (!candidateCode.value.trim()) {
    verificationError.value = "Please enter a candidate code"
    return
  }

  isVerifying.value = true
  verificationError.value = ""

  try {
    // Query the candidates table for the code
    const { data, error } = await supabase
      .from("candidates")
      .select("id, name, candidate_code, race_slug, party")
      .eq("candidate_code", candidateCode.value.trim())
      .single()

    if (error || !data) {
      verificationError.value = "Invalid candidate code. Please check and try again."
      isVerifying.value = false
      return
    }

    // Store candidate info for the survey
    candidateInfo.value = data

    // Navigate to survey form with candidate ID
    await navigateTo(`/survey/form?id=${data.id}`)
  } catch (err) {
    console.error("Verification error:", err)
    verificationError.value = "An error occurred. Please try again."
  } finally {
    isVerifying.value = false
  }
}

// Handle enter key press
const handleKeyPress = (event) => {
  if (event.key === "Enter") {
    verifyCode()
  }
}
</script>

<template>
  <div class="survey flex p-4 items-center justify-center min-h-screen">
    <Html lang="en">
      <Head>
        <Title>VoteByValues.com | Candidate Survey</Title>
      </Head>
    </Html>

    <section class="text-center bg-white rounded-xl p-8 max-w-2xl m-auto">
      <Logo class="m-auto mb-4" />
      <h1 class="text-center mb-5">Candidate Survey</h1>

      <p class="mb-3">
        Thanks for taking the time to complete the Vote By Values candidate survey!
      </p>

      <p class="mb-8">Please enter your unique candidate code below to begin:</p>

      <!-- Verification Form -->
      <div class="max-w-md m-auto">
        <div class="mb-4">
          <InputText
            v-model="candidateCode"
            placeholder="candidate code"
            class="w-full"
            :disabled="isVerifying"
            @keypress="handleKeyPress"
            size="large"
          />
        </div>

        <!-- Error Message -->
        <Message v-if="verificationError" severity="error" :closable="false" class="mb-4">
          {{ verificationError }}
        </Message>

        <!-- Verify Button -->
        <Button
          label="Verify & Continue"
          icon="pi pi-arrow-right"
          iconPos="right"
          @click="verifyCode"
          :loading="isVerifying"
          :disabled="!candidateCode.trim() || isVerifying"
          class="w-full"
          size="large"
        />
      </div>
    </section>
  </div>
</template>
