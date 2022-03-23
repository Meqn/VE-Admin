





## withCancelToken
支持取消当前请求

### example

```js
// api.js
export function getUser(userId, cancelToken) {
  return request({
    url: `/api/v1/user/${userId}`,
    ...cancelToken
  })
}
```

```js
// user.vue
impor { getUser } from '@/api'

const [fetchUser, abortUser] = withCancelToken(getUser)

export default {
  created() {
    // 请求 userId = 9527 的用户
    fetchUser(9527)
  },
  beforeDestroy() {
    // 在组件销毁时取消接口请求
    abortUser('取消请求用户详情')
  }
}
```


# references
- [Axios封装之函数](https://juejin.cn/post/7053471988752318472)
- [完整的Axios封装](https://juejin.cn/post/6968630178163458084)
- [Axios取消功能详解](https://segmentfault.com/a/1190000039127387)