<template>
<div class="ve-table">
  <!-- search -->
  <div v-if="$slots.search" class="ve-table-search"><slot name="search"/></div>
  <!-- header -->
  <div v-if="showHeader" class="ve-table-header">
    <Flex align="middle">
      <div v-if="title" class="table-title">
        <slot name="title">{{ title }}</slot>
      </div>
      <slot name="left" />
    </Flex>
    <Flex align="middle">
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
    </Flex>
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
    <Flex v-if="paginationProps" :justify="paginationProps.align" class="ve-table-pagination" :style="pagination.style || {}">
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
    </Flex>
  </div>
  <slot name="footer"></slot>
</div>
</template>

<script>
import './style.scss'
import Flex from '@/components/Flex'
import Column from './Column'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import { TableSetting, TableDensity, TableReload, TablePrint, TableFullscreen } from './components'

const isObject = arg => arg !== null && typeof arg === 'object'

export default {
  name: 'VeTable',
  components: {
    Flex,
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
        return ['cell', 'single-row', 'row'].includes(val)
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
    },
    editableType() {
      return this.editable
    }
  },
  mounted() {
    // 绑定el-table组件 & 方法
    const tableMethods = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort']
    this.$table = this.$refs['elTable']
    tableMethods.forEach(method => {
      this[method] = this.$table[method]
    })
    // 绑定el-pagination组件 & 事件
    // const paginationEvents = ['size-change', 'current-change', 'prev-click', 'next-click']
    this.$pagination = this.$refs['elPagination']
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
    $_hanleCellDoubleClick(row, column) {
      if (this.editableKeys.includes(column.property) && this.editableType === 'cell') {
        this.edit({ row, column })
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
        className += ' cell-edit'

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
    $_copyEditingData(rowKey, rawData) {
      if (rowKey >= 0) {
        this.$set(this.editingData, rowKey, cloneDeep(rawData || this.data[rowKey]))
      }
    },
    $_setEditCell(cell, editing = true) {
      console.log('$_setEditCell', cell)
      if (editing && isObject(cell)) {
        const { row, column, $index } = cell
        const rowKey = typeof $index === 'number' ? $index : row['$_row_index']
        const colKey = column.property
        if (rowKey >= 0 && colKey) {
          this.editingCell = { rowKey, colKey, row, column }
          this.$_copyEditingData(rowKey)
        }
      } else if (editing === false || cell === null) {
        console.log('$_setEditCell', cell, '取消编辑')
        this.editingCell = null
      }
    },
    $_setEditRow(rowKey, editing = true) {
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
    // 删除数据
    delete(rowKey) {
      if (this.data[rowKey]) {
        this.data.splice(rowKey, 1)
      }
    },
    // 保存数据
    save(rowKey, newData) {
      if (rowKey >= 0) {
        const rawData = this.data[rowKey]
        const editData = newData || this.editingData[rowKey]
        if (!editData) {
          return this.$message.error('数据不存在!')
        }
        // 判断数据是否有更新
        if (!isEqual(rawData, editData)) {
          this.data.splice(rowKey, 1, cloneDeep(editData))
          this.$emit('value-change', editData, this.editableType === 'cell' ? this.editingCell : rowKey)
        }
        // 取消编辑模式
        this.edit(rowKey, false)
        // 删除复制的 edit数据
        this.$nextTick(() => {
          delete this.editingData[rowKey]
        })
      }
    },
    // 编辑数据, `editing = false`取消编辑
    edit(value, editing) {
      switch (this.editableType) {
        case 'cell':
          this.$_setEditCell(value, editing)
          break;
        case 'row':
          this.$_setEditRow(value, editing)
          break;
        case 'single-row':
          this.$_setEditSingleRow(value, editing)
          break;
      }
    },
    getEdit() {
      const { editable } = this
      return editable
        ? editable === 'cell'
          ? this.editingCell
          : this.editingRow
        : null
    }
  }
}
</script>
