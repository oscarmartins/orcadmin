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
              v-model="email" 
              v-if="checkVisibility('email')"
              :disabled="this.emailDisabled"
              :class="checkClass('email')">
            </v-text-field>
            <v-text-field
              label="Code Confirmation"              
              v-model="code"
              v-if="checkVisibility('code')"
              :disabled="this.codeDisabled"
              :class="checkClass('code')">
            </v-text-field>
            <v-text-field
              label="Password"              
              v-model="password"
              v-if="checkVisibility('passwords')"
              :disabled="this.passwordsDisabled"
              :class="checkClass('passwords')">
            </v-text-field>
            <v-text-field
              label="Password Confirmation"              
              v-model="confirmPassword"
              v-if="checkVisibility('passwords')"
              :disabled="this.passwordsDisabled"
              :class="checkClass('passwords')">
            </v-text-field>
          </form>            
          <v-btn
            class="cyan" 
            dark
            @click="PasswordRecovery"
            :disabled="this.selectionMode === 'success'" >
            {{this.btnLabel}}
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
const ACCOUNT_RECOVERY_EMAIL = 20000
const ACCOUNT_RECOVERY_CODE = 21000
const ACCOUNT_RECOVERY_RESET = 22000
const ACCOUNT_RECOVERY_RESUME = 40102030
export default {
  data () {
    return {
      selectionMode: 'email',
      panelTitle: 'Password Recovery - Email verification',
      email: '',
      code: '',
      password: '',
      confirmPassword: '',
      error: null,
      snackbar: false,
      mode: '',
      context: '',
      timeout: 0,
      text: '',
      btnLabel: 'check email',
      displayInputs: ['email'],
      emailDisabled: false,
      codeDisabled: false,
      passwordsDisabled: false,
      confirmPasswordDisabled: false
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
    checkVisibility (who) {
      return (this.displayInputs.indexOf(who) > -1)
    },
    checkClass (who) {
      let factor = false
      if (who === 'email') { factor = this.emailDisabled }
      if (who === 'code') { factor = this.codeDisabled }
      if (who === 'passwords') { factor = this.passwordsDisabled }
      return factor ? 'light-green accent-1' : ''
    },
    formState (opts) {
      opts = opts || {state: ACCOUNT_RECOVERY_EMAIL}
      if (opts.state === ACCOUNT_RECOVERY_EMAIL) {
        this.displayInputs = ['email']
        this.panelTitle = 'Password Recovery - Email verification'
        this.btnLabel = 'check email'
        this.selectionMode = 'email'
      }
      if (opts.state === ACCOUNT_RECOVERY_CODE) {
        this.displayInputs = ['email', 'code']
        this.emailDisabled = true
        this.panelTitle = 'Password Recovery - Code Security verification'
        this.btnLabel = 'check code security'
        this.selectionMode = 'code'
      }
      if (opts.state === ACCOUNT_RECOVERY_RESET) {
        this.displayInputs = ['email', 'code', 'passwords']
        this.emailDisabled = true
        this.codeDisabled = true
        this.panelTitle = 'Password Recovery - Reset Password'
        this.btnLabel = 'reset password'
        this.selectionMode = 'reset'
      } if (opts.state === ACCOUNT_RECOVERY_RESUME) {
        this.displayInputs = ['email', 'code', 'password']
        this.emailDisabled = true
        this.codeDisabled = true
        this.passwordsDisabled = true
        this.panelTitle = 'Password Recovery - Success '
        this.btnLabel = ''
        this.selectionMode = 'success'
      }
    },
    async PasswordRecovery () {
      try {
        this.error = ''
        await AuthenticationService.passwordRecovery(this, {
          email: this.email || null,
          code: this.code || null,
          password: this.password || null,
          confirmPassword: this.confirmPassword || null,
          selectionMode: this.selectionMode || null
        })
      } catch (err) {
        debugger
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      debugger
      this.formState({})
      /**
      const params = this.$route.params
      if (params) {
        if (params.selectionMode === 'email') {
          this.email = params.email
        } else if (params.selectionMode === 'code') {
          this.selectionMode = params.selectionMode
          this.panelTitle = 'Password Recovery - Code Confirmation'
        }
      }
      // this.email = this.$route.params.email
       */
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style scoped>
</style>
