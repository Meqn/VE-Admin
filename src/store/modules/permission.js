// import { getMenus } from '@/api/user'
// import { constantRoutes, asyncRoutes, notFoundRoute } from '@demo/router/routes'
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
 * 需要遍历的路由
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
 * 递归过滤 route
 * @param {Array} routes 
 * @param {Array} menus 
 * @returns 
 */
function filterRoutes(routes, menus, mount = false) {
  const res = []
  if (Array.isArray(routes) && routes.length > 0 && menus) {
    routes.forEach(route => {
      const tmp = { ...route }
      if (menus.includes(route.name) || (mount && route.meta?.automount)) {
        if (tmp.children) {
          tmp.children = filterRoutes(tmp.children, menus, true)
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
 * @param {object} param.fetches http请求结合 { getMenus }
 * @returns 
 */
export default function createPermission({ routes = {}, fetches = {} }) {
  const { getMenus } = fetches
  const { constantRoutes, asyncRoutes, notFoundRoute } = routes

  const state = {
    routes: [],
    addRoutes: [],
    cachedViews: []
  }
  
  const mutations = {
    SET_ROUTES(state, routes) {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_CACHE_VIEWS(state, views) {
      state.cachedViews = views
    }
  }
  
  const actions = {
    async generateRoutes({ commit, dispatch, rootGetters }) {
      // 获取所有菜单
      const { data } = await getMenus(rootGetters.role)
      // 扁平化嵌套菜单
      const menus = flatMapDeep(data, 'children', item => item.name)
      const accessedRoutes = filterRoutes(asyncRoutes, menus)
      // 末尾插入 notFoundRoute
      accessedRoutes.push(notFoundRoute)
      commit('SET_ROUTES', accessedRoutes)
      setTimeout(() => {
        dispatch('setCacheViews')
      }, 10)
      return accessedRoutes
    },
    setCacheViews({ commit, state }) {
      commit('SET_CACHE_VIEWS', findCachedViews(state.routes))
    }
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions
  }
}
