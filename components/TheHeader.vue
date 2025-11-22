<script setup>
const visible = ref(false)
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
</script>

<template>
  <header>
    <div class="container p-4 flex justify-between">
      <NuxtLink to="/" class="plain">
        <Logo />
      </NuxtLink>
      <div>
        <InputGroup>
          <InputText
            v-model="keyword"
            placeholder="Search Candidates"
            @keyup.enter="keywordSearch()"
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
        <!-- <nav class="hidden w-full lg:flex justify-end gap-4 mt-4">
          <p v-for="item in navItems" :key="item.label" class="small">
            <NuxtLink :to="item.to" @click="visible = false" class="plain">
              {{ item.label }}
            </NuxtLink>
          </p>
          <div>
            <i class="pi pi-filter text-xl cursor-pointer mr-3" />
            <i class="pi pi-bars text-xl cursor-pointer" />
          </div>
        </nav> -->
      </div>
    </div>
    <Drawer v-model:visible="visible" position="right" header=" ">
      <p v-for="item in navItems" :key="item.label" class="mb-5">
        <NuxtLink :to="item.to" @click="visible = false">
          {{ item.label }}
        </NuxtLink>
      </p>
      <a href="https://papnj.com/#volunteer" target="_blank">
        <Button size="small" label="Volunteer" class="mt-4 mb-4" />
      </a>
      <a href="https://secure.papnj.com/donate" target="_blank">
        <Button size="small" label="Donate" />
      </a>
    </Drawer>
  </header>
</template>

<style lang="scss" scoped></style>
