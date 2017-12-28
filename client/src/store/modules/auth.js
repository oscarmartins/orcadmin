import * as types from '../mutation-types'
import vueAuthInstance from '../../services/auth'
import apiRoles from '../../services/ApiRoles'
import utils from '../../utils/utils'

const state = {
  isAuthenticated: vueAuthInstance.isAuthenticated(),
  isLoggedIn: !!vueAuthInstance.getToken(),
  profile: JSON.parse(localStorage.getItem('userProfile')) || {}
}

const getters = {
  isLoggedIn: function () {
    const thetoken = vueAuthInstance.getToken()
    return !!thetoken
  },
  isAuthenticated: function () {
    const auth = vueAuthInstance.isAuthenticated()
    return auth
  },
  profile: function () { return JSON.parse(localStorage.getItem('userProfile')) || {} }
}

const mutations = {
  [types.ISAUTHENTICATED] (state, payload) {
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
    return vueAuthInstance.$http(requestOptions).then(function (response) {
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
    context.commit(types.LOGIN)
    const loginResult = vueAuthInstance.login(apiRoles.login(payload))
    .then((response) => {
      const _isAuthenticated = vueAuthInstance.isAuthenticated()
      if (_isAuthenticated) {
        context.commit(types.ISAUTHENTICATED, {
          isAuthenticated: _isAuthenticated
        })
        context.commit(types.LOGIN_SUCCESS)
        context.commit(types.SETPROFILE, response.data)
      }
      return response
    })
    return loginResult
  },
  [types.LOGOUT] (context, payload) {
    payload = payload || {}
    context.commit(types.LOGOUT)
    const res = vueAuthInstance.logout({data: apiRoles.logout(payload)})
    .then((r) => {
      context.commit(types.ISAUTHENTICATED, {
        isAuthenticated: vueAuthInstance.isAuthenticated()
      })
      context.commit(types.SETPROFILE, null)
      return 'success'
    }).catch((error) => {
      if (error) {
      }
      return 'error'
    })
    const result = {
      response: {
        data: {
        }
      }
    }
    result.response.data[res] = (res === 'success' ? 'Logout success!!' : 'Logout error!!')
    return result
  },
  [types.LOCAL_LOGOUT] (context, payload) {
    context.commit(types.ISAUTHENTICATED, {
      isAuthenticated: false
    })
    context.commit(types.SETPROFILE, null)
    context.commit(types.LOGOUT, false)
    vueAuthInstance.storage.removeItem(vueAuthInstance.tokenName)
    return true
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
const namespaced = true
export default {
  namespaced,
  state,
  getters,
  mutations,
  actions
}
