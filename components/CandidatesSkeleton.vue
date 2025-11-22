<template>
  <div
    class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
  >
    <div>
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
    <div>
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
    <div class="hidden sm:block">
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
    <div class="hidden md:block">
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
    <div class="hidden lg:block">
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
    <div class="hidden xl:block">
      <Skeleton width="100%" height="10rem" class="mb-1" borderRadius="16px" />
      <Skeleton width="90%" height="4rem" borderRadius="16px" class="m-auto" />
    </div>
  </div>
</template>
