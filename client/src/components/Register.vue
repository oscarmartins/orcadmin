<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
      <panel title="Sign Up">
          <form 
            name="tab-orcadmin-form"
            autocomplete="off">
            <v-text-field
              label="Email"              
              v-model="email">
            </v-text-field>
          </form>
          <br>   
          <v-text-field
              label="Password"              
              v-model="password"
              type="password"
              autocomplete="new-password">
          </v-text-field>        
          <br>
          <v-alert error value="true" v-if="this.error" >
            {{this.error}}
          </v-alert>  
          <br>
          <v-btn
            class="cyan" 
            dark
            @click="register">
            Register
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
    async register () {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        debugger
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'start'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
