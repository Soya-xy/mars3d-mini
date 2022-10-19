<script setup lang='ts'>
import type { TreeNodeProps } from 'ant-design-vue/lib/vc-tree'
import MarsIcon from '@mars/components/mars-ui/mars-icon/index.vue'
// import './tree.less'
const { treeData, icon } = defineProps<
  {
    treeData: TreeNodeProps[]
    icon?: string
  }>()
const selectedKeys = $ref<string[]>(['0-0-0', '0-0-1'])
const checkedKeys = $ref<string[]>(['0-0-0', '0-0-1'])
</script>

<template>
  <a-tree
    v-model:selectedKeys="selectedKeys" v-model:checkedKeys="checkedKeys" show-icon default-expand-all checkable
    :height="233" :tree-data="treeData"
  >
    <template #icon="{ isLeaf, expanded, data }">
      <template v-if="isLeaf && !data.group">
        <img :src="data.iconUrl" w-5 h-7>
      </template>
      <template v-else-if="!expanded">
        <MarsIcon icon="folder-close" />
      </template>
      <template v-else-if="expanded">
        <MarsIcon icon="folder-open" />
      </template>
    </template>
  </a-tree>
</template>
