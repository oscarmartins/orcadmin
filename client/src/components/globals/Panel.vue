<template>
  <div class="white elevation-2 ">
    <v-toolbar flat dense class="black" dark>
      <v-toolbar-title>{{title}}</v-toolbar-title>
      <slot name="action" />
    </v-toolbar>
    <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs12 >
     <slot>
        No slot content defined.
     </slot>       
      </v-flex></v-layout></v-container>
  </div> 
</template>

<script>
export default {
  props: [
    'title'
  ]
}
</script>

<style scoped>
</style>