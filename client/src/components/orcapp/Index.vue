<template>
  <v-app toolbar footer>
    <v-toolbar class="" dark fixed>
      <v-toolbar-title class="mr-4">
        <router-link tag="span" style="cursor: pointer" :to="{name: this.isUserLoggedIn ? 'dashboard' : '/'}">
          ORC Admin
        </router-link>
      </v-toolbar-title>
      <v-toolbar-items>
        <v-btn v-if="!this.isUserLoggedIn" flat dark to="/">
          Start
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat dark v-if="!this.isUserLoggedIn" to="/login">
          Sign In
        </v-btn>
        <v-btn flat dark v-if="!this.isUserLoggedIn" to="/register">
          Sign Up
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <main>
      <v-container fluid v-bind:class="[this.toolbarAbs ? 'pt-0 pl-0 pr-0' : '']">
        <router-view></router-view>
      </v-container>
    </main>
    <v-footer class="footer secondary" light dark fixed>
      <span class="white--text ml-3">© {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'getstarted',
  data () {
    return {
      toolbarAbs: false,
      items: [
        {
          src: '/static/doc-images/threeone.png'
        },
        {
          src: '/static/doc-images/oneflex.png'
        },
        {
          src: '/static/doc-images/twoflex.png'
        }
      ]
    }
  },
  methods: {
    goTo (_item) {
      const route = _item.route.name
      if (route) {
        this.$router.push(route)
      } else {
        debugger
        const method = _item.route.params.method
        if (method) {
          this[method.name].apply(null, method.args)
        }
      }
    },
    updateToolbarAbs (state) {
      this.$store.dispatch('setToolbarAbs', state)
    }
  },
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  created () {
    this.updateToolbarAbs(true)
  },
  destroyed () {
    this.updateToolbarAbs(false)
  }
}
</script>

<style>

</style>
