<template>
  <v-app toolbar>
   
    <page-header />
      <main>
        <v-container fluid>
          <router-view></router-view>
        </v-container>
      </main>
  </v-app>
</template>

<script>
import PageHeader from '@/components/orcapp/Header'
export default {
  components: {
    PageHeader
  }
}
</script>