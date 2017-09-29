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
                <v-btn small flat dark>Editar</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
          </v-layout>
      </v-container>
      
    </main>
  </v-app>  
</template>

<script>
import EmailerNew from './EmailerNew'
import EmailerService from '@/services/EmailerService'
export default {
  components: {
    EmailerNew
  },
  data: () => ({
    dialog: false,
    cards: [
      { name: 'RecoveryPass', host: 'mail.hostname.com', description: 'recovery password email template', date: new Date() },
      { name: 'SignIn', host: 'mail.hostname.com', description: 'sigin email template', date: new Date() },
      { name: 'SignUp', host: 'mail.hostname.com', description: 'sigup email template', date: new Date() },
      { name: 'Newsletter', host: 'mail.hostname.com', description: 'newsletter email template', date: new Date() },
      { name: 'Billing', host: 'mail.hostname.com', description: 'Billing email template', date: new Date() }
    ]
  }),
  async mounted () {
    try {
      this.cards = (await EmailerService.fetchProfiles()).fetchProfiles
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style>

</style>
