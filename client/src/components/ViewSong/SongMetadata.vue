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
        edit
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
export default {
  props: ['song']
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