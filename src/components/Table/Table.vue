<template>
<div class="ve-table">
  <!-- search -->
  <div v-if="$slots.search" class="ve-table-search"><slot name="search"/></div>
  <!-- header -->
  <div v-if="showHeader" class="ve-table-header">
    <div class="flex-middle ve-table-header-left">
      <slot name="title">
        <span class="table-title">{{ title }}</span>
      </slot>
    </div>
    <div class="flex-middle ve-table-header-right">
      <slot name="extra" />
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
    </div>
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
      :class="['ve-table-data', editableTableClass]"
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
    <div v-if="paginationProps" :class="['ve-table-pagination', `flex-${paginationProps.align}`]" :style="pagination.style || {}">
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
    </div>
  </div>
  <el-button v-if="newRow" plain dashed icon="el-icon-plus" style="margin: 12px 0; width: 100%" @click="$_addRow">{{ newRowText }}</el-button>
  <slot name="footer" />
</div>
</template>

<script>
import './style.scss'
import Column from './Column'
import cloneDeep from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import isPlainObject from 'lodash/isPlainObject'
import { TableSetting, TableDensity, TableReload, TablePrint, TableFullscreen } from './components'
import { EDIT_CLASS, ROW_INDEX, ROW_KEY, TABLE_METHODS, ALERT_MESSAGE } from './constant'

// 定义对象不可枚举属性
function defineNonEnumKey(obj, key, value) {
  Object.defineProperty(obj, key, {
    value: value,
    writable: true,
    enumerable: false
  })
  return obj
}

export default {
  name: 'VeTable',
  components: {
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
    editable: [String, Object],
    newRow: [Boolean, String],
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
      table: this
    }
  },
  data() {
    return {
      tableSelection: [],
      rowDataMap: {}, // 所有临时数据
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
      return this.title || this.toolbarList.length > 0 || this.$slots.title || this.$slots.extra
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
    // 可编辑配置项
    editableConfig() {
      const { editable } = this
      if (editable) {
        const defaults = {
          type: 'row',
          cellEditMode: 'auto',
          cellEditCancel: false,
          onlyOneLineMessage: ALERT_MESSAGE.onlyOneEdit
        }
        return typeof editable === 'string'
          ? { ...defaults, type: editable }
          : { ...defaults, ...editable }
      }
      return false
    },
    // 可编辑类型：单元格、单行、多行
    editableType() {
      return this.editableConfig ? this.editableConfig.type : null
    },
    editableTableClass() {
      return this.editableType ? this.editableType === 'cell' ? EDIT_CLASS.tableCellEdit : EDIT_CLASS.tableRowEdit : ''
    },
    newRowText() {
      return typeof this.newRow === 'string' ? this.newRow : '添加一行数据'
    }
  },
  /* watch: {
    'data.length'(val) {
      console.log('data.length change ....', val)
    }
  }, */
  mounted() {
    // 绑定el-table组件 & 方法
    this.$table = this.$refs['elTable']
    TABLE_METHODS.forEach(method => {
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
    // 清除已选择行
    $_handleDeselect() {
      this.clearSelection()
    },
    $_handleSelection(selection) {
      this.tableSelection = selection
    },
    // 双击进入编辑
    $_hanleCellDoubleClick(row, column) {
      // 未启用编辑
      if (!this.editableConfig) return
      // 该字段不支持编辑
      if (!this.editableKeys.includes(column.property)) return

      if (this.editableType === 'cell' && this.editableConfig.cellEditMode === 'auto') {
        this.edit({ row, column })
      }
    },
    // 设置 rowKey 和 rowIndex
    $_setRowKey(row, index) {
      if (isPlainObject(row)) {
        let rowKey = row[ROW_KEY] // 唯一值
        // 设置每行唯一值
        if (!rowKey) {
          rowKey = 'row_' + Math.floor(Math.random() * 1000000)
          defineNonEnumKey(row, ROW_KEY, rowKey)
        }

        if (index >= 0) {
          // 设置每行索引
          defineNonEnumKey(row, ROW_INDEX, index)
        }
        return row
      }
      return null
    },
    $_getRowKey(row) {
      return isPlainObject(row)
        ? row[ROW_KEY]
        : this.rowDataMap[row]
          ? row
          : null
    },
    // 给每行 row 设置唯一key
    $_handleRowStyle({ row, rowIndex }) {
      if (this.editable) {
        const rowData = this.$_setRowKey(row, rowIndex)
        if (rowData) {
          this.rowDataMap[rowData[ROW_KEY]] = rowData
        }
      }
      
      // 传递的 rowStyle 属性
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
        className += ` ${EDIT_CLASS.cellEdit}`

        if (editingCell) {
          const { rowKey, colKey } = editingCell
          if (row[ROW_KEY] === rowKey && prop === colKey) {
            className += ` ${EDIT_CLASS.cellEditActive}`
          }
        }
        if (editingRow && editingRow.includes(row[ROW_KEY])) {
          className += ` ${EDIT_CLASS.cellEditActive}`
        }
      }
      
      return className
    },
    // 从源数据复制一份 row 用作临时编辑数据, 参数rowKey只能是 唯一值
    $_copyEditingData(rowKey, rawData) {
      const rowIndex = this.findRowIndex(rowKey)
      // 判断 rowkey是否有效
      if (rowIndex >= 0) {
        const cloneData = cloneDeep(rawData || this.data[rowIndex])
        // 设置 rowKey, cloneDeep只复制可枚举值
        defineNonEnumKey(cloneData, ROW_KEY, rowKey)
        
        this.$set(this.editingData, rowKey, cloneData)
      }
    },
    $_setEditCell(cell, editing = true) {
      if (editing && isPlainObject(cell) && cell.row && cell.column) {
        const { row, column } = cell
        const rowKey = row[ROW_KEY]
        const colKey = column.property
        if (colKey && this.rowDataMap[rowKey]) {
          this.editingCell = { rowKey, colKey, row, column }
          this.$_copyEditingData(rowKey)
        }
      } else if (editing === false || cell === null) {
        this.editingCell = null
      }
    },
    $_setEditRow(row, editing = true) {
      const rowKey = this.$_getRowKey(row)
      
      if (rowKey) {
        const _index = this.editingRow.indexOf(rowKey)

        if (editing) {
          if (_index === -1) {
            this.editingRow.push(rowKey)
            this.$_copyEditingData(rowKey)
          }
        } else {
          if (_index !== -1) {
            this.editingRow.splice(_index, 1)
          }
        }
      } else {
        this.editingRow = []
      }
    },
    $_setEditSingleRow(row, editing = true) {
      const rowKey = this.$_getRowKey(row)

      if (rowKey && editing) {
        const { editingRow } = this
        if (editingRow.length > 0) {
          return this.$message.warning(this.editableConfig.onlyOneLineMessage)
        }
        if (editingRow.includes(rowKey)) {
          return console.warn(ALERT_MESSAGE.rowEditing)
        }
        this.editingRow = [rowKey]
        this.$_copyEditingData(rowKey)
      } else {
        this.editingRow = []
      }
    },
    // 移除编辑中的 row 或 cell
    $_removeEditing(rowKey) {
      if (this.editingRow.length > 0) {
        const keyIndex = this.editingRow.indexOf(rowKey)
        if (keyIndex !== -1) {
          this.editingRow.splice(keyIndex, 1)
        }
      }

      if (this.editingCell && this.editingCell.rowKey === rowKey) {
        this.editingCell = null
      }
    },
    $_addRow() {
      this.$emit('new-row', this.data)
    },
    /**
     * 删除数据
     * @param {string} rowKey 行唯一值
     */
    delete(rowKey) {
      if (!this.editable) {
        return console.warn(ALERT_MESSAGE.notEditable)
      }
      const _rowKey = this.$_getRowKey(rowKey)
      const rowIndex = this.findRowIndex(_rowKey)
      
      if (_rowKey) {
        this.$_removeEditing(_rowKey)
        this.data.splice(rowIndex, 1)
        this.$nextTick(() => {
          delete this.rowDataMap[_rowKey] // 从所有临时数据中删除该条
          delete this.editingData[_rowKey] // 从临时编辑数据中删除该条
        })
      }
    },
    /**
     * 保存数据
     * @param {object} row 行数据
     * @param {object} newData 新数据
     */
    save(row, newData) {
      if (!this.editable) {
        return console.warn(ALERT_MESSAGE.notEditable)
      }
      const rowKey = this.$_getRowKey(row)
      const rowIndex = this.findRowIndex(rowKey)

      if (rowIndex >= 0) {
        const rawData = this.data[rowIndex]
        const editData = newData || this.editingData[rowKey]
        if (!editData) {
          return this.$message.error('数据不存在!')
        }
        // 判断数据是否有更新
        if (!isEqual(rawData, editData)) {
          // 克隆一份更新的数据，且携带 rowKey
          const copyEditData = defineNonEnumKey(cloneDeep(editData), ROW_KEY, rowKey)
          // 更新原始数据
          this.data.splice(rowIndex, 1, copyEditData)
          this.$emit('value-change', copyEditData, this.editableType === 'cell' ? this.editingCell : rowKey)
          // this.editableConfig?.valueChange(editData, this.editableType === 'cell' ? this.editingCell : rowKey)
        }
        // 取消编辑模式
        this.edit(rowKey, false)
        // 删除复制的 edit数据
        this.$nextTick(() => {
          delete this.editingData[rowKey]
        })
      }
    },
    /**
     * 编辑数据
     * @param {object | string} value 编辑`row` 或`cell`数据
     * @param {boolean} editing 编辑或取消
     */
    edit(value, editing) {
      if (!this.editable) {
        return console.warn(ALERT_MESSAGE.notEditable)
      }
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
    /**
     * 插入新一行数据
     * @param {object} row 新增数据
     * @param {string} position 头部或尾部插入, [`top`,`end`]
     */
    addRow(row, position = 'end') {
      if (!this.editable) {
        return console.warn(ALERT_MESSAGE.notEditable)
      }
      if (this.editableType === 'single-row' && this.editingRow.length > 0) {
        return this.$message.warning(this.editableConfig.onlyOneLineMessage)
      } else {
        const index = this.data.length
        const rowData = this.$_setRowKey(cloneDeep(row), index)

        if (position === 'top') {
          // 顶部插入
          this.data.unshift(rowData)
        } else {
          // 尾部插入
          this.data.push(rowData)
        }
        this.$nextTick(() => {
          this.edit(rowData[ROW_KEY])
        })
      }
    },
    // 通过rowKey找到rowIndex
    findRowIndex(rowKey) {
      const row = this.rowDataMap[rowKey]
      return row ? row[ROW_INDEX] : -1
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
