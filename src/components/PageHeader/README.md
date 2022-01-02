# PageHeader

参考：https://ant-design.gitee.io/components/page-header-cn/

## props
- `title: String`: 标题
- `subTitle: String`: 副标题
- `separator: String`: 面包屑导航分隔符, `/`
- `separatorIcon: String`: 面包屑导航图标分隔符, `el-icon-arrow-right`
- `breadcrumb: Array<Object>`: 面包屑导航 `[{text, path}]`
- `ghost: Boolean`: 
- `showBack: Boolean`: 
- `backIcon: String`: `el-icon-back`
- `backText: String`: `返回`
- `tabList: Array<object>`: 标签页 `[{label, name, active}]`


## events
- `tab-click(tab: Component, event: Event)`: 
- `back(event: Event)`


## slots
- `default` : 内容区域
- `breadcrumb`
- `back` : 返回区域
- `title` : 标题，包含子标题
- `extra` : 扩展区，位于 title 行的行尾
- `tabExtra` : tabList 右侧尾部
- `footer` : 底部区域，如果存在 tabList则覆盖


## demo
```html
<AppPageHeader
  title="合同编号：X20142343495349"
  subTitle=""
  :breadcrumb="[
    { text: '采购合同', path: '/purchaseContract' },
    { text: '合同详情' },
  ]">
</AppPageHeader>
```

