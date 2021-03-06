import Api from '@/services/Api'
const path = 'emailer'
export default {
  async fetchProfiles () {
    const result = await Api().get(path).then((result) => result)
    result.data.fetchProfiles[0].pass = ''
    return result
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
