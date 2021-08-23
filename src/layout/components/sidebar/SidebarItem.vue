<template>
<el-submenu v-if="item.children && !item.asMenu" :index="item.path" popper-append-to-body>
  <template slot="title">
    <menu-item :title="item.title" :icon="item.icon" />
  </template>
  <sidebar-item
    v-for="child in item.children"
    :key="child.path"
    :item="child"
    :base-path="child.path"
  />
</el-submenu>
<el-menu-item v-else :index="item.path" @click="hanleMenu">
  <menu-link :to="item.path" ref="link" class="sidebar-menu-link" />
  <menu-item :title="item.title" :icon="item.icon" />
</el-menu-item>
</template>

<script>
import MenuItem from './MenuItem.vue'
import MenuLink from './MenuLink.vue'

export default {
  name: 'sidebar-item',
  components: {
    MenuItem,
    MenuLink
  },
  props: {
    item: Object
  },
  methods: {
    hanleMenu() {
      // eslint-disable-next-line no-unused-expressions
      this.$refs?.link?.$el?.click()
    }
  }
}
</script>
