<template>
<div>
  <el-submenu
    v-if="item.children && !item.asMenu"
    :index="item.path"
    :popper-class="top.siderTheme === 'dark' ? 'layout-submenu-dark' : 'layout-submenu-light'"
    popper-append-to-body>
    <template slot="title">
      <menu-item :title="item.title" :icon="item.icon" />
    </template>
    <SubMenu
      v-for="child in item.children"
      :key="child.path"
      :item="child"
    />
  </el-submenu>
  <menu-link v-else :to="item.path">
    <el-menu-item :index="item.path">
      <menu-item :title="item.title" :icon="item.icon" />
    </el-menu-item>
  </menu-link>
</div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import MenuLink from './MenuLink.vue'

export default {
  name: 'SubMenu',
  components: {
    MenuItem,
    MenuLink
  },
  props: {
    item: Object
  },
  inject: {
    top: ['layout']
  }
}
</script>
