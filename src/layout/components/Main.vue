<template>
  <main class="ve-layout-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'VeLayoutMain',
  computed: {
    cachedViews() {
      return this.$store.state.permission.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
