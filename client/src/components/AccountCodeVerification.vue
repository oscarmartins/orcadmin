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
              label="Code Confirmation"              
              v-model="code"
              v-if="checkVisibility('code')"
              :disabled="this.codeDisabled"
              :class="checkClass('code')">
            </v-text-field>
             <v-alert success value="true" v-if="this.codeSuccess" >
              {{this.codeSuccess}}
            </v-alert>  
 
          </form>            
          <v-btn
            class="cyan" 
            dark
            @click="AccountVerify"
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
import AccountService from '@/services/AccountService'
const ACCOUNT_RECOVERY_CODE = 21000
export default {
  data () {
    return {
      selectionMode: 'code',
      panelTitle: 'Account verification',
      code: '',
      password: '',
      confirmPassword: '',
      error: null,
      snackbar: false,
      mode: '',
      context: '',
      timeout: 0,
      text: '',
      btnLabel: 'send code',
      displayInputs: ['code'],
      codeDisabled: false,
      codeSuccess: ''
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
      if (who === 'code') { factor = this.codeDisabled }
      return factor ? 'light-green accent-1' : ''
    },
    formState (opts) {
      opts = opts || {state: ACCOUNT_RECOVERY_CODE}
      if (opts.state === ACCOUNT_RECOVERY_CODE) {
        this.displayInputs = ['email', 'code']
        this.emailDisabled = true
        this.panelTitle = 'Account Verification - Security Code'
        this.btnLabel = 'check code security'
        this.selectionMode = 'code'
      }
    },
    async AccountVerify () {
      try {
        debugger
        this.error = ''
        const cb = await AccountService.validateAccountCode(this.code)
        if (cb instanceof Error) {
          throw cb
        } else {
          this.$router.push('/resume')
        }
      } catch (err) {
        console.log(err)
        this.error = err.message
      }
    }
  },
  async mounted () {
    try {
      this.formState({})
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style scoped>
</style>
