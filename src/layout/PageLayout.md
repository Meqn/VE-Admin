# PageLayout

## props
- `headStyle: [String, Object]`: 头部区域样式
- `headClass: String`: 
- `bodyStyle: [String, Object]`: 内容区域样式
- `bodyClass: String`: 
- `footStyle: [String, Object]`: 底部区域样式
- `footClass: String`: 

### PageHeader props
- `content`: 内容区
- `ghost: Boolean`: 配置头部区域的背景颜色为透明
- `title: String`: 标题
- `subTitle: String`: 副标题
- `breadcrumb: Object | Boolean`: 面包屑导航 `[{text, path}]`
  - `separator: String` 分隔符, `/`
  - `separator-class: String` 图标分隔符 class `el-icon-arrow-right`
  - `routes: Array<object>` 路由列表
    - `text: String` 路由名
    - `path: String | Object` 路径
    - `replace: Boolean` 是否添加新纪录
- `back: Boolean | Object`:
  - `icon: String`: `el-icon-back`
  - `text: String`: `返回文本`
- `tabList: Array<object>`: 标签页选项
  - `label: String`: 选项卡标题
  - `name: String`: 与选项卡绑定值 value 对应的标识符
  - `disabled: Boolean`: 是否禁用
  - `closable: Boolean`: 标签是否可关闭
  - `lazy: Boolean`: 标签是否延迟渲染
  - `active: Boolean`: 默认激活该项


## events
- `tab-click(tab: Component, event: Event)`: tab被选中事件
- `tab-change(TabKey: String)`: tab切换事件
- `back(event: Event)`: 返回上一页事件

## slots
- `default` : 默认内容区域
- `header` : 头部区域
- `footer`: 底部区域

### PageHeader slots
- `content`: 内容区域
- `breadcrumb`: 导航区域
- `title` : 标题，包含子标题
- `extra` : 扩展区，位于 title 行的行尾
- `tabExtra` : tabList 右侧区域



