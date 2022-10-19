<script setup lang="ts">
const configUrl = `${process.env.BASE_URL}config/config.json?time=${new Date().getTime()}`
fetch(configUrl)
  .then(res => res.json())
  .then((res) => {
    config.value = res.server
  })
</script>

<template>
  <Suspense>
    <router-view />
    <template #fallback>
      <div h-100vh w-100vw>
        <Spin />
      </div>
    </template>
  </Suspense>
</template>
