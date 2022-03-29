import Axios from 'axios'
const CancelToken = Axios.CancelToken

/**
 * 保持请求唯一
 * @param {AxiosInstance} fetcher 请求函数
 * @returns 
 */
export default function withCancelToken(fetcher) {
  let abort
  
  function send(...args) {
    cancel() // 每次请求都自动取消上一次

    const cancelToken = new CancelToken(cancel => (abort = cancel))
    return fetcher.apply(this, args.concat[{ cancelToken }])
  }

  function cancel(message = 'abort') {
    if (abort) {
      abort(message)
      abort = null
    }
  }
  return [send, cancel]
}
