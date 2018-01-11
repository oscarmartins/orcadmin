import methods from './ApiRoles'
import utils from '../utils/utils'
import _vueAuthInstance from '../services/auth.js'
const SERVICE_PATH = '/services'
const INSTANCE = {
  post (url, params) {
    return _vueAuthInstance.$http({url: utils.joinUrl(_vueAuthInstance.options.baseUrl, url), method: 'POST', data: params})
  },
  get (url, params) {
    return _vueAuthInstance.$http({url: utils.joinUrl(_vueAuthInstance.options.baseUrl, url), method: 'GET', data: params})
  },
  getUserProfile () {
    const _d = localStorage.getItem('userProfile')
    return _d
  },
  async fetchCustomerProfile () {
    const user = INSTANCE.getUserProfile()
    if (user) {
      const params = methods.fetchCustomerProfile(JSON.parse(user))
      return await INSTANCE.post(SERVICE_PATH, params)
    }
  },
  async updateCustomerProfile (fields) {
    const user = INSTANCE.getUserProfile()
    if (user) {
      const params = methods.updateCustomerProfile(JSON.parse(user), fields)
      return await INSTANCE.post(SERVICE_PATH, params)
    }
  }
}

export default INSTANCE
