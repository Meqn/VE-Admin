<template>
  <main class="ve-layout-content">
    <transition name="fade-transform" mode="out-in">
      <!-- 1. 不能用 if 控制 keep-alive 存在, 否则缓存无效 -->
      <!-- 2. <transition> 只能有单个子节点 -->
      <!-- 3. <keep-alive> 使用 includes, 嵌套问题未找到有效方法解决 -->
      <keep-alive>
        <router-view v-if="$route.meta.cache" />
      </keep-alive>
    </transition>
    
    <transition name="fade-transform" mode="out-in">
      <router-view v-if="!$route.meta.cache" />
    </transition>

  </main>
</template>

<script>
export default {
  name: 'LayoutMain'
}
</script>
