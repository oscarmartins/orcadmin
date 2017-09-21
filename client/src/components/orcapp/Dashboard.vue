<template>
  <!-- <div>
    <v-tabs dark fixed icons grow>
    <v-tabs-bar class="secondary" >
      <v-tabs-slider class="yellow"></v-tabs-slider>      
      <v-tabs-item href="#tab-1">
        <v-icon>data_usage</v-icon>
        Resumo
      </v-tabs-item>      
      <v-tabs-item href="#tab-2">
        <v-icon>account_circle</v-icon>
        Perfil
      </v-tabs-item>
      <v-tabs-item href="#tab-3">
        <v-icon>web</v-icon>
        Site Admin
      </v-tabs-item>
    </v-tabs-bar>
    <v-tabs-items>
      <v-tabs-content
        v-for="i in 3"
        :key="i"
        :id="'tab-' + i"
      >
        <resume v-if="i == 1"></resume>
        <profile v-if="i == 2"></profile>
        <siteadmin v-if="i == 3"></siteadmin>
      </v-tabs-content>
    </v-tabs-items>
   </v-tabs>
  </div>   -->
  <v-app id="sandbox" :dark="dark" :light="!dark" standalone toolbar footer>
    <v-navigation-drawer v-model="primaryDrawer.model" :permanent="primaryDrawer.type === 'permanent'" :persistent="primaryDrawer.type === 'persistent'" :temporary="primaryDrawer.type === 'temporary'" :clipped="primaryDrawer.clipped" :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini" overflow enable-resize-watcher>
    
    <v-list dense>
      <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg" v-if="isUserLoggedIn"/>
            <img src="http://www.ceskymac.cz/wp-content/uploads/2012/07/GuestUserIcon.png" v-else/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="this.user" >{{this.user.email}}</span>
              <span v-else>Guest</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="black" >
          <v-list-tile-content >
           <logout />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="goTo({name: 'login', params: {}})" >
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Home</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        
      </v-list>
    
    </v-navigation-drawer>
    <v-toolbar fixed dark flat>
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent'"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4">
        <router-link tag="span" style="cursor: pointer" :to="{name: this.isUserLoggedIn ? 'dashboard' : '/'}">
          ORC Admin
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn dark v-if="this.isUserLoggedIn" to="dashboard">
          Dashboard
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <logout />
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs10>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </main>
    <v-footer :absolute="footer.fixed" class="footer secondary" light dark>
      <span class="white--text ml-3">© {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import {mapState} from 'vuex'
import profile from './Profile'
import resume from './Resume'
import siteadmin from './Siteadmin'
export default {
  components: {
    profile,
    resume,
    siteadmin
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  methods: {
    goTo (_item) {
      const route = _item.name
      if (route) {
        this.$router.push(route)
      } else {
        debugger
        const method = _item.params.method
        if (method) {
          this[method.name].apply(null, method.args)
        }
      }
    },
    updateToolbarAbs (state) {
      this.$store.dispatch('setToolbarAbs', state)
    }
  },
  created () {
    this.updateToolbarAbs(true)
  },
  destroyed () {
    this.updateToolbarAbs(false)
  },
  data: () => ({
    dark: false,
    drawers: ['Permanent', 'Persistent', 'Temporary'],
    primaryDrawer: {
      model: false,
      type: 'persistent',
      clipped: true,
      floating: true,
      mini: false
    },
    footer: {
      fixed: true
    }
  })
}
</script>

<style>
#sandbox {
    border: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
  }
  #sandbox .container, #sandbox {
    min-height: 700px;
  }
</style>
