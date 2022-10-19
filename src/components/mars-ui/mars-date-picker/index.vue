<script lang="ts">
import { defineComponent, useAttrs, useSlots } from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
export default defineComponent({
  name: 'MarsDatePicker',
  inheritAttrs: false,
  setup() {
    const attrs = useAttrs()
    const slots = useSlots()
    return {
      attrs,
      slots,
      dayjs,
      locale,
    }
  },
})
</script>

<template>
  <a-date-picker :locale="locale" :dayjs="dayjs" class="mars-date-picker" dropdown-class-name="mars-datepicker-dropdown" v-bind="attrs">
    <template v-for="(comp, name) in slots" :key="name" #[name]>
      <component :is="comp" />
    </template>
  </a-date-picker>
</template>

<style lang="less" scoped>
.mars-date-picker {
  color: var(--mars-text-color);
  border-color: var(--mars-base-border-color) !important;
  background-color: transparent !important;
  &:hover {
    border-color: var(--mars-primary-color) !important;
  }

  :deep(.ant-picker-input) {
    input {
      color: var(--mars-base-color) !important;
    }
  }
  :deep(.ant-picker-clear) {
    background: var(--mars-bg-base);
    color: var(--mars-base-color) !important;
  }
  :deep(.ant-picker-suffix *) {
    color: var(--mars-text-color);
  }
}
</style>

<style lang="less">
.mars-datepicker-dropdown {
  .ant-picker-panel-container {
    .mars-drop-bg();
  }
  *,
  .ant-picker-content th {
    color: var(--mars-text-color);
  }
  .ant-picker-footer {
    border: none;
  }
  .ant-picker-cell {
    &:hover,
    &.ant-picker-cell-selected {
      .ant-picker-cell-inner {
        background-color: var(--mars-primary-color) !important;
      }
    }
  }
}
</style>
