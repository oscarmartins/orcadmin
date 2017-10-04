<template>
  <v-dialog v-model="dialogEdit" persistent width="70%">
      <v-btn small slot="activator">
        <v-icon>edit</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Edit Email Profile</span>
           <v-spacer></v-spacer>
        <v-btn
          absolute
          dark
          right
          class="red"
          @click="removeProfile(card.id)"
        >
        <v-icon>delete</v-icon>
        </v-btn> 
        </v-card-title>
       
        <v-alert error value="true" v-if="this.error" >
          {{this.error}}
        </v-alert>  
        
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Perfil Name" required hint="*key" v-model="orcmaileredit.name"></v-text-field>
              </v-flex>                
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Host Name" required hint="*example.domain.com" v-model="orcmaileredit.host"></v-text-field>
              </v-flex>
              <v-flex xs12 sm2 md2 lg2 xl2 >
                <v-text-field label="Port" type="number" required v-model="orcmaileredit.port"></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-switch v-bind:label="`Secure : ${orcmaileredit.secure ? 'Yes' : 'No'}`" v-model="orcmaileredit.secure" ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="User" v-model="orcmaileredit.user" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Password" type="password" v-model="orcmaileredit.pass" required ></v-text-field>
              </v-flex> 
            </v-layout>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Description" v-model="orcmaileredit.description" required ></v-text-field>
              </v-flex>                
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat v-on:click="this.closeDialog">Close</v-btn>
          <v-btn class="blue--text darken-1" flat v-on:click="this.validate">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import EmailerService from '@/services/EmailerService'
  export default {
    props: ['card'],
    data () {
      return {
        dialogEdit: false,
        error: null,
        orcmaileredit: this.cloneData()
      }
    },
    computed: {
      ...mapState([
        'isUserLoggedIn',
        'user',
        'route',
        'cproxyData'
      ])
    },
    methods: {
      cloneData () {
        this.orcmaileredit = {
          name: this.card.name,
          host: this.card.host,
          port: this.card.port,
          secure: this.card.secure,
          user: this.card.user,
          pass: this.card.pass,
          description: this.card.description
        }
        return this.orcmaileredit
      },
      closeDialog () {
        
        this.cloneData()
        this.dialogEdit = false
      },
      async validate () {
        this.error = null
        let data = this.orcmaileredit
        data['emailer_id'] = this.card.id
        const result = await EmailerService.update(data)
        
        if (result.data.success) {
          this.dialogEdit = false
          this.$store.dispatch('componentProxy', {ok: 1})
          return true
        } else {
          this.error = result.data.error
        }
      },
      async removeProfile (mid) {
        const result = (await EmailerService.remove({emailerid: mid})).data
        
        if (result.success) {
          this.$store.dispatch('componentProxy', {ok: 1})
        } else {
          this.error = result.error
        }
      }
    },
    mounted () {
      try {
        
        this.$store.dispatch('componentProxy', null)
      } catch (error) {
        console.log('Error', error)
      }
    }
  }
</script>

<style>

</style>
