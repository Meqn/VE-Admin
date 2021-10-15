<template>
<div class="ve-table">
  <!-- search -->
  <div v-if="$slots.search" class="ve-table-search"><slot name="search"/></div>
  <!-- header -->
  <VeFlex v-if="showHeader" justify="between" align="middle" class="ve-table-header">
    <VeFlex align="middle">
      <div v-if="title" class="table-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <slot name="left" />
    </VeFlex>
    <VeFlex align="middle">
      <slot name="right" />
      <!-- toolbar -->
      <div v-if="toolbarList.length > 0" class="ve-table-toolbar">
        <el-tooltip
          class="toolbar-item"
          v-for="item in toolbarList"
          :key="item"
          :content="toolbarData[item].tooltip"
          placement="top">
          <component :is="toolbarData[item].component" v-bind="toolbarData[item].props" />
        </el-tooltip>
      </div>
    </VeFlex>
  </VeFlex>

  <!-- table -->
  <div class="ve-table-alert" v-show="tableSelection.length > 0">
    <i class="el-icon-info alert-icon" />
    <div class="alert-content">已选择 <strong>{{ tableSelection.length }}</strong> 项</div>
    <span class="alert-cancel" @click="$_handleDeselect">取消选择</span>
  </div>
  <div class="ve-table-main" v-loading="loading" :element-loading-text="loadingText">
    <el-table ref="elTable" v-bind="table" :data="tableData" @selection-change="$_handleSelection" v-on="$listeners" class="ve-table-data" :style="table.style || {}">
      <template v-slot:append="slotProps">
        <slot name="table-append" v-bind="slotProps" />
      </template>
      <Column v-for="item in tableColumns" :key="item.prop" :option="item" />
    </el-table>

    <!-- pagination -->
    <VeFlex v-if="paginationProps" :justify="paginationProps.align" class="ve-table-pagination" :style="pagination.style || {}">
      <slot name="pagination">
        <el-pagination
          ref="elPagination"
          v-bind="paginationProps"
          @size-change="$_paginationSizeChange"
          @current-change="$_paginationCurrentChange"
          @prev-click="$_paginationPrevClick"
          @next-click="$_paginationNextClick"
        />
      </slot>
    </VeFlex>
  </div>
</div>
</template>

<script>
import VeFlex from '@/components/Flex'
import Column from './Column'
import { TableSetting, TableDensity, TableReload, TablePrint, TableFullscreen } from './components'

export default {
  name: 'VeTable',
  components: {
    VeFlex,
    Column,
    TableSetting,
    TableDensity,
    TableReload,
    TablePrint,
    TableFullscreen
  },
  props: {
    title: String,
    toolbar: {
      type: [Array, Boolean],
      default: true
    },
    columns: {
      type: Array,
      require: true
    },
    data: Array,
    table: {
      type: Object,
      default: () => ({})
    },
    pagination: {
      type: Object,
      default: () => ({})
    },
    fullElement: [String, Object],
    loading: Boolean,
    loadingText: {
      type: String,
      default: '加载中...'
    },
    reload: Function
  },
  provide() {
    return {
      top: this
    }
  },
  data() {
    return {
      tableSelection: []
    }
  },
  computed: {
    tableData() {
      return this.data || this.table?.data || []
    },
    toolbarList() {
      const { toolbar } = this
      if (toolbar) {
        if (Array.isArray(toolbar)) return toolbar
        return ['density', 'fullScreen', 'setting']
      }
      return []
    },
    toolbarData() {
      return {
        reload: { component: 'TableReload', tooltip: '刷新' },
        density: { component: 'TableDensity', tooltip: '密度', props: { size: this.table.size } },
        fullScreen: { component: 'TableFullscreen', tooltip: '全屏' },
        setting: { component: 'TableSetting', tooltip: '列设置', props: { columns: this.columns } },
        print: { component: 'TablePrint', tooltip: '打印' }
      }
    },
    showHeader() {
      const { title, left, right } = this.$slots
      return this.title || this.toolbarList.length > 0 || title || left || right
    },
    tableColumns() {
      return this.columns.filter(v => v.visible !== false)
    },
    paginationProps() {
      if (!this.pagination) return false
      return Object.assign({
        currentPage: 1,
        pageSizes: [10, 15, 20, 30, 50],
        pageSize: 10,
        layout: 'total, prev, pager, next, sizes',
        align: 'right'
      }, this.pagination)
    }
  },
  mounted() {
    // 绑定el-table组件 & 方法
    const tableMethods = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort']
    const $elTable = this.$refs['elTable']
    this.$elTable = $elTable
    tableMethods.forEach(method => {
      this[method] = $elTable[method]
    })
    // 绑定el-pagination组件 & 事件
    // const paginationEvents = ['size-change', 'current-change', 'prev-click', 'next-click']
    this.$elPagination = this.$refs['elPagination']
  },
  methods: {
    $_paginationSizeChange(num) {
      this.$emit('pagination-size-change', num)
    },
    $_paginationCurrentChange(num) {
      this.$emit('pagination-current-change', num)
    },
    $_paginationPrevClick(num) {
      this.$emit('pagination-prev-click', num)
    },
    $_paginationNextClick(num) {
      this.$emit('pagination-next-click', num)
    },
    $_handleDeselect() {
      this.clearSelection()
    },
    $_handleSelection(selection) {
      this.tableSelection = selection
    },
    // 改变table密度
    changeDensity(size) {
      this.$set(this.table, 'size', size)
    },
    // 重载table数据
    refresh() {
      this.reload && this.reload()
      this.$emit('reload')
    },
    // 导出table数据
    export() {
      console.log('export table ...')
    },
    // 打印table数据
    print() {
      console.log('print table ...')
    }
  }
}
</script>

<style lang="scss">
$toolbarSize: 20px;

.ve-table{
  &-header{
    padding: 16px 0;
  }
  .table-title{
    font-size: 16px;
    font-weight: bold;
    margin-right: 16px;
  }
  &-toolbar{
    height: $toolbarSize;
    margin-left: 24px;
    
    .toolbar-item{
      display: inline-block;
      height: $toolbarSize;
      margin-left: 16px;
      vertical-align: top;
      &:first-child{
        margin-left: 0;
      }
    }
    .toolbar-icon{
      display: inline-block;
      width: 1em;
      height: 1em;
      font-size: $toolbarSize;
      line-height: 1;
      vertical-align: baseline;
      font-style: normal;
      fill: currentColor;
      color: $--color-text-primary;
      cursor: pointer;
      &:hover{
        color: $--color-primary;
      }
      svg{
        width: 1em;
        height: 1em;
        display: inline-block;
      }
    }
  }
  &-alert{
    overflow: hidden; align-items: center;
    display: flex;
    padding: 8px 16px;
    color: $--color-text-primary;
    margin-bottom: 12px;
    background-color: mix($--color-white, $--color-primary, 90%);
    border: 1px solid mix($--color-white, $--color-primary, 60%);
    border-radius: 4px;
    transition: opacity .2s;
    .alert-icon{
      font-size: 16px;
      color: $--color-primary;
      margin-right: 8px
    }
    .alert-content{
      flex: 1;
    }
    .alert-cancel{
      color: $--color-primary;
      cursor: pointer;
    }
  }
  &-data.el-table{
    width: 100%;
    &.el-table--large{
      th, td{
        padding-top: 16px;
        padding-bottom: 16px;
      }
    }
    &.el-table--medium{
      th, td{
        padding-top: 10px;
        padding-bottom: 10px;
      }
    }
    &.el-table--mini{
      th, td{
        padding-top: 4px;
        padding-bottom: 4px;
      }
    }
  }
  &-pagination{
    margin-top: 20px;
  }
}
</style>
