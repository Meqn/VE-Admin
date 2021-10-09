<template>
<el-dropdown @command="handleCommand">
  <i title="密度" class="toolbar-icon">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 42V6" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
      <path d="M18 13.99L23.995 8 30 14M30 34.01L24.005 40 18 34M24 8v32" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M41 42V6" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
    </svg>
  </i>
  <el-dropdown-menu slot="dropdown" :appendToBody="false">
    <el-dropdown-item
      v-for="item in list"
      :key="item.name"
      :command="item.name"
      :class="['table-density-menu', { 'is-acitve': size === item.name}]">
      {{ item.text }}
    </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
export default {
  name: 'table-density',
  props: {
    size: {
      type: String,
      default: 'medium'
    }
  },
  inject: ['top'],
  data() {
    return {
      list: [
        { name: 'medium', text: '默认' },
        { name: 'large', text: '宽松' },
        { name: 'mini', text: '紧凑' }
      ]
    }
  },
  methods: {
    handleCommand(val) {
      this.top.changeDensity(val)
    }
  }
}
</script>

<style lang="scss">
.el-dropdown-menu__item{
  &.table-density-menu{
    width: 62px;
  }
  &:not(.is-disabled).is-acitve{
    color: $--color-primary;
  }
}
</style>
