<template>
<section class="app-wrapper">
  <div v-if="false" class="drawer-mask" />
  <app-header />
  <section class="app-body">
    <app-side />
    <app-main />
  </section>
</section>
</template>

<script>
import './layout.scss'
import { AppHeader, AppSide, AppMain } from './components'

export default {
  name: 'app-layout',
  components: {
    AppHeader,
    AppSide,
    AppMain
  }
}
</script>
