<template>
  <v-layout row wrap align-center justify-center enable-resize-watcher>
    <v-flex xs12 sm8 md4 lg3 >
      <panel title="Sign In">
        <v-alert error value="true" v-if="this.error" >
          {{this.error}}
        </v-alert>  
        <v-text-field
          label="Email"  
          v-model="email"
          :disabled="this.onProcess">
        </v-text-field>
        <br>   
        <v-text-field
          label="Password"              
          v-model="password"
          type="password">
        </v-text-field>
        <v-btn
          class="red" 
          dark
          @click="orcgoto('PasswordRecovery')">
          Password Recovery
        </v-btn>        
        <v-btn
          class="green" 
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
      error: null,
      onProcess: false
    }
  },
  methods: {
    async login () {
      try {
        this.error = ''
        this.onProcess = true
        await AuthenticationService.login(this, {
          email: this.email,
          password: this.password
        })
        this.onProcess = false
      } catch (err) {
        this.error = err.response.data.error
        this.onProcess = false
      }
    }
  }
}
</script>

<style scoped>
</style>
