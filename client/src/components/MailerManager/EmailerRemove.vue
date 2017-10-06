<template>
  <micro-app :micro="{title: 'Remove Profile'}" >
      <template slot="navitems-home" ></template>   
      <template slot="navitems" ></template>                 
      <template slot="content" >
      <v-container fluid grid-list-lg>
          <v-layout row wrap>  
            <v-flex xs12 sm12 md6 offset-md3 lg6 offset-lg3 xl6 offset-xl3>
              <v-card  >
                <v-card-title>          
                  <span class="headline">Remove Profile</span>
                  <v-spacer />
                  <v-icon>delete</v-icon>
                </v-card-title>       
                <v-card-text>
                  <p>{{orcmailer.name}}</p>        
                  
                  
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <small>Are you sure? </small>
                  <v-btn class="white--text darken-1 green" @click.native.stop="orcgoto(getPathName())">No</v-btn>
                  <v-btn class="white--text darken-1 red"  v-on:click="this.yes">Yes</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
      </v-container>
      </template>
  </micro-app>
</template>

<script>
  import {mapState} from 'vuex'
  import EmailerService from '@/services/EmailerService'
  export default {
    data () {
      return {
        profileid: 0,
        parentPath: null,
        orcmailer: {}
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
      getPathName () {
        const output = {name: 'emailer-profiles', params: {}}
        if (this.parentPath) {
          output.name = this.parentPath
          output.params = {profileid: this.profileid}
        }
        return output
      },
      async yes () {
        const result = (await EmailerService.remove(this.profileid)).data
        if (result.success) {
          this.orcgoto({name: 'emailer-profiles'})
        } else {
          this.error = result.error.detail
        }
      }
    },
    async mounted () {
      try {
        const params = this.$route.params
        this.profileid = params.profileid
        this.parentPath = params.parentPath
        let problems = (!this.profileid)
        if (!problems) {
          const result = (await EmailerService.retrieveProfileById(this.profileid)).data
          if (result.success) {
            this.orcmailer = result.profile
          } else {
            problems = true
          }
        }
        if (problems) {
          const pathname = this.parentPath || 'emailer-profiles'
          this.orcgoto({name: pathname})
        }
      } catch (error) {
        console.log('Error', error)
      }
    }
  }
</script>

<style></style>
