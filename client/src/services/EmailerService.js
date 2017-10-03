import Api from '@/services/Api'
const path = 'emailer'
export default {
  fetchProfiles () {
    return Api().get(path)
  },
  retrieveProfileById (profileid) {
    return Api().get(`emailer/${profileid}`)
  },
  new (orcmailer) {
    return Api().post(path, orcmailer)
  },
  update (orcmailer) {
    return Api().put(path, orcmailer)
  },
  remove (profileid) {
    return Api().delete(`emailer/${profileid}`)
  }
}
