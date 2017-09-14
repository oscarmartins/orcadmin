<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Songs">
        <div slot="action">
          <v-btn 
            class="green accent-3"
            to="/songs/create"
            fab
            light
            medium
            absolute
            right
            middle>
            <v-icon>
              add
            </v-icon>
          </v-btn>
        </div>
        <div 
          v-for="song in songs"
          :key="song.id">
           
          <p>{{song.title}}</p>
          <p>{{song.artist}}</p>
          <p>{{song.album}}</p>
           
        </div>  
       
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  components: {
    Panel
  },
  data () {
    return {
      songs: null
    }
  },
  async mounted () {
    this.songs = (await SongsService.index()).data
  }
}
</script>

<style scoped>
</style>
