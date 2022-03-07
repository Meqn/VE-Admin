<template>
  <aside :class="['ve-layout-aside sidebar-dark', { 'is-collapse': sidebarCollapsed }]" :style="{ width }">
    <el-scrollbar class="sidebar-scrollbar" wrap-class="sidebar-scrollbar-wrap">
      <el-menu
        class="sidebar-menu"
        :default-active="activeMenu"
        :collapse="sidebarCollapsed"
        mode="vertical">
        <sidebar-item
          v-for="item in menus"
          :key="item.path"
          :item="item"
        />
      </el-menu>
    </el-scrollbar>
    <div class="sidebar-links">
      <div class="sidebar-collapse" @click="toggleSideBar">
        <i :class="[sidebarCollapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold']"></i>
      </div>
    </div>
  </aside>
</template>

<script>
import { resolvePath } from '@/utils'
import SidebarItem from './SidebarItem.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'LayoutSider',
  components: {
    SidebarItem
  },
  props: {
    width: String
  },
  computed: {
    ...mapGetters([
      'sidebarCollapsed',
      'permissionRoutes'
    ]),
    menus() {
      return this.filterRoutes(this.permissionRoutes)
    },
    activeMenu() {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    filterRoutes(routes, basePath = '/') {
      const res = []
      if (Array.isArray(routes) && routes.length > 0) {
        for (let route of routes) {
          // skip some route
          if (route.hidden || route.meta?.hidden) { continue }

          const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

          if (route.children && onlyOneShowingChild && !route.meta?.asMenu) {
            route = onlyOneShowingChild
          }

          const data = {
            path: resolvePath(basePath, route.path),
            title: route.meta?.title,
            icon: route.meta?.icon,
            asMenu: route.meta?.asMenu
          }

          // recursive child routes
          if (route.children) {
            data.children = this.filterRoutes(route.children, data.path)
          }
          res.push(data)
        }
      }
      return res
    },
    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !(item.hidden || item.meta?.hidden))

      // When there is only one child route, the child route is displayed by default
      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = resolvePath(parent.path, onlyOneChild.path)
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
