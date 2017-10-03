<template>
<v-app toolbar--fixed toolbar style="overflow: hidden">
  
    <v-toolbar      
      class="lighten-3"
      dark
      scroll-target="#scrolling-techniques"
    >      
      <v-toolbar-title>ORC Emailer Profiles</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
      <emailer-new />
      <v-btn icon>
        <v-icon>more_vert</v-icon>
      </v-btn>
    </v-toolbar>
    <main
      style="max-height: 500px;"
      class="scroll-y"
      id="scrolling-techniques"
    >
 
      <v-container fluid
        grid-list-lg>
          <v-layout row wrap>
          <v-flex xs12 sm12 md6 lg4 xl3
          v-for="card in cards"
          :key="card.name">
            <v-card class="blue-grey darken-2 white--text">
              <v-system-bar status class="blue-grey darken-2 white--text">
                <span v-text="card.name"></span>
                        
              </v-system-bar>
              
              <v-card-title primary-title>
                
                <div class="headline" ></div>
                
                <div>                  
                 <v-chip label small v-text="card.host"></v-chip>
                 <v-chip label small v-text="card.date"> </v-chip>
                </div>

              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                 <emailer-edit :card="card"/>
                <v-btn  
                  small                                   
                  @click="removeProfile(card.id)">
                  <v-icon>delete</v-icon>
                </v-btn>     
              </v-card-actions>
            </v-card>
          </v-flex>
          </v-layout>
      </v-container>
      
    </main>
  </v-app>  
</template>

<script>
import {mapState} from 'vuex'
import EmailerNew from './EmailerNew'
import EmailerEdit from './EmailerEdit'
import EmailerService from '@/services/EmailerService'
export default {
  components: {
    EmailerNew,
    EmailerEdit
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route',
      'cproxyData'
    ])
  },
  data: () => ({
    cards: []
  }),
  methods: {
    async fetchProfiles () {
      this.cards = (await EmailerService.fetchProfiles()).data.fetchProfiles
    },
    async removeProfile (mid) {
      const result = (await EmailerService.remove({emailerid: mid})).data
      debugger
      if (result.success) {
        this.$store.dispatch('componentProxy', {ok: 1})
      } else {
        this.error = result.error
      }
    }
  },
  mounted () {
    try {
      this.fetchProfiles()
    } catch (error) {
      console.log('Error', error)
    }
  },
  watch: {
    cproxyData: {
      handler (val, oval) {
        console.log('watch.cproxyData.handler')
        if (val && val.ok === 1) {
          this.cards = null
          this.fetchProfiles()
          this.$store.dispatch('componentProxy', null)
        }
      }
    }
  }
}
</script>

<style>
</style>
