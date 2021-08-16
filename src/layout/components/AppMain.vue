<template>
  <main class="app-layout-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'app-layout-main',
  computed: {
    cachedViews() {
      // return this.$store.state.tagsView.cachedViews
      return []
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
