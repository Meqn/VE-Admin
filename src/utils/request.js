import Axios, { CancelToken } from 'axios'

const service = Axios.create({
  // 配置
})

service.interceptors.request.use(
  config => {},
  error => {}
)

service.interceptors.response.use(
  response => {},
  error => {}
)


/********************************************************************
 * cancelToken 取消请求
 * 参考：https://juejin.cn/post/7053471988752318472
 */
export function withCancelToken(fetcher) {
  let abort
  
  function send(data, config) {
    cancel() // 主动取消

    const cancelToken = new CancelToken(cancel => (abort = cancel))
    return fetcher(data, { ...config, cancelToken })
  }

  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }

  return [send, cancel]
}

// 使用 withCancelToken
function getUser(id, config) {
  return service(`api/user/${id}`, config)
}

// 包装请求函数
const [fetchUser, abortRequest] = withCancelToken(getUser)

// 发送请求
// 如果上一次请求还没回来，会被自动取消
fetchUser('1000')

// 通常不需要主动调用
// 但可以在组件销毁的生命周期中调用
abortRequest()

// 这样不需要自动取消的时候，直接使用原函数即可，也不会影响原函数的使用

