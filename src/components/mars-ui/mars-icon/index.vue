<script lang="ts">
import { computed, defineComponent, useAttrs } from 'vue'
import * as svgModule from '@icon-park/svg'
import _ from 'lodash'
export default defineComponent({
  name: 'MarsIcon',
  // inheritAttrs: false,
  props: {
    icon: {
      type: String,
    },
    color: {
      type: String,
    },
    width: {
      type: [String, Number],
      default: '14',
    },
  },
  setup(props) {
    const attrs = useAttrs()
    const iconName = computed(() => _.upperFirst(_.camelCase(props.icon)))

    const svgComponent = svgModule[iconName.value]({
      theme: 'outline',
      fill: props.color,
      size: props.width,
      ...attrs,
    })

    return {
      attrs,
      svgComponent,
    }
  },
})
</script>

<template>
  <span class="mars-icon" v-html="svgComponent" />
</template>

<style lang="less" scoped>
.mars-icon {
  vertical-align: middle;
  line-height: 1;
}
</style>
