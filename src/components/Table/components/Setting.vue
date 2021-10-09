<template>
<el-dropdown :hide-on-click="false">
  <i title="列设置" class="toolbar-icon">
    <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.5 10h-6M27.5 6v8M27.5 10h-22M13.5 24h-8M21.5 20v8M43.5 24h-22M41.5 38h-6M27.5 34v8M27.5 38h-22" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </i>
  <el-dropdown-menu slot="dropdown" :appendToBody="false">
    <el-dropdown-item>
      <Flex justify="between" style="min-width: 120px">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">列展示</el-checkbox>
        <el-link type="primary" :underline="false" @click="handleCheckedReset">重置</el-link>
      </Flex>
    </el-dropdown-item>
    <el-dropdown-item v-for="(item, index) in list" :key="item.prop" :divided="index === 0">
      <el-checkbox v-model="item.visible" :label="item" @change="handleCheckedChange">{{ item.label }}</el-checkbox>
    </el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>
</template>

<script>
import Flex from '../../Flex'
export default {
  name: 'table-setting',
  components: {
    Flex
  },
  props: {
    columns: Array
  },
  computed: {
    list() {
      return this.columns.filter(v => typeof v.visible === 'boolean')
    }
  },
  data() {
    return {
      checkAll: false,
      isIndeterminate: true,
      checkedItem: []
    }
  },
  mounted() {
    this.originStatus = this.list.map(v => v.visible ? v.prop : null)
    this.handleCheckedChange(this.list)
  },
  methods: {
    handleCheckAllChange(value) {
      this.list.forEach(v => {
        v.visible = value
      })
      this.checkedItem = value ? this.list : []
      this.isIndeterminate = false
    },
    handleCheckedChange(value) {
      const { list } = this
      this.checkedItem = list.filter(v => v.visible)
      const checkedCount = this.checkedItem.length
      this.checkAll = checkedCount === list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < list.length
    },
    handleCheckedReset() {
      this.list.forEach(v => {
        v.visible = this.originStatus.includes(v.prop)
      })
      this.handleCheckedChange(this.list)
    }
  }
}
</script>
