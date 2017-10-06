import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong/Index'
import EditSong from '@/components/EditSong'

import Logout from '@/components/globals/Logout'

import Start from '@/components/orcapp/Start'
import Resume from '@/components/orcapp/Resume'

import Emailer from '@/components/MailerManager/Emailer'
import EmailerCreate from '@/components/MailerManager/EmailerCreate'
import EmailerEdit from '@/components/MailerManager/EmailerEdit'
import EmailerRemove from '@/components/MailerManager/EmailerRemove'

import vueAuthInstance from '../services/auth.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/start',
    name: 'start',
    component: Start,
    meta: { auth: false, title: 'Login to existing account' }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: { auth: false, title: 'Login to existing account' }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: false, title: 'Login to existing account' }
  },
  {
    path: '/songs',
    name: 'songs',
    component: Songs
  },
  {
    path: '/songs/create',
    name: 'songs-create',
    component: CreateSong
  },
  {
    path: '/songs/:songId',
    name: 'song',
    component: ViewSong
  },
  {
    path: '/songs/:songId/edit',
    name: 'song-edit',
    component: EditSong
  },
  {
    path: '/resume',
    name: 'resume',
    component: Resume,
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/emailer/profiles',
    name: 'emailer-profiles',
    component: Emailer,
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/emailer/create',
    name: 'emailer-create',
    component: EmailerCreate,
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/emailer/edit',
    name: 'emailer-edit',
    component: EmailerEdit,
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/emailer/:profileid/remove',
    name: 'emailer-remove',
    component: EmailerRemove,
    meta: { auth: true, title: 'Login to existing account' }

  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout,
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '/emailer',
    name: 'emailer',
    redirect: '/emailer/profiles',
    meta: { auth: true, title: 'Login to existing account' }
  },
  {
    path: '*',
    redirect: vueAuthInstance.isAuthenticated() ? '/resume' : '/start',
    meta: { auth: false, title: 'Login to existing account' }
  }
]

const vueRouterInstance = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

vueRouterInstance.beforeEach(function (to, from, next) {
  debugger
  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (vueAuthInstance.isAuthenticated()) {
        return next()
      } else {
        // vueRouterInstance.push({ name: 'login' })
        // return next('/login')
        location.href = '/login'
      }
    } else {
      return next()
    }
  } else {
    return next()
  }
})

export default vueRouterInstance
