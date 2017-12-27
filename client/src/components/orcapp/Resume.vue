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
import { mapState } from 'vuex'
import commonModule from '../../store/modules/auth'
const name = 'auth'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(name, {
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
    console.log('next ')
    const store = this.$store
     // register a new module only if doesn't exist
    if (!(store && store.state && store.state[name])) {
      store.registerModule(name, commonModule)
    } else {
        // re-use the already existing module
      console.log(`reusing module: ${name}`)
    }
  }
}
</script>

<style scoped>
</style>