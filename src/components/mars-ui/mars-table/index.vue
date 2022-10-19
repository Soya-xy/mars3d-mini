<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
export default defineComponent({
  name: 'MarsTable',
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
  <a-table class="mars-table" v-bind="attrs">
    <template v-for="(comp, name) in slots" #[name]="data" :key="name">
      <slot :name="name" v-bind="data" />
    </template>
  </a-table>
</template>

<style lang="less" scoped></style>
