<template>
<div>
 <v-container grid-list-xl>
    <v-layout v-bind="binding">
      <v-flex>
        <v-card >
          <v-card-text>
            <v-chip class="indigo white--text">
              <v-avatar>
                <v-icon>account_circle</v-icon>
              </v-avatar>
              {{this.profile.email}}
            </v-chip>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card dark class="secondary">
          <v-card-text>two</v-card-text>
        </v-card>
      </v-flex>
      <v-flex>
        <v-card dark class="accent">
          <v-card-text>three</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters({
      'isAuthenticated': 'isAuthenticated',
      'profile': 'profile'
    }),
    binding () {
      const binding = {}
      if (this.$vuetify.breakpoint.mdAndUp) {
        binding.column = true
      }
      return binding
    }
  },
  created () {
    debugger
  }
}
</script>

<style scoped>
</style>