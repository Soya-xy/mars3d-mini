<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
const props = defineProps<{
  value: string[]
  units: string[]
}>()

const emits = defineEmits(['update:value', 'change'])

const values = ref([])

watchEffect(() => {
  values.value = props.value
})

function itemChange(v, i) {
  emits('update:value', values)
  emits('change', values)
}
</script>

<script lang="ts">
export default {
  name: 'MarsInputGroup',
}
</script>

<template>
  <a-space>
    <template v-for="(item, i) in value" :key="i">
      <mars-input v-model:value="values[i]" :suffix="props.units[i]" @change="(v) => itemChange(v, i)" />
    </template>
  </a-space>
</template>

<style lang="less" scoped></style>
