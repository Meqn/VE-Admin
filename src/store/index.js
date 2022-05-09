import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const defaultGetters = {
  role: state => state.user?.role,
  user: state => state.user?.profile,
  permissionRoutes: state => state.permission?.routes || []
}

export function createStore(config = {}) {
  const getters = Object.assign({}, defaultGetters, config.getters)
  
  return new Vuex.Store({
    ...config,
    getters
  })
}

export * from './utils'

export { default as createPermission } from './modules/permission'
export { default as createUser } from './modules/user'

export default createStore
