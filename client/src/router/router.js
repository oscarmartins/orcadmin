import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs/Index'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong/Index'
import EditSong from '@/components/EditSong'

import ForceLogout from '@/components/globals/ForceLogout'

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
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: { auth: true, title: 'Login to existing account' }
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
    path: '/start',
    name: 'start',
    component: Start
  },
  {
    path: '/resume',
    name: 'resume',
    component: Resume
  },
  {
    path: '/emailer/profiles',
    name: 'emailer-profiles',
    component: Emailer
  },
  {
    path: '/emailer/create',
    name: 'emailer-create',
    component: EmailerCreate
  },
  {
    path: '/emailer/edit',
    name: 'emailer-edit',
    component: EmailerEdit
  },
  {
    path: '/emailer/:profileid/remove',
    name: 'emailer-remove',
    component: EmailerRemove
  },
  {
    path: '/logout',
    name: 'force-logout',
    component: ForceLogout
  },
  {
    path: '/emailer',
    name: 'emailer',
    redirect: '/emailer/profiles'
  },
  {
    path: '*',
    name: 'start',
    component: Start
  }
]

const vueRouterInstance = new VueRouter({
  mode: 'history',
  routes, // short for routes: routes
  linkActiveClass: 'active'
})

vueRouterInstance.beforeEach(function (to, from, next) {
  debugger
  console.log(vueAuthInstance.isAuthenticated)
  if (to.meta && to.meta.auth !== undefined) {
    if (to.meta.auth) {
      if (vueAuthInstance.isAuthenticated()) {
        next()
      } else {
        vueRouterInstance.push({ name: 'login' })
      }
    } else {
      if (vueAuthInstance.isAuthenticated()) {
        vueRouterInstance.push({ name: 'overview' })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default vueRouterInstance
