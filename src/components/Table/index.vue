<template>
<div class="ve-table">
  <!-- search -->
  <div v-if="$slots.search" class="ve-table-search"><slot name="search"/></div>
  <!-- header -->
  <div v-if="showHeader" class="ve-table-header">
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
  </div>

  <!-- table alert -->
  <div class="ve-table-alert" v-show="tableSelection.length > 0">
    <i class="el-icon-info alert-icon" />
    <slot v-bind:alert="{ rows: tableSelection }">
      <div class="alert-content">已选择 <strong>{{ tableSelection.length }}</strong> 项</div>
      <span class="alert-cancel" @click="$_handleDeselect">取消选择</span>
    </slot>
  </div>
  <!-- table -->
  <div class="ve-table-main" v-loading="loading" :element-loading-text="loadingText">
    <el-table
      ref="elTable"
      v-bind="table"
      :data="data"
      class="ve-table-data"
      :style="table.style || {}"
      :row-style="$_handleRowStyle"
      :cell-class-name="$_handleCellClass"
      v-on="$listeners"
      @selection-change="$_handleSelection"
      @cell-dblclick="$_hanleCellDoubleClick">
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
  <slot name="footer"></slot>
</div>
</template>

<script>
import VeFlex from '@/components/Flex'
import Column from './Column'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
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
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    table: {
      type: Object,
      default: () => ({})
    },
    editable: {
      type: String,
      validator(val) {
        return ['field', 'single', 'multiple'].includes(val)
      }
    },
    pagination: [Boolean, Object],
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
      tableSelection: [],
      editingData: {}, // 临时编辑数据
      editingRow: [], // 当前编辑的 row
      editingCell: null // 当前编辑的 cell
    }
  },
  computed: {
    toolbarList() {
      const { toolbar } = this
      if (Array.isArray(toolbar)) return toolbar
      else if (toolbar === true) return ['reload', 'density', 'fullScreen', 'setting']
      else return []
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
    // 配置分页属性
    paginationProps() {
      if (!this.pagination) return false
      return Object.assign({
        currentPage: 1,
        pageSizes: [10, 15, 20, 30, 50],
        pageSize: 10,
        layout: 'total, prev, pager, next, sizes',
        align: 'right'
      }, this.pagination)
    },
    // 可编辑的字段
    editableKeys() {
      return this.columns.filter(item => item.editable).map(item => item.prop)
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
    // 双击进行编辑
    $_hanleCellDoubleClick(row, column, cell, event) {
      if (this.editableKeys.includes(column.property) && this.editable === 'field') {
        const rowKey = row.$_row_index
        const colKey = column.property
        this.edit({ rowKey, colKey, row, column })
        
        this.$nextTick(() => {
          const $input = cell.querySelector('input') || cell.querySelector('textarea')
          $input && $input.focus()
        })
      }
    },
    // 给每行 row 设置索引 `$_row_index`
    $_handleRowStyle({ row, rowIndex }) {
      Object.defineProperty(row, '$_row_index', {
        value: rowIndex,
        writable: true,
        enumerable: false
      })
      const rowStyle = this.table.rowStyle
      return typeof rowStyle === 'function' ? rowStyle.call(this, { row, rowIndex }) : rowStyle || null
    },
    // 给可编辑单元格增加class
    $_handleCellClass({ row, column, rowIndex, columnIndex }) {
      let className = ''
      const { editableKeys, editingCell, editingRow } = this
      const { cellClassName } = this.table
      const prop = column.property
      
      // 自定义 cellClassName
      if (cellClassName) {
        const _className = typeof cellClassName === 'function'
          ? cellClassName.call(this, { row, column, rowIndex, columnIndex })
          : cellClassName || ''
        className += `${_className}`
      }
      
      // 编辑 class
      if (editableKeys.includes(prop)) {
        className = 'cell-edit'

        if (editingCell) {
          const { rowKey, colKey } = editingCell
          if (rowIndex === rowKey && prop === colKey) {
            className += ' cell-edit-active'
          }
        }
        if (editingRow && editingRow.includes(rowIndex)) {
          className += ' cell-edit-active'
        }
      }
      
      return className
    },
    // 从源数据复制一份 row 用作临时编辑数据
    $_copyEditingData(rowKey) {
      if (rowKey >= 0) {
        this.$set(this.editingData, rowKey, cloneDeep(this.data[rowKey]))
      }
    },
    $_setEditMultipleRow(rowKey, editing = true) {
      const { editingRow } = this
      if (rowKey >= 0) {
        const rowIndex = editingRow.indexOf(rowKey)
        if (editing) {
          if (rowIndex === -1) {
            this.editingRow.push(rowKey)
            this.$_copyEditingData(rowKey)
          }
        } else {
          if (rowIndex !== -1) {
            this.editingRow.splice(rowIndex, 1)
          }
        }
      } else {
        this.editingRow = []
      }
    },
    $_setEditSingleRow(rowKey, editing = true) {
      if (rowKey >= 0 && editing) {
        if (this.editingRow?.length > 0) {
          return this.$message.warning('只能同时编辑一行')
        }
        if (this.editingRow?.includes(rowKey)) {
          return console.log('当前行已处于编辑状态')
        }
        this.editingRow = [rowKey]
        this.$_copyEditingData(rowKey)
      } else {
        this.editingRow = []
      }
    },
    $_setEditCell(cell, editing = true) {
      // cell = { rowKey: Number, colKey: Number, row?: Object, column?: Object }
      if (cell && (cell.rowKey >= 0) && editing) {
        this.editingCell = cell
        this.$_copyEditingData(cell.rowKey)
      } else if (editing === false || cell === null) {
        this.editingCell = null
      }
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
    },
    save(rowKey) {
      if (rowKey >= 0) {
        const rawData = this.data[rowKey]
        const editData = this.editingData[rowKey]
        // 判断数据是否有更新
        if (!isEqual(rawData, editData)) {
          this.data.splice(rowKey, 1, cloneDeep(editData))
          this.$emit('value-change', editData, rowKey, this.editingCell && this.editingCell.colKey)
        }
        // 取消编辑模式
        this.edit(rowKey, false)
        // 删除复制的 edit数据
        this.$nextTick(() => {
          delete this.editingData[rowKey]
        })
      }
    },
    edit(value, editing) {
      switch (this.editable) {
        case 'field':
          this.$_setEditCell(value, editing)
          break;
        case 'single':
          this.$_setEditSingleRow(value, editing)
          break;
        case 'multiple':
          this.$_setEditMultipleRow(value, editing)
          break;
      }
    }
  }
}
</script>

<style lang="scss">
$toolbarSize: 20px;

.ve-table{
  &-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 0;
  }
  .table-title{
    color: $--color-text-primary;
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
