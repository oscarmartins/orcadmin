<template>
  <micro-app :micro="{title: 'Edit Profile'}" >                  
      <template slot="content" >
      <v-card>
        <v-alert error value="true" v-if="this.error" dismissible >
          {{this.error}}          
        </v-alert>  
        <v-card-title>
          <span class="headline">Edit Profile</span>
          <v-spacer></v-spacer>
        <v-btn
          absolute
          dark
          right
          class="red"
          @click.native.stop="orcgoto({name: 'emailer-remove', params: {profileid: profileid, parentPath: 'emailer-edit'}})"
        >
        <v-icon>delete</v-icon>
        </v-btn> 
        </v-card-title>       
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Perfil Name" required hint="*key" v-model="orcmailer.name"></v-text-field>
              </v-flex>                
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Host Name" required hint="*example.domain.com" v-model="orcmailer.host"></v-text-field>
              </v-flex>
              <v-flex xs12 sm2 md2 lg2 xl2 >
                <v-text-field label="Port" type="number" required v-model="orcmailer.port"></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-switch v-bind:label="`Secure : ${orcmailer.secure ? 'Yes' : 'No'}`" v-model="orcmailer.secure" ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="User" v-model="orcmailer.user" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Password" type="password" v-model="orcmailer.pass" required ></v-text-field>
              </v-flex> 
            </v-layout>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Description" v-model="orcmailer.description" required ></v-text-field>
              </v-flex>                
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat @click.native.stop="orcgoto({name: 'emailer-profiles'})">Cancel</v-btn>
          <v-btn class="blue--text darken-1" flat v-on:click="this.validate">Update</v-btn>
        </v-card-actions>
      </v-card>
      </template>
  </micro-app>
</template>

<script>
  import {mapState} from 'vuex'
  import EmailerService from '@/services/EmailerService'
  export default {
    data () {
      return {
        error: null,
        profileid: 0,
        orcmailer: {
          name: '',
          host: '',
          port: 0,
          secure: false,
          user: '',
          pass: '',
          description: ''
        }
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
        'route'
      ])
    },
    methods: {
      async validate () {
        console.log('validate')
        this.error = null
        let data = this.orcmailer
        data['profileid'] = this.profileid
        const result = await EmailerService.update(data)
        if (result.data.success) {
          this.orcgoto({name: 'emailer-profiles'})
        } else {
          this.error = result.data.error.detail
        }
      }
    },
    async mounted () {
      try {
        this.profileid = this.$route.params.profileid
        if (this.profileid) {
          console.log(this.profileid)
          this.orcmailer = (await EmailerService.retrieveProfileById(this.profileid)).data.profile
          console.log(this.orcmailer)
        } else {
          this.orcgoto({name: 'emailer-profiles'})
        }
      } catch (error) {
        console.log('Error', error)
      }
    }
  }
</script>

<style></style>
