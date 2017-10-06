// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

import Panel from '@/components/globals/Panel'
import Logout from '@/components/globals/Logout'
import MicroApp from '@/components/globals/MicroApp'

Vue.config.productionTip = false

import router from './router/router'
import store from './store'

Vue.use(Vuetify)

Vue.component('panel', Panel)
Vue.component('logout', Logout)
Vue.component('micro-app', MicroApp)

const mixin = {
  created () {
    this.orcgoto = function (route, action) {
      try {
        let method = action || 'push'
        this.$router[method](route)
      } catch (error) {
        if (error) {
          console.log(error)
        }
      }
    }
  }
}

Vue.mixin(mixin)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  // components: { App }
  render: h => h(App)
})
