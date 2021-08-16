import { userLogin, userLogout, getUserInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@demo/router'

const state = {
  token: getToken(),
  role: '',
  profile: {}
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_PROFILE: (state, user) => {
    state.profile = user
  }
}

const actions = {
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await userLogin({ username: username.trim(), password: password })
    const { data } = result
    commit('SET_TOKEN', data.token)
    setToken(data.token)
    return data
  },
  async getInfo({ commit, state }) {
    const result = await getUserInfo(state.token)
    const { data } = result
    if (!data) {
      return Promise.reject(new Error('Verification failed, please Login again.'))
    }
    commit('SET_ROLE', data.role_code)
    commit('SET_PROFILE', data)
    return data
  },
  async logout({ commit, state }) {
    const result = await userLogout(state.role)
    commit('SET_TOKEN', '')
    commit('SET_ROLE', '')
    removeToken()
    resetRouter()
    return result
  },
  removeToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLE', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
