<template>
  <v-layout>
    <v-flex lg12 md6 xs4 >
      <panel title="Song Metadata">
        <v-text-field
          label="Title"
          required
          :rules="[required]"
          v-model="song.title">
        </v-text-field>
        <v-text-field
          label="Artist"
          required
          :rules="[required]"              
          v-model="song.artist">
        </v-text-field>
        <v-text-field
          label="Genre"
          required
          :rules="[required]"              
          v-model="song.genre">
        </v-text-field>
        <v-text-field
          label="Album"
          required
          :rules="[required]"              
          v-model="song.album">
        </v-text-field>
        <v-text-field
          label="Album Image Url"
          required
          :rules="[required]"              
          v-model="song.albumImageUrl">
        </v-text-field>
        <v-text-field
          label="Youtube Id"
          required
          :rules="[required]"              
          v-model="song.youtubeId">
        </v-text-field> 
      </panel>
    </v-flex>
    <v-flex lg12 md6 xs8 class="ml-2">
        <panel title="Song Structure">
        <v-text-field
          label="Lyrics"
          required
          :rules="[required]"
          multi-line              
          v-model="song.lyrics">
        </v-text-field>
        <v-text-field
          label="Tab"
          required
          :rules="[required]"
          multi-line              
          v-model="song.tab">
        </v-text-field> 
        </panel>
        <v-alert error value="true" v-if="this.error" >
          {{this.error}}
        </v-alert>  
        <v-btn
          class="cyan" 
          dark
          @click="save">
          Save Song
        </v-btn>      
    </v-flex>
  </v-layout>
  
</template>

<script>
import Panel from '@/components/Panel'
import SongsService from '@/services/SongsService'
export default {
  data () {
    return {
      song: {
        title: null,
        artist: null,
        genre: null,
        album: null,
        albumImageUrl: null,
        youtubeId: null,
        lyrics: null,
        tab: null
      },
      error: null,
      required: (value) => !!value || 'Required.'
    }
  },
  components: {
    Panel
  },
  methods: {
    async save () {
      this.error = null
      const areAllFieldFilledIn = Object
      .keys(this.song)
      .every(key => !!this.song[key])
      if (!areAllFieldFilledIn) {
        this.error = 'Please fill in all the required fields.'
        return
      }
      try {
        const songId = this.$store.state.route.params.songId
        await SongsService.put(this.song)
        this.$router.push({
          name: 'song',
          params: {
            songId: songId
          }
        })
      } catch (err) {
        console.log('ERRR!!!: ', err)
      }
    }
  },
  async mounted () {
    try {
      const songId = this.$store.state.route.params.songId
      this.song = (await SongsService.show(songId)).data
    } catch (error) {
      console.log('Error', error)
    }
  }
}
</script>

<style scoped>
</style>