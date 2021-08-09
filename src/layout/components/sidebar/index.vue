<template>
  <aside class="app-aside">
    <el-menu
      class="app-aside-menu"
      :collapse="isCollapse"
      mode="vertical">
      <sidebar-item
        v-for="item in menus"
        :key="item.path"
        :item="item"
        :base-path="item.path"
      />
    </el-menu>
  </aside>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import { allRoutes } from '@demo/router'
import SidebarItem from './SidebarItem.vue'

export default {
  name: 'app-aside',
  components: {
    SidebarItem
  },
  data() {
    return {
      isCollapse: false
    }
  },
  computed: {
    menus() {
      return this.filterRoutes(allRoutes)
    }
  },
  methods: {
    filterRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        // skip some route
        if (route.hidden) { continue }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild) {
          route = onlyOneShowingChild
        }

        const data = {
          path: isExternal(route.path) ? route.path : path.resolve(basePath, route.path),
          title: route.meta && route.meta.title,
          icon: route.meta && route.meta.icon
        }

        // recursive child routes
        if (route.children) {
          data.children = this.filterRoutes(route.children, data.path)
        }
        res.push(data)
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      // Show parent if there are no child route to display
      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss">
.app-aside-menu{
  border-right: none;
  &-link{
    width: 0; height: 0;
    font-size: 0;
  }
}
</style>
