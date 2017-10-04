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
        global.$router.push({ name: 'resume' })
      })
      .catch((error) => {
        global.error = error.response.data.error
        console.log(error)
      })
    }
  }
}
