import Vue from 'vue'

const state = Vue.observable({
  sidebarCollapsed: false
})

const mutations = {
  toggleSideBar(value) {
    const val = typeof value === 'boolean' ? value : !state.sidebarCollapsed
    state.sidebarCollapsed = val
  }
}

export {
  state,
  mutations
}
