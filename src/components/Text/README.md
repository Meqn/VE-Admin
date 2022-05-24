# 文本Text

> 参考 `AntD@Typography排版`

## Props
* `type: String` : 文本类型, 支持`['primary', 'success', 'warning', 'danger', 'info']`
* `tag: String` : 默认 `<span>`
* `icon: String`
* `iconColor: String`
* `iconSize: Number`
* `disabled: Boolean`
* // 样式标签
* `code: Boolean`
* `keyboard: Boolean`
* `delete: Boolean`
* `mark: Boolean`
* `strong: Boolean`
* `italic: Boolean`
* `underline: Boolean`
* `copyable: [Boolean, Object]` 是否可拷贝, 默认 true
  * `text: String` 拷贝到剪切板里的文本
  * `icon: [String|VNode, String|VNode]` 自定义拷贝图标：[默认图标, 拷贝后的图标]
  * `tooltips: Boolean | [String|VNode, String|VNode]` 自定义提示文案，为 false 时隐藏文案
  * `onCopy: Function` 拷贝成功的回调函数
* `ellipsis: [Boolean, Number]` 自动溢出省略


## Events
* `click`



# ref
* [copy-to-clipboard](https://github.com/sudodoki/copy-to-clipboard)
* [AntD@Typography排版](https://ant.design/components/typography-cn/)

