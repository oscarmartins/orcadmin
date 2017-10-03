<template>
  <micro-app :micro="{title: ('Profiles [' + this.profiles.length + ']')}" > 
      <template slot="navitems-home" ></template>     
      <template slot="content" >
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12 sm12 md6 lg4 xl3
              v-for="profile in profiles"
              :key="profile.name">
                <v-card class="blue-grey darken-2 white--text">
                  <v-system-bar status class="blue-grey darken-2 white--text">
                    <span v-text="profile.name"></span>                        
                  </v-system-bar>              
                  <v-card-title primary-title>                
                    <div class="headline" ></div>                
                    <div>                  
                    <v-chip label small v-text="profile.host"></v-chip>
                    <v-chip label small v-text="profile.date"> </v-chip>
                    </div>
                  </v-card-title>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn small @click.native.stop="orcgoto({name: 'emailer-edit', params: {profileid: profile.id}})">
                      <v-icon>edit</v-icon>
                    </v-btn>     
                    <v-btn small @click.native.stop="orcgoto({name: 'emailer-remove', params: {profileid: profile.id}})">
                      <v-icon>delete</v-icon>
                    </v-btn>     
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
  components: {},
  data () {
    return {
      profiles: [],
      watch: ''
    }
  },
  methods: {
    async fetchProfiles () {
      this.profiles = (await EmailerService.fetchProfiles()).data.fetchProfiles
    }
  },
  mounted () {
    try {
      this.fetchProfiles()
    } catch (error) {
      console.log('Error', error)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ]),
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = true
      }
      return binding
    }
  },
  created () {},
  watch: {
    watch: {
      handler (val, oval) {
        console.log(oval, '>', val)
      }
    }
  }
}
</script>

<style scoped>
</style>
