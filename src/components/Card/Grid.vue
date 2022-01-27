<template>
<div :class="['ve-card-grid', { 've-card-grid-hoverable': hoverable }]">
  <slot />
</div>
</template>

<script>
export default {
  name: 'VeCardGrid',
  props: {
    hoverable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
