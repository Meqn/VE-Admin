<template>
<el-header :class="['ve-layout-header', `layout-header-${top.headerTheme}`, { 'layout-header-fixed': isFixed }]" :height="height" :style="headStyles">
  <div v-if="top.layout !== 'side'" class="ve-layout-header-logo header-logo" :style="{ width: top.siderWidth + 'px' }">
    <slot name="logo">
      <HeaderLogo />
    </slot>
  </div>
  <div class="header-center">
    <Collapsed v-if="showCollapsed" :size="20" class="mr-16" />
    <slot />
  </div>
  <div class="header-right">
    <slot name="right" />
    <Search class="header-item" />
    <Notice class="header-item" />
    <Account class="header-item" />
  </div>
</el-header>
</template>

<script>
import Search from './Search'
import Notice from './Notice'
import Account from './Account.vue'
import HeaderLogo from './HeaderLogo.vue'
import Collapsed from '../sidebar/Collapsed.vue'

export default {
  name: 'LayoutHeader',
  components: {
    HeaderLogo,
    Collapsed,
    Search,
    Notice,
    Account
  },
  props: {
    height: String
  },
  inject: {
    top: ['layout']
  },
  computed: {
    isFixed() {
      return this.top.layout === 'side' ? !!this.top.fixedHeader : true
    },
    headStyles() {
      const styleObj = {}
      const { top } = this
      if (top.layout === 'side' && top.fixedHeader) {
        styleObj.width = `calc(100% - ${top.sidebarWidth}px)`
      }
      return styleObj
    },
    showCollapsed() {
      const { top } = this
      return top.collapsed && top.collapsedPosition === 'top'
    }
  }
}
</script>
