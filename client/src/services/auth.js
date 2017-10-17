import Axios from 'axios'
import Vue from 'vue'
import VueAxios from 'vue-axios'
import { VueAuthenticate } from 'vue-authenticate'
import authenticateConfig from '../utils/vueAuthenticateConfig'

Axios.defaults.baseURL = 'http://localhost:8081'

Vue.use(VueAxios, Axios)

const vueAuthInstance = new VueAuthenticate(Vue.prototype.$http, authenticateConfig)

export default vueAuthInstance
