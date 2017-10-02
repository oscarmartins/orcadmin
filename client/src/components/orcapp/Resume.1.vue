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
              {{user.email}}
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
import {mapState} from 'vuex'
export default {
  data () {
    return {}
  },
  methods: {},
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ]),
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
    if (!this.isUserLoggedIn) {
      this.$router.push({
        name: 'start'
      })
    }
  }
}
</script>

<style scoped>
</style>