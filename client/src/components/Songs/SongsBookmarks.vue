<template>
  <panel title="Bookmarks">
    <v-data-table
    :headers="headers"
    :items="bookmarks"
    :pagination.sync="pagination"
    class="elevation-1"
    >
    <template slot="items" scope="props">
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
import BookmarksService from '@/services/BookmarksService'
export default {
  computed: {
    ...mapState([
      'isUserLoggedIn',
      'user'
    ])
  },
  async mounted () {
    if (this.isUserLoggedIn) {
      const tmp = (await BookmarksService.index()).data
      this.bookmarks = tmp
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
      bookmarks: []
    }
  }
}
</script>

<style scoped>
</style>