<template>
  <div>
    <BooksNavBar :userInput="input" @changedValue="input = $event"  @inputCleared="input = $event" />

    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="$apollo.error">ERROR</div>

    <div v-if="$apollo.data">
      <div
        v-for="(result, index) in results"
        :key="index"
      >
        <p>{{ result.title }}</p>
        <p class="text-sm uppercase">{{ result.__typename }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import BooksNavBar from '@/components/BooksNavBar'
import { getAll } from '../graphql/getItems'

export default {
  components: {
    BooksNavBar
  },

  props: ['userInput'],

  data () {
    return {
      input: null,
      books: [],
      movies: [],
      results: []
    }
  },

  apollo: {
    books: {
      query: getAll,
      variables () {
        return {
          input: this.input
        }
      },
      skip () {
        return !this.input
      },
      result ({ data, loading, networkStatus }) {
        this.books = data.books.items.map(item => item.volumeInfo)
        this.movies = data.movies.results

        const results = [...this.books, ...this.movies]

        this.results = results.sort(function (a, b) {
          var textA = a.title.toUpperCase()
          var textB = b.title.toUpperCase()
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })
      },
      debounce: 400
    }
  }
}
</script>
