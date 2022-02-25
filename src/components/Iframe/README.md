
# vue-iframe

源自: https://github.com/officert/vue-friendly-iframe

Dynamic asnyc iframes are a technique for creating non-blocking, super fast loading iframes. Fast loading iframes are essential for building embedded widgets.

For a full description of dynamic asnyc iframes take a look at this article written by Aaron Peters: https://www.aaronpeters.nl/blog/iframe-loading-techniques-and-performance/

## Usage

```
<vue-iframe :src="src" @load="onLoad"></vue-iframe>
```


## Options

| Param         | Type     | Description                    | Default     |
| ------------- | -------- | ------------------------------ | ----------- |
| `src`         | `String` | Iframe's url                   |             |
| `className`   | `String` | Iframe's class attribute       |             |
| `crossorigin` | `String` | Iframe's crossorigin attribute | `anonymous` |
| `target`      | `String` | Iframe's target attribute      | `_parent`   |
| `allow`       | `String` | Iframe's allow attribute       |             |
| `name`        | `String` | Iframe's name attribute        |             |
| `title`       | `String` | Iframe's title attribute       |             |
| `sandbox`     | `String` | Iframe's sandbox attribute     |             |


## Events

| Event         | Description                                                  |
| ------------- | ------------------------------------------------------------ |
| `iframe-load` | Triggered when the iframe's body `onload` event is triggered |
| `load`        | Triggered after the iframe's `document.onreadystatechange` triggers and the documents `readyState` is `complete` |



