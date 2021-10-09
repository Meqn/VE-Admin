

## props
- `title: String`
- `toolbar: Boolean|Array`:  `['reload', 'density', 'fullScreen', 'setting', 'print']`
- `table: Object`: el-table属性
  - `style: Object|String`: 样式
- `columns: Array<Object>`: el-table-column属性(包含下列属性)
  - `prop: String`: 对应列内容的字段名
  - `visible: Boolean`: 是否在列设置中显示(不配置该属性则不显示)
  - `renderColumn({ row, column, $index }): Function`: 列区域内容渲染
  - `slots: Object`: 自定义列及表头的内容slot名 `{ default, header }`
- `data: Array<Object>`: 显示的数据
- `pagination: object`: el-pagination分页属性(包含下列属性)
  - `align: String`: 分页水平位置 `[left, center, right]`
  - `style: Object|String`: 样式
- `fullElement: String | HTMLElement`: 全屏元素
- `loading: Boolean`:
- `loadingText: String`:
- `reload`:



## slots
- `search`: 顶部搜索区域
### Table Slot
- `table-append`: 插入至表格最后一行之后的内容

### Table-column Slot
- `columns.slots.default`: 自定义列的内容，参数为 `{ row, column, $index }`
- `columns.slots.header`: 自定义表头的内容. 参数为 `{ column, $index }`

## pagination
- pagination: object
  - align: String, `[left, center, right]`



## methods

- reload
- export
- fullscreen
- 




# Todo
print
  - [Print.js](https://github.com/crabbly/Print.js)
  - https://zhuanlan.zhihu.com/p/87151162
fullscreen
  - [vue-fullscreen](https://github.com/mirari/vue-fullscreen)

https://github.com/SheetJS/printj



# 改进

1. 可编辑

2. 带搜索slot

