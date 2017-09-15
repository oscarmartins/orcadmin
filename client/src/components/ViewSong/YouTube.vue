<template>
  <panel title="Youtube Video">    
    <youtube 
      :video-id="youtubeId"
      :player-width="auto"
      :player-height="330">
      </youtube>
  </panel>
</template>

<script>
import Panel from '@/components/Panel'
import VueYouTubeEmbed from 'vue-youtube-embed'
export default {
  props: [
    'youtubeId'
  ],
  components: {
    Panel,
    VueYouTubeEmbed
  }
}
</script>

<style scoped>
</style>