import Api from '@/services/Api'
const path = 'emailer'
export default {
  fetchProfiles () {
    return Api().get(path)
  },
  new (orcmailer) {
    return Api().post(path, orcmailer)
  },
  update (orcmailer) {
    return Api().put(path, orcmailer)
  },
  remove (orcmailer) {
    return Api().delete(`emailer/${orcmailer.emailerid}`, orcmailer)
  }
}
