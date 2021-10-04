# PageHeader


## props
- `title: String`: 标题
- `subTitle: String`: 副标题
- `separator: String`: 面包屑导航分隔符 `el-icon-arrow-right`{
- `breadcrumb: Array<Object>`: 面包屑导航 `[{text, path}]`
- `ghost: Boolean`: 
- `showBack: Boolean`: 
- `backIcon: String`: `el-icon-back`
- `backText: String`: `返回`
- `tabList: Array<object>`: 标签页 `[{label, name, active}]`


## events
- `tab-click(tab: Component, event: Event)`: 



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

