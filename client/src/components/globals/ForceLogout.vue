<template>
    <v-dialog v-model="dialog" persistent >
        <v-card>          
          <v-card-text>
            <small>A sessão não é válida!</small>
          </v-card-text>          
          <v-card-actions>
            <v-btn class="green--text darken-1" flat="flat" @click.native.stop="orcgoto({name: 'login'})">Iniciar nova sessão</v-btn>
          </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: true
    }
  },
  mounted () {
    this.$store.dispatch('setToken', null)
    this.$store.dispatch('setUser', null)
  }
}
</script>

<style>

</style>
