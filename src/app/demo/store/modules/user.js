import createUser from '@/store/modules/user'

import { getToken, setToken, removeToken } from '@/utils/auth'
import { userLogin, userLogout, getUserInfo } from '@/api/user'

const {
  state,
  mutations,
  actions
} = createUser({ getToken, setToken, removeToken, userLogin, userLogout, getUserInfo })

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
