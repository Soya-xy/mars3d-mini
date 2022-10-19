<script lang="ts" setup>
import { ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: boolean | string | number
    checked?: boolean | string | number
  }>(),
  {
    value: undefined,
    checked: undefined,
  },
)

const emit = defineEmits(['update:value', 'update:checked', 'change'])

const switchValue = ref()
watchEffect(() => {
  if (props.checked !== undefined)
    switchValue.value = props.checked
  else
    switchValue.value = props.value || false
})

const valueChange = (value: boolean) => {
  emit('update:value', value)
  emit('update:checked', value)
  emit('change', value)
}
</script>

<script lang="ts">
export default {
  name: 'MarsSwitch',
}
</script>

<template>
  <a-switch v-model:checked="switchValue" class="mars-switch" @change="valueChange" />
</template>

<style lang="less" scoped>
// 开关
.mars-switch {
  background-color: var(--mars-disable-btn-bg);
  &.ant-switch-checked {
    background-color: var(--mars-primary-color) !important;
  }
}
</style>
