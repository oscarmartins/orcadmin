<template>
    <v-dialog v-model="dialog" persistent max-width="290">
        <v-btn block large dark slot="activator" ><v-icon class="white--text" >exit_to_app</v-icon>Logout </v-btn>
        <v-card>
          <v-card-title class="headline">Logout</v-card-title>
          <v-card-text>Tem a certeza que pretende terminar a sessão?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn class="green--text darken-1" flat="flat" @click.native="dialog = false">Não</v-btn>
            <v-btn class="green--text darken-1" flat="flat" @click="logout" @click.native="dialog = false">Sim</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      dialog: false
    }
  },
  computed: {
    ...mapState([
      'auth'
    ])
  },
  methods: {
    async logout () {
      await AuthenticationService.logout(this)
    },
    updateToolbarAbs (state) {
      // this.$store.dispatch('setToolbarAbs', state)
    }
  }
}
</script>

<style>

</style>
