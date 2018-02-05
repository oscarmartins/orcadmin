<template>
  <panel title="Recently Viewed Songs">
    <v-data-table
    :headers="headers"
    :items="histories"
    :pagination.sync="pagination"
    class="elevation-1"
    >
    <template slot="items" slot-scope="props">
        <td class="text-xs-right">
          {{props.item.title}}
        </td>
         <td class="text-xs-right">
          {{props.item.artist}}
        </td>
    </template>
    </v-data-table>
  </panel>
</template>

<script>
import {mapState} from 'vuex'
import SongHistoryService from '@/services/SongHistoryService'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      const tmp = (await SongHistoryService.index()).data
      this.histories = tmp
    }
  },
  data () {
    return {
      headers: [{
        text: 'Title',
        value: 'title'
      },
      {
        text: 'Artist',
        value: 'artist'
      }],
      pagination: {
        sortBy: 'createdAt',
        descending: true
      },
      histories: []
    }
  }
}
</script>

<style scoped>
</style>