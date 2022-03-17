<template>
  <main class="ve-layout-content">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </main>
</template>

<script>
export default {
  name: 'LayoutMain',
  inject: {
    top: ['layout']
  },
  computed: {
    cachedViews() {
      // 需要缓存的 嵌套路由的父级组件必须是 `BlankView`, 否则需要将父组件 name追加到此处
      return ['BlankView', 'TableList']
      // return this.$store.getters?.cachedViews || []
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
