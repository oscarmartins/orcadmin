import Vue from 'vue'
import Axios from 'axios'
import VueAxios from 'vue-axios'

Axios.defaults.baseURL = 'http://localhost:8081'

Vue.use(VueAxios, Axios)

export default Vue
