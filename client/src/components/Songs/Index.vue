<template>
  <v-layout >
    <v-flex xs6 class="mr-1" v-if="isUserLoggedIn">
      <songs-bookmarks />
      <recently-viewed-songs class="mt-2" />
    </v-flex>
    <v-flex :class="{
      xs12: !isUserLoggedIn,
      xs6: isUserLoggedIn
    }" class="ml-1">
      <songs-search-panel />
      <songs-panel class="mt-2" />
    </v-flex>
  </v-layout>
</template>
<script>
import SongsPanel from './SongsPanel'
import SongsBookmarks from './SongsBookmarks'
import RecentlyViewedSongs from './RecentlyViewedSongs'
import SongsSearchPanel from './SongsSearchPanel'
import SongsService from '@/services/SongsService'
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  components: {
    SongsPanel,
    SongsSearchPanel,
    SongsBookmarks,
    RecentlyViewedSongs
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
