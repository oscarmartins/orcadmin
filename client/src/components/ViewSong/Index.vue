<template>
<div>
  <v-layout>
    <v-flex xs6 >
      <song-metadata :song="song" />
    </v-flex>
    <v-flex xs6 class="ml-2">
      <you-tube :youtubeId="song.youtubeId" />
    </v-flex>
  </v-layout>
  <v-layout class="mt-2">
    <v-flex xs6 >
      <tab :song="song" />
    </v-flex>
    <v-flex xs6 class="ml-2">
      <lyrics :song="song" />
    </v-flex>
  </v-layout>
</div> 
</template>

<script>

import SongMetadata from '@/components/ViewSong/SongMetadata'
import Lyrics from '@/components/ViewSong/Lyrics'
import Tab from '@/components/ViewSong/Tab'
import YouTube from '@/components/ViewSong/YouTube'
import SongsService from '@/services/SongsService'
import SongHistoryService from '@/services/SongHistoryService'

import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user',
      'route'
    ])
  },
  data () {
    return {
      song: {}
    }
  },
  async mounted () {
    const songId = this.route.params.songId
    this.song = (await SongsService.show(songId)).data

    if (this.isUserLoggedIn) {
      SongHistoryService.post({
        songId: songId
      })
    }
  },
  components: {
    SongMetadata,
    Lyrics,
    Tab,
    YouTube
  }
}
</script>

<style scoped>

</style>