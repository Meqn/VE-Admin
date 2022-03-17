<template>
<div class="ve-header-menu">
  <template v-if="!collapsed">
    <div v-for="(item, index) in menus" :key="item.path" @click="handleCommand(index)" :class="['header-item', 've-header-menu-item', { 'is-active': current === index }]">
      <ve-icon :name="item.icon" :size="20" />
      <span class="norwap ml-6">{{ item.title }}</span>
    </div>
  </template>
  <el-dropdown v-else :placement="placement" trigger="hover" @command="handleCommand" title="平台导航" class="h-full">
    <div class="header-item">
      <ve-icon name="el-icon-menu" :size="20" />
    </div>
    <el-dropdown-menu slot="dropdown" class="ve-header-menu-dropdown">
      <el-dropdown-item
        v-for="(item, index) in menus"
        :key="item.path"
        :icon="item.icon"
        :command="index"
        :class="['dropdown-item', { 'is-acitve': current === index }]">
        {{ item.title }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</div>
</template>

<script>
export default {
  name: 'HeaderMenu',
  props: {
    current: {
      type: Number,
      default: 0
    },
    menus: Array,
    collapsed: Boolean,
    placement: {
      type: String,
      default: 'bottom-start'
    }
  },
  methods: {
    handleCommand(val) {
      window.location.href = this.menus[val]?.path || '/'
    }
  }
}
</script>

<style lang="scss">
.ve-layout-header{
  .ve-header-menu{
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 15px;

    &-item{
      padding: 0 16px;
      /* &:hover{
        color: $--color-primary;
      } */
    }
    .el-dropdown{
      color: inherit;
    }
  }
}
.ve-header-menu-dropdown{
  .el-dropdown-menu__item.dropdown-item{
    display: flex;
    align-items: center;
    font-size: 15px;
    line-height: 40px;

    i{
      font-size: 20px;
      margin-right: 12px;
    }
  }
}
</style>
