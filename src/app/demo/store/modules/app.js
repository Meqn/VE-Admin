import AppConfig from '@demo/app.config'
import Storage from '@/utils/storage'

const SIDEBAR_STATUS = 'sidebarStatus'
const SIDEBAR_THEME = 'sidebarStatus'

const state = {
  name: 'demo',
  logo: {
    url: AppConfig.logo_url,
    text: AppConfig.logo_text
  },
  sidebar: {
    opened: !!Storage.get(SIDEBAR_STATUS),
    theme: Storage.get(SIDEBAR_THEME) || 'light'
  },
  device: 'desktop'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    if (state.sidebar.opened) {
      Storage.set(SIDEBAR_STATUS, 1)
    } else {
      Storage.set(SIDEBAR_STATUS, 0)
    }
  },
  CLOSE_SIDEBAR: (state) => {
    Storage.set(SIDEBAR_STATUS, 0)
    state.sidebar.opened = false
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }) {
    commit('CLOSE_SIDEBAR')
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
