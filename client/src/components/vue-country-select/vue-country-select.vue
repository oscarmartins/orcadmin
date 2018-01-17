<template>
  <v-select
  label="País"
  autocomplete
  browser-autocomplete
  search-input
              :required="required"
              :disabled="disabled"
              :items="items"
              :value.sync='select'
              :name='name'
              @change="changedValue"
  ></v-select>
</template>

<script>
  export default {
    data () {
      return {
        items: [],
        selected: ''
      }
    },
    props: {
      preselected: {
        type: Function,
        required: true
      },
      select: {
        type: String,
        default: 'PT'
      },
      required: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        default: 'country'
      }
    },
    mounted () {
      debugger
      this.items = require('./countries')
    },
    methods: {
      changedValue: function (val) {
        debugger
        this.selected = val
        this.$props.preselected(val)
      }
    }
  }
</script>