import Api from '@/services/Api'
const path = 'emailer'
export default {
  fetchProfiles () {
    return Api().get(path)
  },
  new (orcmailer) {
    return Api().post(path, orcmailer)
  }
}
