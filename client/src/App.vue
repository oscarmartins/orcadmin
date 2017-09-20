<template>
  <v-app toolbar footer >        
    <v-toolbar class="indigo" dark fixed>
    <v-toolbar-title class="mr-4" >      
       <router-link  tag="span" style="cursor: pointer" :to="{name: 'orcapp'}">          
           ORC Admin        
       </router-link>
    </v-toolbar-title>
    <v-toolbar-items>     
      <v-btn 
        class="cyan" 
        flat 
        dark
        to="/" >
        Start
      </v-btn>
      <v-btn
        success                
        v-if="this.isUserLoggedIn"
        to="songs">
        Dashboard
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>     
      <v-btn 
        class="cyan" 
        flat 
        dark 
        v-if="!this.isUserLoggedIn"
        to="/login" >
        Sign In
      </v-btn>      
      <v-btn
        class="cyan" 
        flat 
        dark 
        v-if="!this.isUserLoggedIn"
        to="/register">
        Sign Up
      </v-btn>
      <v-btn
        class="cyan" 
        flat 
        dark 
        v-if="this.isUserLoggedIn"
        @click="logout">
        Logout
      </v-btn>    
    </v-toolbar-items>
  </v-toolbar>      
      <main>
        <v-container fluid v-bind:class="[this.toolbarAbs ? 'pt-0 pl-0 pr-0' : 'olas']">
            <router-view></router-view>
          </v-container>
      </main>
      <v-footer class="indigo">
        <span class="white--text ">© 2017</span>
      </v-footer>      
    </v-app>  
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: 'app',
  methods: {
    logout () {
      debugger
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: '/root'
      })
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'toolbarAbs'
    ])
  }
}
</script>

<style>

</style>
