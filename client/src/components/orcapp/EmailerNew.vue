<template>
  <v-dialog v-model="dialog" persistent width="70%">
      <v-btn icon slot="activator">
          <v-icon >add</v-icon>
      </v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">Email Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container fluid grid-list-md>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Perfil Name" required hint="*key" v-model="this.mailer.name"></v-text-field>
              </v-flex>                
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Host Name" required hint="*example.domain.com" v-model="this.mailer.host"></v-text-field>
              </v-flex>
              <v-flex xs12 sm2 md2 lg2 xl2 >
                <v-text-field label="Port" type="number" required v-model="this.mailer.port"></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-switch v-bind:label="`Secure : ${this.mailer.secure ? 'Yes' : 'No'}`" v-model="this.mailer.secure" ></v-switch>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="User" v-model="this.mailer.user" required ></v-text-field>
              </v-flex>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Password" type="password" v-model="this.mailer.pass" required ></v-text-field>
              </v-flex> 
            </v-layout>
            <v-layout column wrap>
              <v-flex xs12 sm5 md5 lg4 xl4>
                <v-text-field label="Description" v-model="this.mailer.description" required ></v-text-field>
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
  import EmailerService from '@/services/EmailerService'
  export default {
    data () {
      return {
        dialogCloseTimeout: 0,
        dialog: false,
        mailer: {
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
    methods: {
      applyTimeout (me) {
        this.dialogCloseTimeout = 500
      },
      closeDialog () {
        this.name = ''
        this.host = ''
        this.port = 0
        this.secure = false
        this.user = ''
        this.pass = ''
        this.description = ''
        setTimeout(function (me) {
          me.dialog = false
          me.dialogCloseTimeout = -1
        },
        this.dialogCloseTimeout,
          this)
      },
      async validate () {
        debugger
        const result = await EmailerService.new()
        if (result) {
          this.dialog = false
        }
      }
    },
    async mounted () {
      try {
        // this.song = (await SongsService.show(songId)).data
      } catch (error) {
        console.log('Error', error)
      }
    },
    watch: {
      mailer: {
        handler: function () {
          debugger
          this.applyTimeout(this)
        },
        deep: true
      },
      host: function () { this.applyTimeout(this) },
      port: function () { this.applyTimeout(this) },
      secure: function () { this.applyTimeout(this) },
      user: function () { this.applyTimeout(this) },
      pass: function () { this.applyTimeout(this) },
      description: function () { this.applyTimeout(this) }
    },
    created () {
      debugger
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = true
      }
      return binding
    }
  }
</script>

<style>

</style>
