<template>
  <div class="card">
    <Carousel
      circular
      :value="products"
      :numVisible="4"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="slotProps">
        <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
          <div class="mb-4">
            <div class="relative mx-auto">
              <NuxtLink :to="slotProps.data.to">
                <img
                  :src="'/images/' + slotProps.data.image"
                  :alt="slotProps.data.name"
                  class="w-full rounded"
                />
              </NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup>
const products = ref([
  {
    id: "1",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/1.jpg",
    to: "/race/NJ-11/compare?keywords=ice",
  },
  {
    id: "2",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/2.jpg",
    to: "/race/NJ-11/compare?keywords=pac",
  },
  {
    id: "3",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/3.jpg",
    to: "/race/NJ-11/compare?keywords=pac",
  },
  {
    id: "4",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/4.jpg",
    to: "/race/NJ-11/compare?keywords=health",
  },
  {
    id: "5",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/5.jpg",
    to: "/race/NJ-11/issues-page",
  },
  {
    id: "6",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/6.jpg",
    to: "/race/NJ-11/social-media",
  },
  {
    id: "7",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/7.jpg",
    to: "/race/NJ-11/compare?keywords=israel",
  },
  {
    id: "8",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/8.jpg",
    to: "/race/NJ-11/compare?keywords=military",
  },
  {
    id: "9",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/9.jpg",
    to: "/race/NJ-11/compare?keywords=gaza",
  },
  {
    id: "10",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/10.jpg",
    to: "/race/NJ-11/compare?keywords=pac",
  },
  {
    id: "11",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/11.jpg",
    to: "/race/NJ-11/compare?keywords=zion",
  },
  {
    id: "12",
    name: "nj 11 candidate comparison chart image",
    image: "nj11/12.jpg",
    to: "/race/NJ-11/compare?keywords=israel",
  },
])
const responsiveOptions = ref([
  {
    breakpoint: "1199px",
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: "900px",
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: "700px",
    numVisible: 1,
    numScroll: 1,
  },
])
</script>
