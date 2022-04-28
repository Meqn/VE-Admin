# Virtual Select

虚拟列表选择器, 支持分页


## Props
- `el-select` 属性
  - `remote-method: Function` : 必须是 PromiseFn
- `width: String` : 宽度
- `options: Array<object>` : 下拉列表数据
- `value-options: Array<object>` : 默认值 列表数据
- `immediate: Boolean` : 立即请求数据
- `itemRender: Node` : 列表项内容, 参数({ item, index })
- `itemHeight: Number` : 列表项高度
- `keeps: Number` : --
- `pagination: Object` : 分页配置
  - `pageCount: Number` : 总页码
  - `total: Number` : 总条目数
  - `pageSize: Number` : 每页条目数
  - `page: Number` : 当前页码



## Slots

- `default({ item, index })`
- `header`
- `footer`


## Events

- `change(value)`
- `visible-change(value: boolean)`
- `remove-tag(value)`
- `clear`
- `blur`
- `focus`
- `scrollTop`
- `scrollBottom`


## Methods

- `focus`
- `blur`
- `scrollToIndex(index: number)`



## Example

```html
<VeVirtualSelect
  v-model="value"
  multiple
  collapseTags
  remote
  :remote-method="queryUser"
  :pagination="{ total, pageSize: 50 }">
  <template #default="{item}">{{ item.label }}</template>
</VeVirtualSelect>


<VeVirtualSelect
  v-model="value"
  clearable
  :options="optionList"
  filterable
  :item-render="renderItem"
/>
```

```js
export default {
  data() {
    return {
      value: ''
    }
  },
  methods: {
    queryUser(query) {
      return new Promise((resolve) => {
        const results = [
          { label, value },
          { label, value },
          { label, value },
        ]
        
        resolve(results)
      })
    }
  }
}
```

