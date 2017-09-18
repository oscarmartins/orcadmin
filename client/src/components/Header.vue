<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4" >      
       <router-link  tag="span" style="cursor: pointer" :to="{name: 'songs'}">          
           OrcAdmin        
       </router-link>
    </v-toolbar-title>
    <v-toolbar-items>     
      <v-btn 
        class="cyan" 
        flat 
        dark
        to="/songs" >
        Browse
      </v-btn>
    </v-toolbar-items>
    <v-spacer></v-spacer>
    <v-toolbar-items>     
      <v-btn 
        class="cyan" 
        flat 
        dark 
        v-if="!$store.state.isUserLoggedIn"
        to="/login" >
        Sign In
      </v-btn>      
      <v-btn
        class="cyan" 
        flat 
        dark 
        v-if="!$store.state.isUserLoggedIn"
        to="/register">
        Sign Up
      </v-btn>
      <v-btn
        class="cyan" 
        flat 
        dark 
        v-if="$store.state.isUserLoggedIn"
        @click="logout">
        Logout
      </v-btn>      
    </v-toolbar-items>
  </v-toolbar> 
</template>

<script>
export default {
  methods: {
    logout () {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: '/root'
      })
    }
  }
}
</script>

<style scoped>
</style>
