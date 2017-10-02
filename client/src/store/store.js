import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null,
    isUserLoggedIn: false,
    toolbarAbs: false,
    cproxyData: null
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
      state.user = user
    },
    setToolbarAbs (state, toolbarAbs) {
      state.toolbarAbs = toolbarAbs
    },
    componentProxy (state, data) {
      state.cproxyData = data
    }
  },
  actions: {
    setToken ({commit}, token) {
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    },
    setToolbarAbs ({commit}, toolbarAbs) {
      commit('setToolbarAbs', toolbarAbs)
    },
    componentProxy ({commit}, data) {
      commit('componentProxy', data)
    }
  }
})
