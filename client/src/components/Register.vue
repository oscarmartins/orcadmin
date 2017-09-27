<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3>
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
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        /** this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user) **/
        console.log(response.data.token, response.data.user, response.data.message)
        this.showSnackbar({text: response.data.message, context: 'success'})
        setTimeout(function (ctx) { ctx.push({name: 'login'}) }, 3800, this.$router)
      } catch (err) {
        debugger
        this.error = err.response.data.error
        this.showSnackbar({text: this.error, context: 'error'})
      }
    }
  }
}
</script>

<style scoped>
</style>
