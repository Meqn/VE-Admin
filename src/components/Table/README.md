
# table

提示：
1. 拖动排序时不能存在编辑元素
2. 编辑模式不能共存：1.单元格编辑; 2.行编辑
3. 编辑 edit() 参数可以是 scope，也可以是 row， 保存 save() 参数必须是 row 或 rowKey
4. 新增一行数据 不支持取消，只能删除
5. 编辑功能不支持嵌套


## props
- `title: String`
- `toolbar: Boolean|Array`:  `['reload', 'density', 'fullScreen', 'setting', 'print']`
- `table: Object`: el-table属性
  - `style: Object|String`: 样式
- `columns: Array<Object>`: el-table-column属性(包含下列属性)
  - `prop: String`: 对应列内容的字段名
  - `visible: Boolean`: 是否在列设置中显示(不配置该属性则不显示)
  - `render(h, { row, column, $index }): Function`: 列区域内容渲染
  - `slots: Object`: 自定义列及表头的内容slot名 `{ default, header }`
  - `editable: String | Object`: 是否可编辑
  - `fieldType: String`: 表单类型，支持 `'text', 'textarea', 'inputNumber', 'select', 'switch', 'time', 'date', 'datetime'`
  - `fieldProps: Object`: 表单属性
- `data: Array<Object>`: 显示的数据
- `pagination: object`: el-pagination分页属性(包含下列属性)
  - `align: String`: 分页水平位置 `[left, center, right]`
  - `style: Object|String`: 样式
- `fullElement: String | Element`: 全屏元素
- `loading: Boolean`:
- `loadingText: String`:
- `reload`:

- `editable: String | Object`: 编辑配置项
  - `type: String`: 编辑类型 `'cell', 'single-row', 'row'`,
  - `cellEditMode : String`: 单元格编辑模式 `'auto', 'handle'`,
  - `cellEditCancel: Boolean`: 单元格编辑是否显示取消 `false`
  - `onlyOneEditMessage: String`: 只能编辑一行的的提示

- `new-row: boolean | String`: 增加一行新数据， 对应 `@new-row` 事件


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


## events

- table 事件, 详见 https://element.eleme.cn/#/zh-CN/component/table#table-events
- pagination 事件
  - `pagination-size-change`
  - `pagination-current-change`
  - `pagination-prev-click`
  - `pagination-next-click`
- `value-change` 数据更新保存
- `new-row` 新增一条数据


## methods

- reload
- export
- fullscreen


## usage

1. 单元格内容显示
   - 绑定属性
   - renderColumn 函数
   - formatter 属性
   - 指定 slot

```html
<ve-table
  :data="articleList"
  :columns="columns">

  <template #action="{ row }">
    <el-button type="text" @click="$router.push('/view/${row.id}/')">查看</el-button>
  </template>
</ve-table>

<script>
export default {
  data() {
    return {
      columns: [
        { prop: 'title', label: '标题', minWidth: 150 },
        { prop: 'author', label: '作者', render: (h, { row }) => h('span', row.author?.name) },
        { prop: 'createTime', label: '时间', formatter: this.formatterDate },
        { prop: 'action', label: '操作', slots: { default: 'action', header: 'action-header' } }
      ]
    }
  },
  methods: {
    formatterDate(row, column, cellValue, index) {
      return cellValue
    }
  }
}
</script>
```



# Todo
1. 增加 request 方法
2. print
  - [Print.js](https://github.com/crabbly/Print.js)
  - https://zhuanlan.zhihu.com/p/87151162
3. fullscreen
  - https://www.npmjs.com/package/screenfull
  - [vue-fullscreen](https://github.com/mirari/vue-fullscreen)

https://github.com/SheetJS/printj


