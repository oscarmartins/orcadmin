<template>
  <v-dialog v-model="dialog" persistent width="70%">
      <v-btn icon slot="activator">
          <v-icon >add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">New Email Profile</span>
        </v-card-title>
         
        <v-alert error value="true" v-if="this.error" >
          {{this.error}}
        </v-alert>  
        
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
             

    <!-- 
      table.text('name').notNullable()
        table.text('host').notNullable()
        table.integer('port').notNullable()        
        table.boolean('secure').defaultTo(false).notNullable()        
        table.text('user').notNullable()
        table.text('pass').notNullable()
        table.text('description')
        table.datetime('date').notNullable()
    -->
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="blue--text darken-1" flat v-on:click="this.closeDialog">Close</v-btn>
          <v-btn class="blue--text darken-1" flat v-on:click="this.validate">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
  import {mapState} from 'vuex'
  import EmailerService from '@/services/EmailerService'
  export default {
    data () {
      return {
        dialogCloseTimeout: 0,
        dialog: false,
        error: null,
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
        'route',
        'cproxyData'
      ])
    },
    methods: {
      applyTimeout (me) {
        this.dialogCloseTimeout = 500
      },
      closeDialog () {
        console.log('closeDialog')
        Object.keys(this.orcmailer).forEach((k) => {
          this.orcmailer[k] = null
        })
        setTimeout(function (me) {
          me.error = null
          me.dialog = false
          me.dialogCloseTimeout = -1
        },
        this.dialogCloseTimeout, this)
      },
      async validate () {
        console.log('validate')
        this.error = null
        const result = await EmailerService.new(this.orcmailer)
        debugger
        if (result.data.success) {
          this.closeDialog()
          this.$store.dispatch('componentProxy', {ok: 1})
          return true
        } else {
          this.error = result.data.error
        }
      }
    },
    async mounted () {
      try {
        debugger
        this.$store.dispatch('componentProxy', null)
      } catch (error) {
        console.log('Error', error)
      }
    },
    watch: {
      orcmailer: {
        handler (val, oval) {
          console.log('watch.orcmailer.handler')
          this.applyTimeout(this)
        },
        deep: true
      }
    }
  }
</script>

<style>

</style>
