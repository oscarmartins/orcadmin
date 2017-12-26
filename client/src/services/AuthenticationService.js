import Api from '@/services/Api'

export default {
  passwordRecovery (global, data) {
    global.$store.dispatch('passwordRecovery', data).then((response) => {
      global.formState({state: response.data.ns})
      global.showSnackbar({text: response.data.message, context: 'success'})
    })
    .catch((error) => {
      if (!error.response) {
        error = {
          response: {
            data: {
              error: 'Servidor em manutenção. tente mais tarde. Obrigado.'
            }
          }
        }
      }
      global.error = error.response.data.error
      global.showSnackbar({text: global.error, context: 'error'})
      console.log(error)
    })
  },
  register (global, data) {
    global.$store.dispatch('REGISTER', data).then((response) => {
      global.showSnackbar({text: response.data.message, context: 'success'})
      setTimeout(function (ctx) { ctx.push({name: 'login'}) }, 3800, global.$router)
    })
    .catch((error) => {
      if (!error.response) {
        error = {
          response: {
            data: {
              error: 'Servidor em manutenção. tente mais tarde. Obrigado.'
            }
          }
        }
      }
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
      global.$store.dispatch('LOGIN', credentials).then((response) => {
        // global.$router.replace({ name: 'resume' })
        global.$router.push({ name: 'resume' })
      })
      .catch((error) => {
        if (!error.response) {
          error = {
            response: {
              data: {
                error: 'Servidor em manutenção. tente mais tarde. Obrigado.'
              }
            }
          }
        }
        const responses = error.response
        const respStatus = responses.status
        switch (respStatus) {
          case 400:
            console.log(this)
            // global.orcgoto({name: 'account-activation', params: responses.data})
            global.error = responses.data.error
            console.log(error)
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
    global.$store.dispatch('LOGOUT', global.auth.profile).then((res) => {
      debugger
      if (res && res.response.data) {
        if (res.response.data.error) {
          global.$store.dispatch('LOCAL_LOGOUT', {}).then((res) => {
            global.$router.go({ name: 'start' })
            return true
          }).catch((error) => {
            if (error) {
              global.error = '[00001] Servidor em manutenção. tente mais tarde. Obrigado.'
            }
            return false
          })
        } else {
          global.$router.go({ name: 'start' })
        }
      }
    })
    .catch((error) => {
      debugger
      if (!error.response) {
        error = {
          response: {
            data: {
              error: 'Servidor em manutenção. tente mais tarde. Obrigado.'
            }
          }
        }
      }
      global.error = error.response.data.error
      console.log(error)
    })
  }
}
