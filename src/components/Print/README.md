# Print 打印

打印功能 [Print.js](https://github.com/crabbly/Print.js)

> Print.js support four print document types available: `'pdf', 'html', 'raw-html', 'image' and 'json'`. The default type is `'pdf'`.

## Usage

```
yarn add print-js
```

```js
// Print PDF with Message
printJS({printable:'docs/xx_large_printjs.pdf', type:'pdf', showModal:true})
```

```js
// base64打印
fetch('https://printjs.crabbly.com/docs/base64.txt').then(function(response) {
  response.text().then(function(base64) {
    printJS({
      printable: base64,
      type: 'pdf',
      base64: true
    })
  })
})
```

```js
// 打印html片段 : <div id="form-id">打印内容</div>
printJS('form-id', 'html')

printJS({ printable: 'form-id', type: 'html', header: 'PrintJS - Form Element Selection' })

printJS({ printable: document.getElementById('form-id'), type: 'html' })

printJS({ printable: `<div>打印内容</div>`, type: 'raw-html' })
```

```js
// 打印图片
printJS('images/print-01-highres.jpg', 'image')

 printJS({
  printable: ['images/print-01-highres.jpg', 'images/print-02-highres.jpg', 'images/print-03-highres.jpg'],
  type: 'image',
  header: 'Multiple Images',
  imageStyle: 'width:50%;margin-bottom:20px;'
 })
```

```js
// 打印JSON数据
printJS({printable: someJSONdata, properties: ['name', 'email', 'phone'], type: 'json'})

printJS({
  printable: someJSONdata,
  properties: ['name', 'email', 'phone'],
  type: 'json',
  gridHeaderStyle: 'color: red;  border: 2px solid #3971A5;',
  gridStyle: 'border: 2px solid #3971A5;'
})

printJS({
  printable: someJSONdata,
  type: 'json',
  properties: ['name', 'email', 'phone'],
  header: '<h3 class="custom-h3">My custom header</h3>',
  style: '.custom-h3 { color: red; }'
})
```


## Options

* [Print Docs](https://printjs.crabbly.com/)


| Argument           | Default Value            | Description                                                  |
| ------------------ | ------------------------ | ------------------------------------------------------------ |
| printable          | null                     | Document source: pdf or image url, html element id or json data object. |
| type               | 'pdf'                    | Printable type. Availble print options are: pdf, html, image, json and raw-html. |
| header             | null                     | Optional header to be used with HTML, Image or JSON printing. It will be placed on the top of the page. This property will accept text or raw HTML. |
| headerStyle        |                          | Optional header style to be applied to the header text.      |
| maxWidth           | 800                      | Max document width in pixels. Change this as you need. Used when printing HTML, Images or JSON. |
| css                | null                     | This allow us to pass one or more css files URLs that should be applied to the html being printed. Value can be a string with a single URL or an array with multiple URLs. |
| style              | null                     | This allow us to pass a string with custom style that should be applied to the html being printed. |
| scanStyles         | true                     | When set to false, the library will not process styles applied to the html being printed. Useful when using the `css` parameter. |
| targetStyle        | null                     | By default, the library process some styles only, when printing HTML elements. This option allows you to pass an array of styles that you want to be processed. Ex.: ['padding-top', 'border-bottom'] |
| targetStyles       | null                     | Same as `targetStyle`, however, this will process any a range of styles. Ex.: ['border', 'padding'], will include 'border-bottom', 'border-top', 'border-left', 'border-right', 'padding-top', etc. You can also pass ['*'] to process all styles. |
| ignoreElements     | `[]`                     | Accepts an array of html ids that should be ignored when printing a parent html element. |
| properties         | null                     | Used when printing JSON. These are the object property names. |
| gridHeaderStyle    |                          | Optional style for the grid header when printing JSON data.  |
| gridStyle          |                          | Optional style for the grid rows when printing JSON data.    |
| repeatTableHeader  |                          | Used when printing JSON data. When set to `false`, the data table header will show in first page only. |
| showModal          |                          | Enable this option to show user feedback when retrieving or processing large PDF files. |
| modalMessage       | 'Retrieving Document...' | Message displayed to users when `showModal` is set to `true`. |
| onLoadingStart     | null                     | Function to be executed when PDF is being loaded             |
| onLoadingEnd       | null                     | Function to be executed after PDF has loaded                 |
| documentTitle      | 'Document'               | When printing html, image or json, this will be shown as the document title. |
| fallbackPrintable  | null                     | When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. This allow you to pass a different pdf document to be opened instead of the original passed in `printable`. This may be useful if you inject javascript in your alternate pdf file. |
| onPdfOpen          | null                     | When printing pdf, if the browser is not compatible (check browser compatibility table), the library will open the pdf in a new tab. A callback function can be passed here, which will be executed when this happens. It may be useful in some situations where you want to handle your print flow, update user interface, etc. |
| onPrintDialogClose | null                     | Callback function executed once the browser print dialog is closed. |
| onError            |                          | Callback function to be executed when an error occurs.       |
| base64             | false                    | Used when printing PDF documents passed as base64 data.      |
| honorMarginPadding | true                     | This is used to keep or remove padding and margin from elements that are being printed. Sometimes these styling settings are great on screen but it looks pretty bad when printing. You can remove it by setting this to false. |
| honorColor         | false                    | To print text in color, set this property to true. By default all text will be printed in black. |
| font               | `TimesNewRoman`          | Typeface used when printing HTML or JSON.                    |
| font_size          | `12pt`                   | Font size used when printing HTML or JSON.                   |
| imageStyle         | `width:100%`             | Used when printing images. Accepts a string with custom styles to be applied to each image. |


