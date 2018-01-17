<template>
  <v-app id="sandbox" :dark="dark" :light="!dark" >  
    <v-navigation-drawer 
    v-if="this.isAuthenticated" 
    v-model="primaryDrawer.model" 
    :permanent="primaryDrawer.type === 'permanent'" 
    :persistent="primaryDrawer.type === 'persistent'" 
    :temporary="primaryDrawer.type === 'temporary'" 
    :clipped="primaryDrawer.clipped" 
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini" overflow enable-resize-watcher absolute app>    
    <v-list dense>
      <v-list-tile avatar tag="div" @click="orcgoto({name: 'CustomerProfile'})">
          <v-list-tile-avatar>
            <img src="../static/doc-images/GuestUserIcon.png" v-if="this.isAuthenticated"/>
            <img src="../static/doc-images/GuestUserIcon.png" v-else/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="this.profile" >
                A minha conta [{{this.profile.email}}]
              </span>
              <span v-else>Guest</span>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile class="black" >
          <v-list-tile-content >
           <logout />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="orcgoto({name: 'emailer-profiles'})" >
          <v-list-tile-action>
            <v-icon>mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Emailer</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>        
      </v-list>    
    </v-navigation-drawer>

    <v-toolbar app absolute :clipped-left="primaryDrawer.clipped">
      <v-toolbar-side-icon @click.stop="primaryDrawer.model = !primaryDrawer.model" v-if="primaryDrawer.type !== 'permanent' && this.isAuthenticated"></v-toolbar-side-icon>
      <v-toolbar-title class="mr-4">
        <router-link tag="span" style="cursor: pointer" :to="{name: this.isAuthenticated ? 'resume' : 'start'}">
          ORC Admin
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn :to="{name: this.isAuthenticated ? 'resume' : 'start'}">
          <span v-if="this.isAuthenticated">dashboard</span>
          <span v-else>start</span>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>  
      <v-toolbar-items>
        <v-btn flat v-if="!this.isAuthenticated" to="/login">
          Sign In
        </v-btn>
        <v-btn flat v-if="!this.isAuthenticated" to="/register">
          Sign Up
        </v-btn>
        <logout v-if="this.isAuthenticated" />
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
       <v-container fluid>
        <v-layout align-center justify-center enable-resize-watcher>
          <v-flex xs12>
            <router-view></router-view>
          </v-flex>
        </v-layout>
       </v-container>
    </v-content>

    <v-footer :fixed="footer.fixed" class="footer secondary" light dark>
      <span class="white--text ml-3">© {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
const name = 'auth'

export default {
  name: 'app',
  computed: {
    ...mapState(name, {
      'isAuthenticated': 'isAuthenticated',
      'profile': 'profile'
    })
  },
  created () {
  },
  mounted: function () {
    console.log('monted: App')
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

<style scoped>
#sandbox {
    border: 1px solid rgba(0, 0, 0, .1);
    overflow: hidden;
}
/** #sandbox .container, #sandbox {
    min-height: 700px;
} **/
</style>
