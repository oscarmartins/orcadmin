export default {
  baseUrl: 'http://localhost:8081',
  tokenName: 'access_token',
  userProfile: 'userProfile',
  requestDataKey: 'data',
  responseDataKey: 'data',
  loginUrl: '/login',
  registerUrl: '/register',
  logoutUrl: '/logout',
  bindRequestInterceptor: function () {
    debugger
    this.$http.interceptors.request.use((config) => {
      if (this.isAuthenticated()) {
        config.headers['Authorization'] = [
          this.options.tokenType, this.getToken()
        ].join(' ')
      } else {
        delete config.headers['Authorization']
      }
      return config
    })
  },
  bindResponseInterceptor: function () {
    debugger
    this.$http.interceptors.response.use((response) => {
      this.setToken(response)
      return response
    })
  }
}
