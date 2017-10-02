<template>
<v-app toolbar--fixed toolbar style="overflow: hidden">  
    <v-toolbar class="lighten-3" dark scroll-target="#scrolling-techniques" >      
      <v-toolbar-title>{{micro.title}}</v-toolbar-title>
      <slot name="navitems-home"> No slot content defined. </slot>
      <v-spacer></v-spacer>
      <slot name="navitems"> No slot content defined. </slot>
    </v-toolbar>
    <main style="max-height: 650px;" class="scroll-y" id="scrolling-techniques" > 
      <v-container fluid grid-list-lg>
         <slot name="content">
          No slot content defined.
        </slot>     
      </v-container>      
    </main>
  </v-app>  
</template>

<script>
export default {
  props: ['micro']
}
</script>
