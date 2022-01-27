
# Card Component



## Property
title: String,
extra: String,
size: String `small`  // 大小 small
raised: Boolean,      // 是否有阴影
outlined: Boolean,    // 是否有边框
square: Boolean,
divided: Boolean,     // 是否有分隔线 true
titleStyle: String,
headStyle: String,
headClass: String,
bodyStyle: String,
bodyClass: String,
footStyle: String,
footClass: String


## Slots

- default: body内容块
- header: 头部内容
  - extra: 头部右侧区域
- footer: 底部区域



## event

- click-extra


## Style

**class ：**

 - `.title` `.card-title`
 - `.extra` `.card-extra`

