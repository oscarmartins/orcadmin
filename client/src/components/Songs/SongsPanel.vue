<template>
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
      class="song"
      v-for="song in songs"
      :key="song.id">
      <v-layout>
        <v-flex xs6>
          <div class="song-title">
            {{song.title}}
          </div>
            <div class="song-artist">
            {{song.artist}}
          </div>
            <div class="song-album">
            {{song.album}}
          </div>
          <v-btn 
            class="green accent-3"
            :to="{
              name: 'song', 
              params: {songId:song.id}}"                             
            light
            medium               
            middle>     
            view
          </v-btn>
        </v-flex>
        <v-flex xs6>
          <img class="album-image responsive-img" :src="song.albumImageUrl" />
        </v-flex>
      </v-layout>                     
    </div>         
  </panel>
</template>

<script>

import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      songs: null
    }
  },
  watch: {
    '$route.query.search': {
      immediate: true,
      async handler (value) {
        this.songs = (await SongsService.index(value)).data
      }
    }
  }
}
</script>

<style scoped>
.song{
  padding: 20px;
  height: 330px;
  overflow: hidden;
}
.song-title{
  font-size: 30px;
}
.song-artist{
  font-size: 24px;
}
.song-album{
  font-size: 18px;
}
.album-image{
  width: 70%;
  margin: 0 auto;
}
</style>
