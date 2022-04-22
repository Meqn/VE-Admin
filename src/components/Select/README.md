# Select

同 `el-select`

* 1. 简化远程请求，
* 2. 限制option内容过长


## props
> 同 `el-select`

新增：
- `options`: Array, // 列表数据
- `immediate`: Boolean, // 是否立即执行 (默认有值，可用于编辑状态)

> 注：`remote-method` 必须是返回一个 `Promise`方法

## slots
- `default(item)`



## example

```html
<VeSelect
  v-model="user"
  remote
  immediate
  clearable
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
    queryUsers(text) {
      return getUsers({ name: text }).then(({ data }) => {
        return data.map(item => ({
          label: item.name,
          value: item.id
        }))
      })
    }
  }
}
```
