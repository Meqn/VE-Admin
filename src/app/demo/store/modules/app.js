import AppConfig from '@demo/app.config'
import Storage from '@/utils/storage'

const SIDEBAR_STATUS = 'SIDEBAR_STATUS'

const state = {
  name: 'demo',
  logo: {
    url: AppConfig.logo_url,
    text: AppConfig.logo_text
  },
  sideCollapsed: !!Storage.get(SIDEBAR_STATUS),
  isMobile: false
}

const mutations = {
  SET_SIDEBAR_TYPE(state, type) {
    state.sideCollapsed = type
    Storage.set(SIDEBAR_STATUS, type)
  },
  SET_MOBILE_TYPE(state, type) {
    state.isMobile = type
  }
}

const actions = {
  toggleSideBar({ commit }, val) {
    commit('SET_SIDEBAR_TYPE', val)
  },
  toggleMobile({ commit }, val) {
    commit('SET_MOBILE_TYPE', val)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
