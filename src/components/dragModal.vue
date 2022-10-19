<script setup lang='ts'>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { VueFinalModal } from 'vue-final-modal'

const { url = '', position = { x: 0, y: 0 }, index = 0 } = defineProps<{
  url: string
  position: {
    x: number
    y: number
  }
  index: number
}>()
const emit = defineEmits(['close'])

const showModal = ref(true)
const fullscreen = $ref(false)
let drag = $ref(true)
let resize = $ref(true)

function mouseenter(bol) {
  if (bol) {
    setTimeout(() => {
      drag = bol
      resize = bol
    }, 600)
  }
  else {
    drag = bol
    resize = bol
  }
}
function close() {
  showModal.value = false
  emit('close', index)
}
</script>

<template>
  <Teleport to="body">
    <VueFinalModal
      v-model="showModal" hide-overlay prevent-click esc-to-close :click-to-close="false" :drag="drag"
      :resize="resize" :resize-directions="['t', 'tr', 'r', 'br', 'b', 'bl', 'l', 'tl']"
      classes="flex justify-center items-center" :content-class="`relative flex flex-col max-h-full mx-4 p-6
      border  rounded-xl bg-white aspect-video
      !min-w-40vw !min-h-23vh
      ${fullscreen
      ? '!h-100vh !w-100vw !top-0 !left-0 !right-0 !bottom-0'
      : ''}`"
    >
      <iframe :src="url" h-full w-full frameborder="0" @mouseenter="mouseenter(false)" @mouseleave="mouseenter(true)" />
      <button class="absolute top-0 right-0  i-mdi-close text-black icon-btn text-xl" @click="close" />
      <button
        class="absolute bottom-0 right-0   text-black icon-btn text-xl"
        :class="`${fullscreen ? 'i-gridicons:fullscreen-exit' : 'i-gridicons:fullscreen'}`"
        @click="fullscreen = !fullscreen"
      />
    </VueFinalModal>
  </Teleport>
</template>
