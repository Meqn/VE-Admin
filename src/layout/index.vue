<template>
<section class="ve-layout-wrapper" v-resize:debounce="$_resize">
  <div v-if="false" class="drawer-mask" />
  <VeHeader>
    <slot name="header" />
    <template #logo>
      <slot name="logo" />
    </template>
    <template #right>
      <slot name="header-right" />
    </template>
  </VeHeader>
  <section class="ve-layout-body">
    <VeSide ref="sidebar" />
    <VeMain />
  </section>
</section>
</template>

<script>
import './layout.scss'
import { VeHeader, VeSide, VeMain } from './components'
import resizeDirective from 'v-resize-observer/src/directive'

export default {
  name: 've-layout',
  components: {
    VeHeader,
    VeSide,
    VeMain
  },
  directives: {
    resize: resizeDirective
  },
  methods: {
    $_resize({ width }) {
      if (width < 992) {
        this.$refs.sidebar?.closeSideBar()
        this.$store.dispatch('app/toggleDevice', 'tablet')
      } else {
        this.$store.dispatch('app/toggleDevice', 'desktop')
      }
    }
  }
}
</script>
