<template>
  <aside :class="['app-aside', { 'is-fixed': isFixed }, { 'is-collapse': isCollapse }]">
    <el-scrollbar class="scrollbar-wrapper">
      <el-menu
        class="sidebar-menu"
        :default-active="$route.path"
        :collapse="isCollapse"
        mode="vertical">
        <sidebar-item
          v-for="item in menus"
          :key="item.path"
          :item="item"
          :base-path="item.path"
        />
      </el-menu>
    </el-scrollbar>
    <div class="sidebar-links">
      <div class="sidebar-collapse" @click="toggleSideBar">
        <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']"></i>
      </div>
    </div>
  </aside>
</template>

<script>
import { resolve } from 'path'
import { isExternal } from '@/utils/validate'
import SidebarItem from './SidebarItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'app-aside',
  components: {
    SidebarItem
  },
  data() {
    return {
      isFixed: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routes'
    ]),
    isCollapse() {
      return this.sidebar.opened
    },
    menus() {
      return this.filterRoutes(this.permission_routes)
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    resolvePath(base, path) {
      return isExternal(path) ? path : resolve(base, path)
    },
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
          path: this.resolvePath(basePath, route.path),
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
        onlyOneChild.path = this.resolvePath(parent.path, onlyOneChild.path)
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
