<script lang="ts">
import { defineComponent, provide, useAttrs } from 'vue'
import type { Widget } from '@mars/common/store/widget'

export default defineComponent({
  name: 'MarsWidget',
  props: ['widget'],
  setup(props) {
    const attrs = useAttrs()

    provide('getCurrentWidget', () => {
      return props.widget.name
    })

    const getWidgetAttr = (widget: Widget) => {
      let attr = {}
      if (widget.meta && widget.meta.props) {
        attr = {
          ...attr,
          ...widget.meta.props,
        }
      }
      if (widget.data && widget.data.props) {
        attr = {
          ...attr,
          ...widget.data.props,
        }
      }
      return attr
    }

    return {
      attrs,
      getWidgetAttr,
    }
  },
})
</script>

<template>
  <component :is="widget.component" v-bind="getWidgetAttr(widget)" />
</template>
