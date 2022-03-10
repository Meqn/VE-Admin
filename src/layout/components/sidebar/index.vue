<template>
  <aside
    :class="['ve-layout-sider', `layout-sider-${top.siderTheme}`, { 'layout-sider-collapsed': siderCollapsed }]"
    :style="{ width: top.sidebarWidth + 'px' }">

    <div class="ve-layout-header-logo sider-header" :style="{height: top.headerHeight + 'px'}">
      <slot name="logo" v-if="top.layout === 'side'">
        <HeaderLogo collapsed />
      </slot>
    </div>

    <slot name="extra" />

    <el-scrollbar class="sider-scrollbar" wrap-class="sider-scrollbar-wrap">
      <el-menu class="sider-menu" v-bind="menuProps">
        <SubMenu
          v-for="item in menus"
          :key="item.path"
          :item="item"
        />
      </el-menu>
    </el-scrollbar>

    <div class="sider-footer" v-if="showCollapsed || $slots.footer">
      <Collapsed v-if="showCollapsed" :size="20" style="height: 48px" />
      <slot name="footer" />
    </div>
  </aside>
</template>

<script>
import { resolvePath } from '@/utils'
import SubMenu from './SubMenu.vue'
import HeaderLogo from '../header/HeaderLogo.vue'
import Collapsed from './Collapsed.vue'

export default {
  name: 'LayoutSider',
  components: {
    SubMenu,
    HeaderLogo,
    Collapsed
  },
  inject: {
    top: ['layout']
  },
  computed: {
    siderCollapsed() {
      return this.top.siderCollapsed
    },
    menus() {
      return this.filterRoutes(this.top.routes)
    },
    // 当前激活菜单的 index
    activeMenu() {
      const { meta, path } = this.$route
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    menuProps() {
      return {
        ...(this.top.menus || {}),
        defaultActive: this.activeMenu,
        collapse: this.siderCollapsed,
        mode: 'vertical'
      }
    },
    showCollapsed() {
      const { top } = this
      return top.collapsed && top.collapsedPosition === 'bottom'
    }
  },
  methods: {
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
