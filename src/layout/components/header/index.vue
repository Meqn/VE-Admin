<template>
<header class="app-layout-header">
  <div class="header-left">
    <a class="header-logo">
      <template v-if="logo">
        <img v-if="logo.url" :src="logo.url" alt="logo">
        <h1 v-if="logo.text">{{ logo.text }}</h1>
      </template>
      <h1 v-else>管理平台</h1>
    </a>
  </div>
  <div class="header-center"></div>
  <div class="header-right"></div>
</header>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app-layout-header',
  computed: {
    ...mapGetters(['logo'])
  }
}
</script>
