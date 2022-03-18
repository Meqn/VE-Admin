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
function queryCachedViews(routes, result = []) {
  routes.forEach(route => {
    if (route.meta?.cache) {
      result.push(route.name)
    }
    if (route.children) {
      queryCachedViews(route.children, result)
    }
  })
  return result
}

export default {
  name: 'LayoutMain',
  inject: {
    top: ['layout']
  },
  computed: {
    cachedViews() {
      // 需要缓存的 嵌套路由的父级组件必须是 `BlankView`, 否则需要将父组件 name追加到此处
      return [].concat(queryCachedViews(this.top.routes))
    },
    key() {
      return this.$route.path
    }
  }
}
</script>
