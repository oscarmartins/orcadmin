<template>
<v-app toolbar--fixed toolbar style="overflow: hidden">  
    <v-toolbar class="lighten-3" dark scroll-target="#scrolling-techniques" >      
      <v-toolbar-title>{{micro.title}}</v-toolbar-title>
      <slot name="navitems-home"> 
        <v-btn icon @click.native.stop="orcgoto({name: 'emailer-profiles'})">
          <v-icon>home</v-icon>
        </v-btn> </slot>
      <v-spacer></v-spacer>
      <slot name="navitems">
        <v-btn class="green"  @click.native.stop="orcgoto({name: 'emailer-create'})">
            <v-icon>add</v-icon>
            <span>new</span>
        </v-btn>
      </slot>
    </v-toolbar>
    <main style="max-height: 650px;" class="scroll-y" id="scrolling-techniques" > 
      <slot name="content">
          No slot content defined.
        </slot>          
    </main>
  </v-app>  
</template>

<script>
export default {
  props: ['micro'],
  methods: {},
  mounted () {}
}
</script>
