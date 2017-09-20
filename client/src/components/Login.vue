<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4 >
      <panel title="Sign In">
        <v-text-field
          label="Email"              
          v-model="email">
        </v-text-field>
        <br>   
        <v-text-field
          label="Password"              
          v-model="password"
          type="password">
        </v-text-field>        
        <br>
        <v-alert error value="true" v-if="this.error" >
          {{this.error}}
        </v-alert>  
        <br>
        <v-btn
          class="cyan" 
          dark
          @click="login">
          Login
        </v-btn>
      </panel>
    </v-flex>
  </v-layout>  
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data () {
    return {
      email: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        this.error = null
        console.log('init login')
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        console.log('RES', response)
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
