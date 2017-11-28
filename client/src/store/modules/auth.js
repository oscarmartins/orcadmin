import * as types from '../mutation-types'
import vueAuthInstance from '../../services/auth'
import apiRoles from '../../services/ApiRoles'
import utils from '../../utils/utils'
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
  [types.passwordRecovery] (context, payload) {
    let _payload = payload || {}
    if (_payload.hasOwnProperty('selectionMode')) {
      if (_payload.selectionMode === 'email') {
        _payload = apiRoles.passwordRecoveryEmail(_payload)
      }
      if (_payload.selectionMode === 'code') {
        _payload = apiRoles.passwordRecoveryCode(_payload)
      }
      if (_payload.selectionMode === 'reset') {
        _payload = apiRoles.passwordRecoveryReset(_payload)
      }
    } else {
      _payload = apiRoles.passwordRecoveryEmail(_payload)
    }
    const requestOptions = requestOptions || {}
    requestOptions.url = utils.joinUrl(vueAuthInstance.options.baseUrl, '/passwordRecovery')
    requestOptions[vueAuthInstance.options.requestDataKey] = _payload || requestOptions[vueAuthInstance.options.requestDataKey]
    requestOptions.method = 'POST'
    requestOptions.withCredentials = vueAuthInstance.options.withCredentials
    debugger
    return vueAuthInstance.$http(requestOptions).then(function (response) {
      debugger
      return response
    })
  },
  [types.REGISTER] (context, payload) {
    payload = payload || {}
    return vueAuthInstance.register(apiRoles.register(payload))
    .then((response) => { return response })
  },
  [types.LOGIN] (context, payload) {
    payload = payload || {}
    debugger
    return vueAuthInstance.login(apiRoles.login(payload))
      .then((response) => {
        context.commit(types.ISAUTHENTICATED, {isAuthenticated: vueAuthInstance.isAuthenticated()})
        if (vueAuthInstance.isAuthenticated()) { context.commit(types.SETPROFILE, response.data) }
      })
  },
  [types.LOGOUT] (context, payload) {
    payload = payload || {}
    debugger
    return vueAuthInstance.logout({data: apiRoles.logout(payload)})
      .then(() => {
        debugger
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
