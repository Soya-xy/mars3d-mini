<script lang="ts" setup>
import type { TreeSelectProps } from 'ant-design-vue'
import Tree from '@mars/components/ui/tree/index.vue'
function dig(path = '0', level = 3) {
  const list: TreeSelectProps['treeData'] = []
  for (let i = 0; i < 10; i += 1) {
    const value = `${path}-${i}`
    const treeNode: TreeSelectProps['treeData'][number] = {
      title: value,
      value,
      iconUrl: '/img/marker/map/camera.png',
    }

    if (level > 0)
      treeNode.children = dig(value, level - 1)

    list.push(treeNode)
  }
  return list
}

const treeData = $ref(dig())
</script>

<template>
  <!-- <mars-dialog :draggable="true" title="巡检" width="300" :min-width="250" top="60" right="10"> -->
  <Tree :tree-data="treeData" />
  <!-- </mars-dialog> -->
</template>

<style scoped lang="less">
.tree-slider {
  display: inline-block;
  width: 70px;
  margin-left: 5px;
  vertical-align: middle;
}
</style>
