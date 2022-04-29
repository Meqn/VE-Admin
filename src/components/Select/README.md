# Select

同 `el-select`

* 1. 简化远程请求，
* 2. 限制option内容过长


## props
- `el-select` 属性
  - `remote-method: Function` : 必须是 PromiseFn
- `options: Array<object>` : 下拉列表数据
- `immediate: Boolean` : 是否立即执行 (默认有值，可用于编辑状态)


## slots
- `default({ item, index })`



## example

```html
<VeSelect
  v-model="user"
  remote
  immediate
  :remote-method="queryUsers"
  placeholder="选择用户">
  <template #default="item">{{item.value}} -- {{item.label}}</template>
</VeSelect>
```

```js
export default {
  data() {
    return {
      user: ''
    }
  },
  methods: {
    queryUsers(query) {
      return getUsers({ name: query }).then(({ data }) => {
        return data.map(item => ({
          label: item.name,
          value: item.id
        }))
      })
    }
  }
}
```
