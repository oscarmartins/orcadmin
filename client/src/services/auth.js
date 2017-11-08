import Http from './Http'
import { VueAuthenticate } from 'vue-authenticate'
import authenticateConfig from '../utils/vueAuthenticateConfig'

const vueAuthInstance = new VueAuthenticate(Http.prototype.$http, authenticateConfig)

export default vueAuthInstance
