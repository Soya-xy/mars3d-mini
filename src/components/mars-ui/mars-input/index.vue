<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
export default defineComponent({
  name: 'MarsInput',
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
  <a-input class="mars-input" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template>
  </a-input>
</template>

<style lang="less" scoped>
.mars-input {
  color: var(--mars-text-color);
  background-color: transparent !important;
  font-size: 12px !important;
  :deep(.ant-input) {
    background-color: transparent !important;
    border-color: var(--mars-base-border-color);
    color: var(--mars-text-color);
  }
  :deep(.ant-input-suffix .anticon) {
    color: var(--mars-text-color);
  }
}
.ant-input-affix-wrapper-focused {
  box-shadow: none;
}
.mars-input[disabled] {
  color: var(--mars-disable-btn-bg);
}
</style>
