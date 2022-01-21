# PageHeader

参考：https://ant-design.gitee.io/components/page-header-cn/

## props
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
- `tabList: Array<object>`: 标签页 `[{ label, name, disabled, closable, lazy, active }]`

## events
- `tab-click(tab: Component, event: Event)`: tab 被选中事件
- `tab-change(TabKey: string)`: tab切换事件
- `back(event: Event)`: 返回上一页事件


## slots
- `default`: 内容区域
- `breadcrumb`: 导航区域
- `back` : 返回区域
- `title` : 标题，包含子标题
- `extra` : 扩展区，位于 title 行的行尾
- `tabExtra` : tabList 右侧区域
- `footer` : 底部区域，如果存在 tabList则覆盖


## demo
```html
<AppPageHeader
  title="合同编号：X20142343495349"
  subTitle=""
  :breadcrumb="{
    routes: [
      { text: '采购合同', path: '/purchaseContract' },
      { text: '合同详情' },
    ]
  }">
</AppPageHeader>
```

