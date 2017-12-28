<template>
<div>
    <v-navigation-drawer 
    v-if="this.isAuthenticated" 
    v-model="primaryDrawer.model" 
    :permanent="primaryDrawer.type === 'permanent'" 
    :persistent="primaryDrawer.type === 'persistent'" 
    :temporary="primaryDrawer.type === 'temporary'" 
    :clipped="primaryDrawer.clipped" 
    :floating="primaryDrawer.floating"
    :mini-variant="primaryDrawer.mini" overflow enable-resize-watcher >    
    <v-list dense>
      <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="../../../static/doc-images/GuestUserIcon.png" v-if="this.isAuthenticated"/>
            <img src="../../../static/doc-images/GuestUserIcon.png" v-else/>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              <span v-if="this.profile" >{{this.profile.email}}</span>
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
</div>
</template>

<script>
import { mapState } from 'vuex'
import commonModule from '@/store/modules/auth'
const name = 'auth'
export default {
  data: () => ({
    dark: false,
    drawers: ['Permanent', 'Persistent', 'Temporary'],
    primaryDrawer: {
      model: false,
      type: 'permanent',
      clipped: true,
      floating: true,
      mini: false
    },
    footer: {
      fixed: true
    }
  }),
  computed: {
    ...mapState(name, {
      'isAuthenticated': 'isAuthenticated',
      'profile': 'profile'
    })
  },
  created () {
    console.log('Sidenav ')
    const store = this.$store
    // register a new module only if doesn't exist
    if (!(store && store.state && store.state[name])) {
      store.registerModule(name, commonModule)
    } else {
      // re-use the already existing module
      console.log(`reusing module: ${name}`)
    }
  }
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
