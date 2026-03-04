<script setup>
const visible = ref(false)
const searchExpanded = ref(false)
const navItems = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Candidates",
    to: "/",
  },
  {
    label: "Issues",
    to: "/",
  },
  { label: "News", to: "/" },
]
const keyword = ref("")

const keywordSearch = () => {
  // take user to search page with query param
  const query = keyword.value
  if (query && query.trim() !== "") {
    navigateTo(`/search?query=${encodeURIComponent(query)}`)
  }
}

const toggleSearch = () => {
  searchExpanded.value = !searchExpanded.value
}
</script>

<template>
  <header>
    <div class="container p-4 flex justify-between items-center">
      <NuxtLink to="/" class="plain">
        <Logo />
      </NuxtLink>

      <div class="flex items-center">
        <!-- Desktop Search - Always Visible -->
        <div class="hidden md:block">
          <InputGroup>
            <InputText
              v-model="keyword"
              placeholder="Search Races & Candidates"
              @keyup.enter="keywordSearch()"
              class="max-w-full"
              style="width: 230px"
            />
            <InputGroupAddon>
              <Button
                icon="pi pi-search"
                severity="secondary"
                variant="text"
                @click="keywordSearch()"
              />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <!-- Mobile Search - Button that Expands -->
        <div class="md:hidden">
          <!-- Search Button -->
          <Button
            v-if="!searchExpanded"
            icon="pi pi-search"
            severity="secondary"
            variant="text"
            @click="toggleSearch"
          />

          <!-- Expanded Search Input -->
          <div v-else class="fixed top-0 left-0 right-0 bg-white z-50 p-4 shadow-lg">
            <InputGroup>
              <InputText
                v-model="keyword"
                placeholder="Search Candidates"
                @keyup.enter="keywordSearch()"
                autofocus
              />
              <InputGroupAddon>
                <Button
                  icon="pi pi-search"
                  severity="secondary"
                  variant="text"
                  @click="keywordSearch()"
                />
              </InputGroupAddon>
              <InputGroupAddon>
                <Button
                  icon="pi pi-times"
                  severity="secondary"
                  variant="text"
                  @click="toggleSearch"
                />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        <NuxtLink to="/manage-an-election" class="hidden md:block ml-3">
          <Button label="Manage An Election" class="trim" />
        </NuxtLink>
      </div>
    </div>
    <Drawer v-model:visible="visible" position="right" header=" ">
      <p v-for="item in navItems" :key="item.label" class="mb-5">
        <NuxtLink :to="item.to" @click="visible = false">
          {{ item.label }}
        </NuxtLink>
      </p>
      <NuxtLink to="/manage-an-election" @click="visible = false">
        <Button size="small" label="Manage An Election" class="mt-4 mb-4" />
      </NuxtLink>
    </Drawer>
  </header>
</template>

<style lang="scss" scoped></style>
