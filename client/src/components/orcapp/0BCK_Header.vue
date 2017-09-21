<template>
<div>
   <v-navigation-drawer
      temporary
      v-model="drawer"
      :mini-variant="mini"
      overflow
      absolute
      right
    >
      <v-list class="pa-1">
        <v-list-tile v-if="mini" @click.stop="mini = !mini">
          <v-list-tile-action>
            <v-icon>chevron_right</v-icon>
          </v-list-tile-action>
        </v-list-tile>
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
          <v-list-tile-action>
            <v-btn icon @click.stop="mini = !mini">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
      <v-list class="pt-0" dense>
        <v-divider light></v-divider>
        <v-list-tile v-for="item in items" :key="item.title" @click="goTo(item.route)">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title >{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="cyan2" dark>
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
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
</div>    

</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      drawer: null,
      items: [
        { title: 'Start', icon: 'dashboard', route: {name: 'orcapp', params: {}} },
        { title: 'About', icon: 'question_answer', route: {name: 'login', params: {}} }
      ],
      mini: true,
      right: true
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: '/root'
      })
    },
    goTo (route) {
      this.$router.push(route)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  }
}
</script>

<style scoped>
</style>
