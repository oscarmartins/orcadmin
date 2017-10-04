import axios from 'axios'
// import store from '@/store/store'
import store from '@/store'

const baseURL = 'http://localhost:8081'

export default () => {
  return axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
