
# GridFrom & GridFromItem 表单

> 同 `el-form` 和 `el-form-item`


## props

### Form
- `layout`

### FormItem
- `col-size`




# QueryFilter 筛选表单

## props

// cells
- `gutter: Number`: 24
// form
- `model: Object`:
- `rules: Object`:
- `labelPosition: String`:
- `labelWidth: String`: 92px
- `labelSuffix: String`:
- `hideRequiredAsterisk: Boolean`:
- `showMessage: Boolean`: true
- `inlineMessage: Boolean`:
- `statusIcon: Boolean`:
- `validateOnRuleChange: Boolean`: true
- `size: String`:
- `disabled: Boolean`:
// queryfilter
- `layout: String`: 表单项布局 [`vertical`,`horizontal`]
- `resetText: String`
- `searchText: String`
- `collapsed: Boolean` 默认是否折叠


## slots
- `default`
- `action`: `{ collapsed }`


## methods
- `submitForm`
- `resetForm`
- `finish`
- `toggleCollapse`

