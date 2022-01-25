<template>
<el-header class="ve-layout-header pl-0" :height="height">
  <div class="header-left">
    <slot name="logo">
      <a class="header-logo">
        <template v-if="logo">
          <img v-if="logo.url" :src="logo.url" alt="logo">
          <h1 v-if="logo.text">{{ logo.text }}</h1>
        </template>
        <h1 v-else>管理平台</h1>
      </a>
    </slot>
  </div>
  <div class="header-center">
    <slot />
  </div>
  <div class="header-right">
    <slot name="right" />
    <Search class="header-item" />
    <Notice class="header-item" />
    <Account class="header-item" />
  </div>
</el-header>
</template>

<script>
import Search from './Search'
import Notice from './Notice'
import Account from './Account.vue'
export default {
  name: 'LayoutHeader',
  components: {
    Search,
    Notice,
    Account
  },
  props: {
    height: String
  },
  computed: {
    logo() {
      return this.$store.getters.logo
    }
  }
}
</script>
