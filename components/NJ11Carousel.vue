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
              <img
                :src="'/images/' + slotProps.data.image"
                :alt="slotProps.data.name"
                class="w-full rounded"
              />
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
    name: "nj 11 healthcare candidate comparison chart image",
    image: "nj11/1.jpg",
  },
  {
    id: "2",
    name: "nj 11 ICE candidate comparison chart image",
    image: "nj11/2.jpg",
  },
  {
    id: "4",
    name: "nj 11 ICE budget image",
    image: "nj11/4.jpg",
  },
  {
    id: "5",
    name: "nj 11 antisemitism candidate comparison chart image",
    image: "nj11/5.jpg",
  },
  {
    id: "6",
    name: "nj 11 military aid to israel candidate comparison chart image",
    image: "nj11/6.jpg",
  },
  {
    id: "7",
    name: "nj 11 did israel commit genocide candidate comparison chart image",
    image: "nj11/7.jpg",
  },
  {
    id: "8",
    name: "nj 11 aipac funding candidate comparison chart image",
    image: "nj11/8.jpg",
  },
  {
    id: "9",
    name: "nj 11 zionism candidate comparison chart image",
    image: "nj11/9.jpg",
  },
  {
    id: "10",
    name: "nj 11 us israel special relationship candidate comparison chart image",
    image: "nj11/10.jpg",
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
