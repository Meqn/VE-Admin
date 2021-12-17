
# table


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
- `fullElement: String | Element`: 全屏元素
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
        { prop: 'author', label: '作者', renderColumn: (h, { row }) => h('span', row.author?.name) },
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



# 改进

1. 可编辑
