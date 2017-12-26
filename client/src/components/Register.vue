<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3>
      <panel title="Sign Up">
          <v-alert error value="true" v-if="this.error" >
            {{this.error}}
          </v-alert>  
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
          <v-btn
            class="cyan" 
            dark
            @click="register">
            Register
          </v-btn>
          <v-snackbar
          top
          :timeout="timeout"
          :success="context === 'success'"
          :info="context === 'info'"
          :warning="context === 'warning'"
          :error="context === 'error'"
          :primary="context === 'primary'"
          :secondary="context === 'secondary'"
          :multi-line="mode === 'multi-line'"
          :vertical="mode === 'vertical'"
          v-model="snackbar"
          >
          {{text}}      
          </v-snackbar>
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
      snackbar: false,
      mode: '',
      context: '',
      timeout: 0,
      text: ''
    }
  },
  methods: {
    showSnackbar (opt) {
      this.mode = opt.mode || ''
      this.context = opt.context || 'info'
      this.timeout = opt.timeout || 3600
      this.text = opt.text || ''
      this.snackbar = true
    },
    async register () {
      try {
        this.error = ''
        await AuthenticationService.register(this, {
          email: this.email,
          password: this.password
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped>
</style>
