// import AppConfig from '@demo/app.config'
import Storage from '@/utils/storage'

/**
 * app配置数据
 * @param {object} param 参数
 * @param {string} param.appName app名称
 * @param {object} param.appConfig app配置 (对应的 app.config.js文件)
 * @returns 
 */
export default function createApp({ appName = '', appConfig = {} }) {
  const SIDEBAR_STATUS = `${appName && appName + '_'}SIDEBAR_STATUS`

  const state = {
    name: appName,
    logo: {
      url: appConfig.logo_url,
      text: appConfig.logo_text
    },
    sidebarCollapsed: !!Storage.get(SIDEBAR_STATUS),
    isMobile: false
  }

  const mutations = {
    TOGGLE_SIDEBAR(state, type) {
      state.sidebarCollapsed = type
      Storage.set(SIDEBAR_STATUS, type)
    },
    SET_MOBILE_TYPE(state, type) {
      state.isMobile = type
    }
  }

  const actions = {
    toggleSideBar({ commit, state }, val) {
      const value = typeof val === 'boolean' ? val : !state.sidebarCollapsed
      commit('TOGGLE_SIDEBAR', value)
    },
    toggleMobile({ commit }, val) {
      commit('SET_MOBILE_TYPE', val)
    }
  }

  return {
    namespaced: true,
    state,
    mutations,
    actions
  }
}
