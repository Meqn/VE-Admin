

## item

```js
item = {
  src: '',
  mediaType: '', // 文件类型
  ext: '',  // 文件后缀
  alt: '',
  thumb: '',
  picture: '',
  srcset: '',
  sizes: '',
  title: '',
  description: '',
  autoplay: ''
}
```


## type逻辑
1. 文件分为 image、video、file、iframe，如果 type='', 则为iframe
2. 如果为文件，则新窗口打开，预览窗口自动关闭
