<script setup lang="ts">
const { getMap, uMap } = useMap()

function mapLoaded(e) {
  // 更新地图示例
  uMap(e)
  const map = getMap()
}
</script>

<template>
  <MarsworkMainView @map-loaded="mapLoaded" />
</template>

<style>

</style>
