
# Card
通用卡片容器。

## Property
- `headStyle: Object` : 自定义标题区域样式
- `bodyStyle: Object` : 内容区域自定义样式
- `title: String | slot` : 卡片标题
- `extra: String | slot` : 卡片右上角的操作区域
- `bordered: Boolean` : 是否有边框, 默认`true`
- `loading: Boolean` : 卡片内容还在加载中
- `hoverable: Boolean` : 鼠标移过时可浮起
- `type: String` : 卡片类型，可设置为 `inner`
- `ghost: Boolean` : 
- `size: String` : card 的尺寸 ['default', 'small']
- `actions: slot` : 卡片操作组，位置在卡片底部
- `tabExtra: String | slot` : tabbar 上额外的元素
- `tabProps: Object` : 
- `tabList: Array<object>`: 页签标题列表, 可以通过 slot 或 render 属性自定义 tab
  - `label: String`: 选项卡标题
  - `name: String`: 与选项卡绑定值 value 对应的标识符
  - `disabled: Boolean`: 是否禁用
  - `closable: Boolean`: 标签是否可关闭
  - `lazy: Boolean`: 标签是否延迟渲染
  - `active: Boolean`: 默认激活该项
  - `slot`: label区域slot名 `scopeSlots.label(item)`
  - `render(createElement, item)`: 渲染函数


## Slots

- default: body内容块
- title
- extra
- tabExtra
- cover
- actions


## event
- extra-click
- tab-click
- tab-change


# CardGrid
网格容器。

## props
- `hoverable: Boolean` : 鼠标移过时可浮起

# CardMeta
卡片信息容器。

- `avatar: String` : 头像/图标
- `title: String` : 容器类名
- `description: String` : 描述内容
