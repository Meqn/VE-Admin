import createPermission from '@/store/modules/permission'

import { getMenus } from '@/api/user'
import { resetRouter } from '@demo/router'
import { constantRoutes, asyncRoutes } from '@demo/router/routes'

const routes = { constantRoutes, asyncRoutes }

const {
  state,
  mutations,
  actions
} = createPermission({ routes, resetRouter, getMenus })

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
