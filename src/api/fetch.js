// import request from '@/utils/request'
// import client from '@/utils/request-func'
import client from '@/utils/request/index'

export function login(data, config) {
  return client.post('http://test-material-api.zaiont.com/api-user/api/v1/userlogin/login/', {
    data: {
      access_key: 'xuqiu00',
      access_secret: 'a123456',
      login_type: 1
    }
  })
}

export function getArea(code = '320000', cancelToken = {}) {
  console.log('getArea', arguments)
  return client({
    url: `http://test-material-api.zaiont.com/api-user/api/v1/unsigned/china/areas/geo/?code=${code}`,
    _withToken: true,
    _errorMessage: true,
    ...cancelToken
  })
}

export function getError(data, config) {
  return client({
    url: 'http://test-material-api.zaiont.com/api-base/api/v1/test/error/',
    ...config,
    /* headers: {
      Authorization: 'eyJhbGciOiJIUzI1NiJ9.eyJhY2Nlc3NrZXkiOiJ4dWtlMDQiLCJwaG9uZW51bWJlciI6IjE4NTE2MDA4MzUzIiwiaXNzIjoicGluZWFwcGxlIiwiaWQiOjM3NTUsInR5cGUiOjEwLCJleHAiOjE2NDk2NDc1Mzh9.op8tNnkZcSjN_VYUEiaGielEB8f-kbqk0rBE-BqtCUc'
    } */
  }, {
    _withToken: false,
    // showErrorMessage: false
  })
}




