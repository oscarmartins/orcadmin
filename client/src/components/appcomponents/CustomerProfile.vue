<template>
<div>
   <v-container grid-list-xl>
    <v-layout v-bind="binding" row wrap>
       <v-flex>

       </v-flex>
      <v-flex>
 <v-card color="grey lighten-4" flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row>
          <v-flex xs4>
            <v-text-field
              name="firstName"
              label="firstName"
            ></v-text-field>
          </v-flex>
          <v-flex xs4>
            <v-text-field
              name="lastName"
              label="lastName"
            ></v-text-field>
          </v-flex>      
        </v-layout>
         <v-layout row>
           <v-flex xs3>
          <v-select
              v-bind:items="items"
              v-model="e1"
              label="Gender"
              single-line
              bottom
            ></v-select>
           </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
      </v-flex>
    </v-layout>
   </v-container>
</div>
</template>

<script>
import { mapState } from 'vuex'
const name = 'auth'
export default {
  data () {
    return {
      items: [{ text: 'Male' }, { text: 'Female' }]
    }
  },
  computed: {
    ...mapState(name, {
      isAuthenticated: 'isAuthenticated',
      profile: 'profile'
    }),
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = true
      }
      return binding
    }
  },
  created () {}
}
</script>

<style scoped>

</style>