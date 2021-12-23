# Space 间距

统一组件之间的间距。


## props
- `size`: [Number, String], 间隔大小 `['small', 'middle', 'large']`
- `direction`: String, 排列的方向 `['horizontal', 'vertical']`
- `align`: String, 对齐的方式 `['start', 'end', 'center', 'baseline']`
- `wrap`: Boolean, 是否自动换行
- `spacer`: `[String, VNode]` 间隔符


## example

```html
<ve-space :size="24" spacer="|">
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="success">成功按钮</el-button>
  <el-button type="info">信息按钮</el-button>
  <el-button type="warning">警告按钮</el-button>
  <el-button type="danger">危险按钮</el-button>
</ve-space>
```


`VNode` 分隔符:

```html
<template>
  <ve-space :spacer="spacer">
    <el-button>默认按钮</el-button>
    <el-button type="primary">主要按钮</el-button>
    <el-button type="success">成功按钮</el-button>
    <el-button type="info">信息按钮</el-button>
    <el-button type="warning">警告按钮</el-button>
    <el-button type="danger">危险按钮</el-button>
  </ve-space>
</template>

<script>
export default {
  data() {
    return {
      spacer: null
    }
  },
  mounted() {
    const h = this.$createElement
    this.spacer = h('Icon', {
      props: {
        name: 'el-icon-user-solid'
      }
    })
  }
}
</script>
```
