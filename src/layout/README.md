# Layout

## props

- `loading: boolean`
- `title: string | VNode` : 左上角的 title
- `logo: string` : 左上角 logo 的 url
- `layout: string` : 菜单布局模式, `[side: '左右布局，左侧导航', mix: '混合布局']`
- `headerHeight: number`
- `fixedHeader: boolean,` : 固定 header 到顶部, `side` 模式生效
- `headerTheme: string` : 顶部主题
- `siderTheme: string` : 左栏导航主题
- `siderWidth: number` : 左栏宽度，默认 `210`
- `menu: Object,` : 左侧导航配置，同 `el-menu`
- `routes: Array<object>` : 
  - `title` : 
  - `path` : 
  - `icon` : 
  - `children` : 
- `defaultCollapsed: boolean` : 默认的菜单的收起和展开
- `collapsed: boolean` : 控制菜单的收起和展开
- `collapsedPosition: String` : 控制菜单的位置
- `footer: object | slot` : 
  - `copyright: string | VNode` : 
  - `links: Array<object>` : 
    - `key?: string` : 
    - `title?: string | VNode` : 
    - `href: string` : 
    - `blankTarget: boolean` : 


## slots
- menuHeader : 渲染 logo 和 title, 参数为 `{ theme, mode, collapsed }`, mode为布局方式
- menuExtra : 在菜单标题的下面渲染一个区域
- menuFooter : 在菜单底部渲染一个块
- headerContent (header) : 
- headerRight (actions) : 
- footer : 



# HeaderAccount
头部个人账户按钮
## props
- `avatar : String`
- `name : String | VNode`
- `menus: Array<object>`
  - `title: string`
  - `command: string | number | object` : 指令
  - `disabled: boolean` : 禁用
  - `divided: boolean:` : 显示分割线
  - `icon: string` : 图标类名

## events
- `command(command: string)`

## example
```html
<HeaderAccount
  @command="handleCommand"
  :avatar="user.avatar"
  :name="user.nickname"
  :menus="[
    { title: '个人中心', icon: 'el-icon-user', command: 'center' },
    { title: '账户设置', icon: 'el-icon-setting', command: 'setting' },
    { title: '退出登录', icon: 'el-icon-switch-button', command: 'logout', divided: true }
  ]"
/>
```


# HeaderSearch


# HeaderNotice


# HeaderMenu
头部导航菜单

## props
- `menus: Array<object>` : 菜单组
  - `path: string` : 路径
  - `title: string` : 标题
  - `icon: string` : 图标
- `collapsed: boolean` : 下拉展示


