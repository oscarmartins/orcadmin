<template>
  <v-layout row wrap align-center justify-center enable-resize-watcher>
    <v-flex xs12 sm8 md4 lg3 >
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
             <v-alert success value="true" v-if="this.emailSuccess" >
              {{this.emailSuccess}}
            </v-alert>  
            <v-text-field
              label="Code Confirmation"              
              v-model="code"
              v-if="checkVisibility('code')"
              :disabled="this.codeDisabled"
              :class="checkClass('code')">
            </v-text-field>
             <v-alert success value="true" v-if="this.codeSuccess" >
              {{this.codeSuccess}}
            </v-alert>  
            <v-text-field
              type="password"
              label="Password"              
              v-model="password"
              v-if="checkVisibility('passwords')"
              :disabled="this.passwordsDisabled"
              :class="checkClass('passwords')">
            </v-text-field>
            <v-text-field
              type="password"
              label="Password Confirmation"              
              v-model="confirmPassword"
              v-if="checkVisibility('passwords')"
              :disabled="this.passwordsDisabled"
              :class="checkClass('passwords')">
            </v-text-field>
             <v-alert success value="true" v-if="this.passwordSuccess" >
              {{this.passwordSuccess}}
            </v-alert>  
          </form>            
          <v-btn
            class="cyan" 
            dark
            @click="PasswordRecovery"
            v-if="this.selectionMode !== 'success'" >
            {{this.btnLabel}}
          </v-btn>
           <v-btn
            class="cyan" 
            dark
            @click="orcgoto({name: 'login'})"
            v-if="this.selectionMode === 'success'" >
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
const ACCOUNT_RECOVERY_RESUME = 101010
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
      confirmPasswordDisabled: false,
      btnsignin: false,
      emailSuccess: '',
      codeSuccess: '',
      passwordSuccess: ''
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
        this.emailSuccess = 'email válido'
      }
      if (opts.state === ACCOUNT_RECOVERY_RESET) {
        this.displayInputs = ['email', 'code', 'passwords']
        this.emailDisabled = true
        this.codeDisabled = true
        this.panelTitle = 'Password Recovery - Reset Password'
        this.btnLabel = 'reset password'
        this.selectionMode = 'reset'
        this.codeSuccess = 'código de segurança válido'
      } if (opts.state === ACCOUNT_RECOVERY_RESUME) {
        this.displayInputs = ['email', 'code', 'password']
        this.emailDisabled = true
        this.codeDisabled = true
        this.passwordsDisabled = true
        this.panelTitle = 'Password Recovery - Success '
        this.btnLabel = 'Fazer Login'
        this.selectionMode = 'success'
        this.passwordSuccess = 'nova password válida'
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
        console.log(err)
      }
    }
  },
  async mounted () {
    try {
      const params = this.$route.params || {}
      if (params && params.email) {
        this.email = params.email
      }
      this.formState(params)
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style scoped>
</style>
