import axios from 'axios'
// import store from '@/store/store'
// import store from '@/store'
import vueAuthInstance from '@/services/auth.js'

const baseURL = 'http://localhost:8081'

export default () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${vueAuthInstance.getToken()}`
    }
  })
}
