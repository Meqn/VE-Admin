<template>
  <main class="ve-layout-content">
    <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'LayoutMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
