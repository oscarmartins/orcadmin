import * as types from '../mutation-types'
import vueAuthInstance from '../../services/auth.js'

const state = {
  isAuthenticated: vueAuthInstance.isAuthenticated(),
  isLoggedIn: !!localStorage.getItem('token'),
  profile: JSON.parse(localStorage.getItem('userProfile')) || {}
}

const getters = {
  isLoggedIn: context => context.isLoggedIn,
  isAuthenticated: context => context.isAuthenticated,
  profile: context => context.profile
}

const mutations = {
  [types.ISAUTHENTICATED] (state, payload) {
    debugger
    state.isAuthenticated = payload.isAuthenticated
  },
  [types.SETPROFILE] (state, payload) {
    if (payload) {
      localStorage.setItem('userProfile', JSON.stringify(payload.profile))
      state.profile = JSON.parse(localStorage.getItem('userProfile'))
    } else {
      localStorage.removeItem('userProfile')
    }
  },
  [types.LOGIN] (state) {
    state.pending = true
  },
  [types.LOGIN_SUCCESS] (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  [types.LOGOUT] (state) {
    state.isLoggedIn = false
  }
}

const actions = {
  [types.LOGIN] (context, payload) {
    payload = payload || {}
    debugger
    return vueAuthInstance.login(payload)
      .then((response) => {
        context.commit(types.ISAUTHENTICATED, {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
        debugger
        if (vueAuthInstance.isAuthenticated()) {
          context.commit(types.SETPROFILE, response.data)
        }
      })
  },
  [types.LOGOUT] (context, payload) {
    payload = payload || {}
    debugger
    return vueAuthInstance.logout(payload.requestOptions)
      .then(() => {
        context.commit(types.ISAUTHENTICATED, {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
        context.commit(types.SETPROFILE, null)
      })
  },
  [types.AUTHENTICATE] (context, payload) {
    payload = payload || {}
    return vueAuthInstance.authenticate(payload.provider, payload.userData, payload.requestOptions)
      .then(function () {
        context.commit(types.ISAUTHENTICATED, {
          isAuthenticated: vueAuthInstance.isAuthenticated()
        })
      })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
