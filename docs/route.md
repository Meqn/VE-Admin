
# 路由和侧边栏



## 配置项

```js
{
  path: '',
  name: '',
  children: [],
  meta: {
    title: '',
    icon: '',
    noCache: true,
    asMenu: true,
    activeMenu: '',
    hidden: true,
    automount: true,        // 若接口未返回该路由，则随父级自动挂载
    noRequiresAuth: true
  }
}
```

- `path` : 路径
- `name` : 路由的名字，一定要填写且不能重复，匹配接口返回的路由列表
- `title` : 菜单名 (侧边栏和面包屑中展示的名字)
- `icon` : 菜单图标 (侧边栏)
- `noCache`
- `hidden` :
- `automount` : true, 即使接口返回的数据未匹配到该路由，仍会随父级自动挂载
- `noRequiresAuth` : 验证路由是否需要登录(token)
- `asMenu` : 
  - 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
  - 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
  - 若你想不管路由下面的 children 声明的个数都显示你的根路由
  - 你可以设置 asMenu: true，这样它就会忽略之前定义的规则，一直显示根路由
- `activeMenu` : 若设置则高亮对应的侧边栏，菜单高亮默认匹配 `path`
  - 当路由设置了该属性，则会高亮相对应的侧边栏。
  - 这在某些场景非常有用，比如：一个文章的列表页路由为：`/article/list`
  - 点击文章进入文章详情页，这时候路由为`/article/123`，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置