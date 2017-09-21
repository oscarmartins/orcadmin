<template>
  <div>
     <home v-if="!this.isUserLoggedIn"></home>
     <dashboard v-if="this.isUserLoggedIn"></dashboard>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import Home from '@/components/orcapp/Index'
import Dashboard from '@/components/orcapp/Dashboard'
export default {
  name: 'app',
  components: {
    Home,
    Dashboard
  },
  methods: {
    logout () {
      debugger
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: '/root'
      })
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'toolbarAbs'
    ])
  }
}
</script>

<style>
</style>
