<template>
  <a class="header-logo" @click="top.onMenuHeaderClick">
    <img v-if="top.logo" :src="top.logo" alt="logo">
    <template v-if="top.title">
      <h1 v-show="collapsed && !top.siderCollapsed">{{ top.title }}</h1>
    </template>
  </a>
</template>

<script>
export default {
  name: 'HeaderLogo',
  inject: {
    top: ['layout']
  },
  props: {
    collapsed: Boolean
  }
}
</script>

<style lang="scss" scoped>
.header-logo{
  display: flex;
  align-items: center;
  height: 100%;

  h1{
    margin-left: 12px;
    font-size: 20px;
    white-space: nowrap;
  }
}
</style>
