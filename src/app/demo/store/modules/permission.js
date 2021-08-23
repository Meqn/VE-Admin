import { getRoleMenus } from '@/api/user'
import {
  constantRoutes,
  exceptionRoutes,
  formRoutes,
  listRoutes,
  profileRoutes,
  resultRoutes,
  accountRoutes,
  extentRoutes,
  notFoundRoute
} from '@demo/router/routes'

// 异步路由
const asyncRoutes = [].concat(formRoutes, listRoutes, profileRoutes, exceptionRoutes, resultRoutes, accountRoutes, extentRoutes)

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

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit, rootGetters }) {
    const { data } = await getRoleMenus(rootGetters.role)
    const menus = flatMenus(data)
    const accessedRoutes = filterRoutes(asyncRoutes, menus)
    // 末尾插入 notFoundRoute
    accessedRoutes.push(notFoundRoute)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
