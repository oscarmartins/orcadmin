import Api from '@/services/Api'
const path = 'emailer'
export default {
  fetchProfiles (credentials) {
    return Api().get(path, credentials)
  },
  new () {
    return Api().post(path)
  }
}
