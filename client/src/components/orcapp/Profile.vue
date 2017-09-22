<template>
<div >
  <v-card >
  <v-card-title>
    <span class="headline">User Profile</span>
  </v-card-title>
  <v-card-text >
    <v-container grid-list-md fluid >
      <v-layout wrap row >
        <v-flex d-flex xs12 sm6 md4>
          <v-text-field label="first name" required></v-text-field>
        </v-flex>
          <v-flex d-flex xs12 sm6 md4>
          <v-text-field label="last name" required></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout wrap row>             
        <v-flex d-flex xs12 sm12 md4 lg4 xl4>
          <v-text-field label="Email" v-model="email" required></v-text-field>
        </v-flex>
      </v-layout> 
      <v-layout wrap row>             
        <v-flex d-flex xs12 sm12 md4 lg4 xl4>
          <br>
          <v-alert error value="true" v-if="this.error" >
            {{this.error}}
          </v-alert>  
          <br>
          <v-btn
            class="cyan" 
            dark
            @click="register">
            Update Profile
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
  </v-card>
  <v-card>
  <v-card-title>
    <span class="headline">Account Password</span>
  </v-card-title>
  <v-card-text>
    <v-container grid-list-md>
      <v-layout wrap row>
        <v-flex d-flex xs12 sm6 md4>
          <v-text-field
              label="Password"              
              v-model="password"
              type="password"
              autocomplete="new-password">
          </v-text-field>     
        </v-flex>
      </v-layout>
      <v-layout wrap row>             
        <v-flex d-flex xs12 sm12 md4 lg4 xl4>
          <v-text-field
              label="Password"              
              v-model="password"
              type="password"
              autocomplete="new-password">
          </v-text-field>     
        </v-flex>
      </v-layout> 
      <v-layout wrap row>             
        <v-flex d-flex xs12 sm12 md4 lg4 xl4>
          <v-text-field
              label="Password"              
              v-model="password"
              type="password"
              autocomplete="new-password">
          </v-text-field>     
        </v-flex>
      </v-layout>
      <v-layout wrap row>             
        <v-flex d-flex xs12 sm12 md4 lg4 xl4>
          <br>
          <v-alert error value="true" v-if="this.error" >
            {{this.error}}
          </v-alert>  
          <br>
          <v-btn
            class="cyan" 
            dark
            @click="register">
            Change Password
          </v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card-text>
  </v-card>
</div>
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