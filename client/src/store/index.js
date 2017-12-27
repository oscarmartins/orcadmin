import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'

/* Modules */
import auth from './modules/auth'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const state = {
  authView: 'login',
  notifications: [],
  isLoading: false,
  isFetchingMore: false,
  isAuthWidgetOpen: false,
  isNotificationPanelOpen: false,
  appAlerts: []
}

const store = new Vuex.Store({
  getters,
  state,
  actions,
  mutations,
  modules: {
    auth: auth
  },
  strict: debug
})

export default store
