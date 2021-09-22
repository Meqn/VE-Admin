# Icon 图标

支持 引入`svg`图标文件、`font-icon`、及`外部链接`。

> `svg`图标支持双色。

## props

- `name`: String 图标名称
- `size`: Number 图标大小
- `color`: [String, Array] 图标颜色，svg图标支持双色
- `rotate`: Number 旋转角度


## 自定义图标

### 1. svg图标
1. 将svg文件存在 `src/components/Icon/svg` 目录下；
2. 在应用入口文件`app.js`引入 `@/components/Icon/svg.js` 即可。

**调用:**
```html
<ve-icon name="svg文件名">
```

### 2. font-icon 图标

> ⚠️ 提示：图标名称必须以 `xxx-icon-` 开头。

```css
@font-face {
  font-family: "view-icon"; /* Project id 1684056 */
  src: url('//at.alicdn.com/t/font_1684056_lfzwo0dtlpk.woff2?t=1622700695332') format('woff2'),
       url('//at.alicdn.com/t/font_1684056_lfzwo0dtlpk.woff?t=1622700695332') format('woff'),
       url('//at.alicdn.com/t/font_1684056_lfzwo0dtlpk.ttf?t=1622700695332') format('truetype');
}

[class^="view-icon-"], [class*=" view-icon-"] {
  font-family: "view-icon" !important;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

**调用:**

```html
<ve-icon name="view-icon-user-fill">
```

