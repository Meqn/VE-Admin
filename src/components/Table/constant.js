// el-table 样式class
export const EDIT_CLASS = {
  tableCellEdit: 'table-edit-cell',
  tableRowEdit: 'table-edit-row',
  cellEdit: 'cell-edit',
  cellEditActive: 'cell-edit-active'
}

// 编辑行 唯一值
export const ROW_KEY = '$_row_key'
export const ROW_INDEX = '$_row_index'

// el-table 方法
export const TABLE_METHODS = ['clearSelection', 'toggleRowSelection', 'toggleAllSelection', 'toggleRowExpansion', 'setCurrentRow', 'clearSort', 'clearFilter', 'doLayout', 'sort']

// el-pagination 事件
export const PAGINATION_EVENT = {}

// 编辑类型, 暂未使用
export const EDIT_TYPE_MAP = {
  cell: 'cell', // 单元格编辑
  row: 'row', // 多行编辑
  single: 'single-row' // 单行编辑
}

// 提示信息
export const ALERT_MESSAGE = {
  notEditable: 'Table为非编辑状态',
  onlyOneEdit: '只能同时编辑一行',
  rowEditing: '当前行已处于编辑状态'
}
