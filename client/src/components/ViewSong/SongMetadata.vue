<template>
<panel title="Song Metadata">
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
        dark
        class="cyan"
        :to="{name: 'song-edit', params () { return {songId: song.id}}}">
        Edit
        </v-btn>
        <v-btn
        v-if="isUserLoggedIn && !bookmark"
        dark
        class="cyan"
        @click="setAsBookmark">
        Set Bookmark
        </v-btn>
        <v-btn
        v-if="isUserLoggedIn && bookmark"
        dark
        class="cyan"
        @click="unsetAsBookmark">
        Unset As Bookmark
        </v-btn>

        </v-flex>
        <v-flex xs6>
        <img class="album-image " :src="song.albumImageUrl" />
        <br>
        {{song.album}}
        </v-flex>
    </v-layout>
</panel>
</template>

<script>
import {mapState} from 'vuex'
import BookmarksService from '@/services/BookmarksService'
export default {
  props: ['song'],
  computed: {
    ...mapState([
      'isUserLoggedIn'
    ])
  },
  data () {
    return {
      bookmark: null
    }
  },
  watch: {
    async song () {
      if (!this.isUserLoggedIn) {
        return
      }
      try {
        this.bookmark = (await BookmarksService.index({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (error) {
        console.log(error)
      }
    }
  },
  methods: {
    async setAsBookmark () {
      try {
        this.bookmark = (await BookmarksService.post({
          songId: this.song.id,
          userId: this.$store.state.user.id
        })).data
      } catch (error) {
        console.log(error)
      }
    },
    async unsetAsBookmark () {
      try {
        console.log('BookmarksService.delete')
        await BookmarksService.delete(this.bookmark.id)
        this.bookmark = null
      } catch (error) {
        console.log(error)
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
textarea{
  width: 100%;
  font-family: monospace;
  border: none;
  border-style: none;
  border-color: transparent;
  height: 600px;
  overflow: auto;
  padding: 40px;
}
</style>