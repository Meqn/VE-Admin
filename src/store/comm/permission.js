import { flatMapDeep } from '@/utils'

/**
 * 查找所有父节点
 * @param {*} name 
 * @param {*} nodes 
 * @returns 
 */
function findAllParent(name, nodes) {
  for (const node of nodes) {
    if (name === node.name) {
      return [node.name]
    }
    if (node.children) {
      const result = findAllParent(name, node.children)
      if (result) {
        return result.concat(node.name)
      }
    }
  }
}

/**
 * 查找所有缓存路由及其父节点
 * @param {*} routes 
 * @returns 
 */
function findCachedViews(routes) {
  let views = []
  ;(function query(list) {
    list.forEach(route => {
      if (route.meta?.cache) {
        views = views.concat(findAllParent(route.name, routes))
      }
      if (route.children) {
        query(route.children)
      }
    })
  })(routes)
  return Array.from(new Set(views))
}

/**
 * 查找所有缓存路由
 * @param {*} routes 路由
 * @param {*} result 结果
 * @returns 
 */
function queryCachedViews(routes, result = []) {
  routes.forEach(route => {
    if (route.meta?.cache) {
      result.push(route.name)
    }
    if (route.children) {
      queryCachedViews(route.children, result)
    }
  })
  return result
}

/**
 * 递归过滤 route
 * @param {Array} routes 
 * @param {Array} menus 
 * @param {boolean} mount
 * @returns 
 */
function filterRoutes(routes, menus, mount = false) {
  const res = []
  if (Array.isArray(routes) && Array.isArray(menus) && menus.length > 0) {
    routes.forEach(route => {
      const tmp = { ...route }
      if (menus.includes(route.name) || mount) {
        if (tmp.children) {
          tmp.children = filterRoutes(tmp.children, menus, route.meta?.automount)
        }
        res.push(tmp)
      }
    })
  }

  return res
}

/**
 * 扁平化嵌套菜单
 * @param {Array} menus 所有侧边栏菜单
 * @returns 
 */
function flatMenus(menus) {
  let res = []
  if (Array.isArray(menus)) {
    menus.forEach(menu => {
      res.push(menu.name)
      if (menu.children) {
        res = res.concat(flatMenus(menu.children))
      }
    })
  }
  return res
}

/**
 * 权限路由参数
 * @param {object} param 参数
 * @param {object} param.routes 路由配置 {constantRoutes, asyncRoutes, notFoundRoute}
 * @param {object} param.handlers http请求结合 { getMenus }
 * @returns 
 */
export default function createPermission({ routes = {}, handlers = {} }) {
  const { getMenus, resetRouter } = handlers
  const { constantRoutes = [], asyncRoutes = [], notFoundRoute = [] } = routes

  const state = {
    routes: [],
    addRoutes: []
  }
  
  const mutations = {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    }
  }
  
  const actions = {
    async generateRoutes({ commit, dispatch, rootGetters }) {
      try {
        // 获取所有菜单
        const { data } = await getMenus(rootGetters.role)
        // 扁平化嵌套菜单
        const menus = flatMapDeep(data, 'children', item => item.name)
        const accessedRoutes = filterRoutes(asyncRoutes, menus)
        // 末尾插入 notFoundRoute
        accessedRoutes.push(notFoundRoute)

        commit('SET_ROUTES', accessedRoutes)
        return accessedRoutes
      } catch (error) {
        console.error('generateRoutes', error)
        return []
      }
    },
    resetRouter: {
      root: true,
      handler() {
        resetRouter && resetRouter()
      }
    }
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions
  }
}
