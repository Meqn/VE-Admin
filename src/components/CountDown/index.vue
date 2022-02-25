<template>
<div class="count-down">
  <slot />
</div>
</template>

<script>
export default {
  name: 'CountDown',
  props: {
    time: {
      type: [String, Number],
      default: 0
    },
    end: {
      type: [String, Number],
      default: 0
    },
    isMiniSecond: Boolean
  },
  data() {
    return {}
  }
}
</script>
