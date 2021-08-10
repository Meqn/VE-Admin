<template>
  <main class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'app-main',
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
