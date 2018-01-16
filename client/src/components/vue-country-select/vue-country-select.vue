<template>
  <v-select
  label="Async items"
              autocomplete
              :loading="loading"
              multiple
              cache-items
              chips
              required
              :items="items"
              :rules="[() => select.length > 0 || 'You must choose at least one']"
              :search-input.sync="search"
              v-model="select"
  ></v-select>
</template>

<script>
  export default {
    data () {
      return {
        loading: false,
        items: [],
        search: null,
        select: [],
        states: ['oscar', 'useres', 'dskhjbfajhkfb', 'asdkjdfn']
      }
    },
    watch: {
      search (val) {
        val && this.querySelections(val)
      }
    },
    methods: {
      querySelections (v) {
        debugger
        this.loading = true
        // Simulated ajax query
        setTimeout(() => {
          this.items = this.states.filter(e => {
            return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1
          })
          this.loading = false
        }, 500)
      }
    }
  }
</script>