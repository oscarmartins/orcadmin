<template>
  <div id="app">
    <nav-drawer />
<!--     <v-app >      
      <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
   </v-app> -->    
  </div>
</template>
<script>
// import PageHeader from '@/components/Header'
// import PageHeader from '@/components/orcapp/Header'
import NavDrawer from '@/components/orcapp/NavDrawer'
export default {
  name: 'app',
  components: {
    NavDrawer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
