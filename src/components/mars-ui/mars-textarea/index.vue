<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
export default defineComponent({
  name: 'MarsTextarea',
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
  <a-textarea class="mars-textarea" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template>
  </a-textarea>
</template>

<style lang="less" scoped>
.mars-textarea {
  color: var(--mars-text-color);
  background-color: var(--mars-bg-base) !important;
  :deep(.ant-input) {
    background-color: var(--mars-bg-base) !important;
    color: var(--mars-text-color);
  }
  :deep(.ant-input-suffix .anticon) {
    color: var(--mars-text-color);
  }
}
.mars-textarea[disabled]{
  color: var(--mars-disable-btn-bg);
}
</style>
