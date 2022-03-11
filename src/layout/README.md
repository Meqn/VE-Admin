# Layout

## props

- `title: string | VNode` : 左上角的 title
- `logo: string` : 左上角 logo 的 url
- `layout: string` : 菜单布局模式, `[side: '左右布局，左侧导航', mix: '混合布局']`
- `fixedHeader: boolean,` : 固定 header 到顶部, `side` 模式生效
- `headerTheme: string` : 顶部主题
- `siderTheme: string` : 左栏导航主题
- `siderWidth: number` : 左栏宽度，默认 `210`
- `menu: Object,` : 左侧导航配置，同 `el-menu`
- `routes: Array<object>` : 
  - `name` : 
  - `path` : 
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
- menuHeader : 渲染 logo 和 title
- menuExtra : 在菜单标题的下面渲染一个区域
- menuFooter : 在菜单底部渲染一个块
- headerContent (header) : 
- headerRight (actions) : 
- footer : 

## Header

### event
- `menu-header` : 菜单的头部点击事件



## Footer

### props
- copyright: string
- links
  - key?: string
  - title?: string
  - href: string
  - blankTarget: boolean

