# 1. VeForm

表单组件，在`el-form` 之上增加了两种自适应布局设置。

> 属性同 `el-form`

![image-20220218153847456](https://cdn.jsdelivr.net/gh/Meqn/store/imgs/20220218/image-20220218153847456-5e48ed.png)

# 2. VeFormGroup

表单项组，目前仅支持 `grid` 和 `cell` 两种布局方式。

> `FormGroup.type = cell` 时，隐藏表单错误提示(CSS控制)。

## props
- `type: string` : 显示方式，`grid`为结合栅格布局; `cell`为结合Descriptions显示布局
- `title: string | slot` : 标题
- `extra: string | slot` : 扩展区域
- `column: number` : 一行 Item 的数量
- `gutter: number` : 每个 Item 的间距, 仅支持 `type='grid'`
- `align: string` : `grid` 模式下item垂直排列方式，默认 `top`，支持 `top/middle/bottom`
- `direction: String` : `cell` 模式下item对齐方式，默认 `horizontal`
- `size: string` : form尺寸

## slots

- title
- extra



# 3. VeFormItem

同 `el-form-item`

## props

- 拥有 `el-form-item` 所有属性
- `span: number` : 每一行 form-item 个数
- `offset: number` : 当前 item 偏移量，仅在 `FormGroup.type = grid` 下有效
- `formItemClass: string | object | array` : 
- `formItemStyle: object` : 




# 4. VeQueryForm

查询表单，同 `el-form`

## props

- 拥有 `el-form` 属性
- `gutter: number` : `form-item` 间距
- `resetText: string` : 重置按钮文本
- `searchText: string` : 查询按钮文本
- `collapsed: boolean` : 默认收起

## scope-slots

- `action` : `{ collapsed: boolean }`

## events

- `submit`
- `reset`

## methods

- `finish()` 搜索完成 (`loading = false`)
