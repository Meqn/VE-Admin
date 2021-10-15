<template>
<Fullscreen :element="targetElem" class="toolbar-icon" />
</template>

<script>
import Fullscreen from '@/components/Fullscreen'
export default {
  name: 'TableFullscreen',
  components: { Fullscreen },
  inject: ['top'],
  data() {
    return {
      targetElem: ''
    }
  },
  mounted() {
    try {
      const elem = this.top.fullElement
      if (elem instanceof Element) {
        this.targetElem = elem
      } else if (typeof elem === 'string') {
        this.targetElem = document.querySelector(elem)
      } else {
        this.targetElem = this.top.$el.parentNode
      }
    } catch (error) {
      console.error(error)
    }
  }
}
</script>
