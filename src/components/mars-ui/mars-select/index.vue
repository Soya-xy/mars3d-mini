<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
export default defineComponent({
  name: 'MarsSelect',
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    return {
      attrs,
      slots,
    }
  },
})
</script>

<template>
  <a-select class="mars-select" dropdown-class-name="mars-select-dropdown" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template>
  </a-select>
</template>

<style lang="less" scoped>
.mars-select {
  color: var(--mars-text-color);
  background-color: transparent !important;
  background: none;
  :deep(.ant-select-selector) {
    border-color: var(--mars-base-border-color) !important;
    background: none;
    background-color: transparent !important;
    &:hover,
    &:focus {
      border-color: #4db3ff !important;
    }
  }

  :deep(.ant-select-arrow) {
    color: var(--mars-base-color) !important;
  }
}
</style>

<style lang="less"></style>
