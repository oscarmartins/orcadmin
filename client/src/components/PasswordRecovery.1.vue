<template>
  <v-layout row wrap>
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg6 offset-lg3>
      <panel :title="this.panelTitle">
          <v-alert error value="true" v-if="this.error" >
            {{this.error}}
          </v-alert>  
          <form 
            name="tab-orcadmin-form"
            autocomplete="off">
            <v-text-field
              label="Email"              
              v-model="email" v-if="selectionMode == 'email'">
            </v-text-field>
            <v-text-field
              label="Code Confirmation"              
              v-model="code" v-if="selectionMode == 'code'">
            </v-text-field>
          </form>            
          <v-btn
            class="cyan" 
            dark
            @click="PasswordRecovery">
            Password Recovery
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
      selectionMode: 'email',
      panelTitle: 'Password Recovery - Email verification',
      email: '',
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
    async PasswordRecovery () {
      try {
        this.error = ''
        await AuthenticationService.passwordRecovery(this, {
          email: this.email,
          password: this.password,
          selectionMode: this.selectionMode
        })
      } catch (err) {
        
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      
      const params = this.$route.params
      if (params) {
        if (params.selectionMode === 'email') {
          // service caller
          this.email = params.email
        } else if (params.selectionMode === 'code') {
          this.selectionMode = params.selectionMode
          this.panelTitle = 'Password Recovery - Code Confirmation'
        }
      }
      // this.email = this.$route.params.email
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style scoped>
</style>
