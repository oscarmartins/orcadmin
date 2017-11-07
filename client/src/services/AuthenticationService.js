import Api from '@/services/Api'

export default {
  passwordRecovery (global, data) {
    global.$store.dispatch('PasswordRecovery', data).then((response) => {
      debugger
      /**
      global.showSnackbar({text: response.data.message, context: 'success'})
      setTimeout(function (ctx) { ctx.push({name: 'login'}) }, 3800, global.$router)
      **/
    })
    .catch((error) => {
      global.error = error.response.data.error
      global.showSnackbar({text: global.error, context: 'error'})
      console.log(error)
    })
  },
  register (global, data) {
    global.$store.dispatch('REGISTER', data).then((response) => {
      debugger
      global.showSnackbar({text: response.data.message, context: 'success'})
      setTimeout(function (ctx) { ctx.push({name: 'login'}) }, 3800, global.$router)
    })
    .catch((error) => {
      global.error = error.response.data.error
      global.showSnackbar({text: global.error, context: 'error'})
      console.log(error)
    })
    // return Api().post('register', credentials)
  },
  login (global, credentials) {
    if (!global) {
      return Api().post('login', credentials)
    } else {
      global.$store.dispatch('LOGIN', credentials).then(() => {
        global.$router.replace({ name: 'resume' })
      })
      .catch((error) => {
        debugger
        const responses = error.response
        const respStatus = responses.status
        switch (respStatus) {
          case 307:
            console.log(this)
            global.orcgoto(responses.data.redirect)
            break
          default:
            global.error = responses.data.error
            console.log(error)
            break
        }
      })
    }
  },
  logout (global) {
    debugger
    global.$store.dispatch('LOGOUT', global.auth.profile).then(() => {
      debugger
      global.$router.go({ name: 'start' })
    })
    .catch((error) => {
      global.error = error.response.data.error
      console.log(error)
    })
  }
}
