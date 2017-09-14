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
          <div class="error" v-html="error" />
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
import Panel from '@/components/Panel'
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
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>
  .error{
    color: red;
  }
  
</style>
