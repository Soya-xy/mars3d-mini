<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
export default defineComponent({
  name: 'MarsInputNumber',
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
  <a-input-number class="mars-input-number" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template>
  </a-input-number>
</template>

<style lang="less" scoped>
.mars-input-number {
  color: var(--mars-text-color);
  background-color: transparent !important;
  border-color: var(--mars-base-border-color);
  width: 100%;
  * {
    color: var(--mars-text-color);
  }
}
:deep(.ant-input-number-handler-wrap) {
  background: none;
  .anticon {
    color: var(--mars-text-color);
  }
}
</style>
