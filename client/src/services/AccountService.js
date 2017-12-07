import methods from './ApiRoles'
import utils from '../utils/utils'
export default {
  async post (vueAuthInstance, url, params) {
    return await vueAuthInstance.$http({url: utils.joinUrl(vueAuthInstance.options.baseUrl, url), method: 'POST', withCredentials: {}, data: params})
  },
  async get (vueAuthInstance, url, params) {
    return await vueAuthInstance.$http({url: utils.joinUrl(vueAuthInstance.options.baseUrl, url), method: 'GET', withCredentials: {}, data: params})
  },
  async checkAccountStatus (vueAuthInstance) {
    debugger
    const user = localStorage.getItem('userProfile')
    if (user) {
      const params = methods.checkAccountStatus(JSON.parse(user))
      await this.post(vueAuthInstance, '/services', params).then(function (response) {
        debugger
        return response
      }).catch((error) => {
        debugger
        console.log(error)
        return null
      })
    }
  },
  async generateAccountCodeVerification (vueAuthInstance) {
    const user = localStorage.getItem('userProfile')
    if (user) {
      const params = methods.generateAccountCodeVerification(JSON.parse(user))
      await this.post(vueAuthInstance, '/services', params).then(function (response) {
        debugger
        return response
      }).catch((error) => {
        debugger
        console.log(error)
        return null
      })
    }
  }
}
