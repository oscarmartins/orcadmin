import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  login (global, credentials) {
    if (!global) {
      return Api().post('login', credentials)
    } else {
      global.$store.dispatch('LOGIN', credentials).then(() => {
        global.$router.replace({ name: 'resume' })
      })
      .catch((error) => {
        global.error = error.response.data.error
        console.log(error)
      })
    }
  },
  logout (global) {
    debugger
    Api().post('logout').then(function (result) {
      debugger
      global.$store.dispatch('LOGOUT', global.auth.profile).then(() => {
        debugger
        global.$router.go({ name: 'start' })
      })
      .catch((error) => {
        global.error = error.response.data.error
        console.log(error)
      })
    })
  }
}
