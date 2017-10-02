<template>
  <micro-app :micro="micro" >
      <template slot="navitems" >
          <v-btn icon @click.native.stop="shapeSelector = pageNewProfile">
            <v-icon>add</v-icon>
          </v-btn>
      </template> 
      <template slot="navitems-home">
          <v-btn icon @click.native.stop="shapeSelector = pageHome">
            <v-icon>home</v-icon>
          </v-btn>
      </template>
                    
    </slot>
      <emailer-new-page slot="content" v-if="this.shapeSelector == pageNewProfile"/>
      <template slot="content" v-if="this.shapeSelector == pageHome">
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
                <v-btn small @click.native.stop="shapeSelector = pageEditProfile">
                  <v-icon>edit</v-icon>
                </v-btn>     
                <v-btn small @click.native.stop="shapeSelector = pageRemoveProfile">
                  <v-icon>delete</v-icon>
                </v-btn>     
              </v-card-actions>
            </v-card>
          </v-flex>
      </template> 
  </micro-app>
</template>

<script>
import {mapState} from 'vuex'
import EmailerService from '@/services/EmailerService'
import EmailerNewPage from './EmailerNewPage'

export default {
  components: {
    EmailerNewPage
  },
  data () {
    return {
      micro: {title: ''},
      shapeSelector: '',
      profiles: [],
      pageHome: 'home',
      pageHomeTitle: 'All Mailers Profiles',
      pageNewProfile: 'new_profile',
      pageEditProfile: 'edit_profile',
      pageRemoveProfile: 'remove_profile',
      pageNewProfileTitle: 'New Mailer Profile',
      pageEditProfileTitle: 'Edit Mailer Profile',
      pageRemoveProfileTitle: 'Remove Mailer Profile'
    }
  },
  methods: {
    initConst () {
      this.pageHome = 'home'
      this.pageHomeTitle = 'All Mailers Profiles'
      this.pageNewProfile = 'new_profile'
      this.pageNewProfileTitle = 'New Mailer Profile'
      this.pageEditProfile = 'edit_profile'
      this.pageEditProfileTitle = 'Edit Mailer Profile'
      this.pageRemoveProfile = 'remove_profile'
      this.pageRemoveProfileTitle = 'Remove Mailer Profile'
    },
    async fetchProfiles () {
      this.profiles = (await EmailerService.fetchProfiles()).data.fetchProfiles
    }
  },
  mounted () {
    try {
      this.initConst()
      this.shapeSelector = this.pageHome
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
    shapeSelector: {
      handler (val, oval) {
        this.initConst() // force init const data binding
        console.log(oval, '>', val)
        if (val) {
          if (val === this.pageHome) {
            this.micro.title = this.pageHomeTitle
            this.fetchProfiles()
          } else if (val === this.pageEditProfile) {
            this.micro.title = this.pageEditProfileTitle
          } else if (val === this.pageNewProfile) {
            this.micro.title = this.pageNewProfileTitle
          } else if (val === this.pageRemoveProfile) {
            this.micro.title = this.pageRemoveProfileTitle
          }
        }
      }
    }
  }
}
</script>

<style scoped>
</style>