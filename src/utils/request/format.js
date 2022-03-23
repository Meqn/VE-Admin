/**
 * 统一化响应结果
 * @param {*} axios 
 * @param {*} options 
 */
export default function axiosFormat(axios, options = {}) {
  axios.interceptors.response.use(
    response => {
      return response.data
    }
  )
}
