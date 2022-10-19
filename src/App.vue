<script setup>

</script>

<template>
  <router-view />
</template>

<style>
/* 隐藏滚动条 */
::-webkit-scrollbar {
  display: none;
}

.ell {
  text-overflow: ellipsis;
  overflow: hidden;
  width: 10rem;
}
</style>
