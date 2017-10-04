// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { sync } from 'vuex-router-sync'
import 'vuetify/dist/vuetify.min.css'
import store from '@/store/store'

// import VueYouTubeEmbed from 'vue-youtube-embed'

import Panel from '@/components/globals/Panel'
import Logout from '@/components/globals/Logout'
import MicroApp from '@/components/globals/MicroApp'

Vue.config.productionTip = false

Vue.use(Vuetify)

Vue.component('panel', Panel)
Vue.component('logout', Logout)
Vue.component('micro-app', MicroApp)

sync(store, router)

const mixin = {
  created () {
    this.orcgoto = function (route) {
      try {
        this.$router.push(route)
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
  components: { App }
})
