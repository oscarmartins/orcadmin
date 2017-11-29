import methods from './ApiRoles'
import utils from '../utils/utils'
export default {
  async checkAccountStatus (vueAuthInstance) {
    debugger
    const user = localStorage.getItem('userProfile')
    if (user) {
      const params = methods.checkAccountStatus(JSON.parse(user))
      const requestOptions = requestOptions || {}
      requestOptions.url = utils.joinUrl(vueAuthInstance.options.baseUrl, '/services')
      requestOptions[vueAuthInstance.options.requestDataKey] = params || requestOptions[vueAuthInstance.options.requestDataKey]
      requestOptions.method = 'POST'
      requestOptions.withCredentials = vueAuthInstance.options.withCredentials
      return await vueAuthInstance.$http(requestOptions).then(function (response) {
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
