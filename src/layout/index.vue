<template>
<section class="ve-layout-wrapper">
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
    <VeSide />
    <VeMain />
  </section>
</section>
</template>

<script>
import './layout.scss'
import { VeHeader, VeSide, VeMain } from './components'

export default {
  name: 've-layout',
  components: {
    VeHeader,
    VeSide,
    VeMain
  }
}
</script>
