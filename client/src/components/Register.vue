<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
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
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUSer', response.data.user)
        this.$router.push({
          name: 'songs'
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
