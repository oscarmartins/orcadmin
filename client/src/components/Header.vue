<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4" >      
       <router-link  tag="span" style="cursor: pointer" to="/">          
           OrcAdmin        
       </router-link>
    </v-toolbar-title>    
    <v-spacer></v-spacer>
    <v-toolbar-items>     
      <v-btn 
        class="cyan" 
        flat 
        dark 
        v-if="!$store.state.isUserLoggedIn"
        to="login" >
        Sign In
      </v-btn>      
      <v-btn
        class="cyan" 
        flat 
        dark 
        v-if="!$store.state.isUserLoggedIn"
        to="register">
        Sign Up
      </v-btn>   
    </v-toolbar-items>
  </v-toolbar> 
</template>

<script>
export default {}
</script>

<style scoped>
</style>
