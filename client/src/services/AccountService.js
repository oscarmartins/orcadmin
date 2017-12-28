import methods from './ApiRoles'
import utils from '../utils/utils'
import _vueAuthInstance from '../services/auth.js'

const INSTANCE = {
  post (vueAuthInstance, url, params) {
    return vueAuthInstance.$http({url: utils.joinUrl(vueAuthInstance.options.baseUrl, url), method: 'POST', data: params})
  },
  get (vueAuthInstance, url, params) {
    return vueAuthInstance.$http({url: utils.joinUrl(vueAuthInstance.options.baseUrl, url), method: 'GET', data: params})
  },
  getUserProfile () {
    const _d = localStorage.getItem('userProfile')
    return _d
  },
  async checkAccountStatus (vueAuthInstance) {
    const user = INSTANCE.getUserProfile()
    if (user) {
      const params = methods.checkAccountStatus(JSON.parse(user))
      const _resp = await INSTANCE.post(vueAuthInstance, '/services', params).then(function (response) {
        return response
      }).catch((error) => {
        console.log(error)
        return null
      })
      return _resp
    }
  },
  async generateAccountCodeVerification (vueAuthInstance) {
    const user = INSTANCE.getUserProfile()
    if (user) {
      const params = methods.generateAccountCodeVerification(JSON.parse(user))
      return await INSTANCE.post(vueAuthInstance, '/services', params).then(function (response) {
        return response
      }).catch((error) => {
        console.log(error)
        return error
      })
    }
  },
  async validateAccountCode (code) {
    const user = INSTANCE.getUserProfile()
    if (user) {
      const params = methods.validateAccountCode(JSON.parse(user), code)
      return await INSTANCE.post(_vueAuthInstance, '/services', params).then(function (response) {
        return response
      }).catch((error) => {
        console.log(error)
        return error
      })
    }
  }
}

export default INSTANCE
