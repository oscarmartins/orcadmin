<template>
  <v-select
  label="País"
  autocomplete
  browser-autocomplete
  search-input
              required
              :items="items"
              :value.sync='preselected'
              :name='name'
              @change="changedValue"
  ></v-select>
</template>

<script>
  export default {
    data () {
      return {
        items: []
      }
    },
    props: {
      model: {
        required: true,
        twoWay: true
      },
      preselected: {
        type: String,
        default: 'PT'
      },
      name: {
        type: String,
        default: 'country'
      }
    },
    mounted () {
      this.items = require('./countries')
      debugger
    },
    methods: {
      changedValue: function (val) {
        this.preselected = val
      }
    }
  }
</script>