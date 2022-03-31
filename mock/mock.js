import Mock from 'mockjs'
const Random = Mock.Random

function createUrl(url) {
  return typeof url === 'string' ? RegExp(url + '(\\?.)?') : url
}

function parseBody(str) {
  try {
    return JSON.parse(str)
  } catch (error) {
    return {}
  }
}

function param2obj(url) {
  try {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
    if (!search) return {}

    const result = {}
    const searchArr = search.split('&')
    searchArr.forEach(v => {
      const index = v.indexOf('=')
      if (index !== -1) {
        const key = v.substring(0, index)
        const val = v.substring(index + 1, v.length)
        const _val = val.includes(',') ? val.split(',') : val
        if (result[key] !== undefined) {
          result[key] = [].concat(result[key], _val)
        } else {
          result[key] = _val
        }
      }
    })
    return result
  } catch (error) {
    return {}
  }
}

/**
 * 格式化分页数据
 * @param {*} result 
 * @param {*} param 
 * @returns 
 */
function pagination(result, { count = 100, page = 1, pageSize = 10 }) {
  count = parseInt(count)
  page = parseInt(page)
  pageSize = parseInt(pageSize)

  let results = []
  const totalPage = Math.ceil(count / pageSize)

  if (result) {
    const currentPageSize = page < totalPage ? pageSize : (count - (pageSize * (totalPage - 1)))
    results = Array(currentPageSize).fill('').map(() => {
      return typeof result === 'function' ? result() : result
    })
  }
  
  return {
    count,
    previous: page === 1 ? null : `/?page=${page - 1}`,
    next: page === totalPage ? null : `/?page=${page + 1}`,
    results
  }
}


/**
 * 给一个 type类型： default, list, pagination
 * 
 * @param {*} url 
 * @param {*} type 
 * @param {*} result 
 */
function mockXHR(url, type = 'get', result) {
  const _url = createUrl(url)
  Mock.mock(_url, type, options => {
    const { body, type, url } = options
    const params = {
      url,
      type,
      body: parseBody(body),
      query: param2obj(url)
    }
    const data = typeof result === 'function' ? result.call(this, params) : result
    return Mock.mock({
      code: 0,
      message: 'ok',
      data
    })
  })
}

export {
  Mock,
  Random,
  mockXHR,
  pagination
}

export default function setupMock(config = {}, setup) {
  const { enable, timeout } = config

  // 不启用
  if (enable === false) return

  // Mock 配置
  if (timeout) {
    Mock.setup({
      timeout
    })
  }

  typeof setup === 'function' && setup.call(Mock, { Mock, mockXHR })
}
