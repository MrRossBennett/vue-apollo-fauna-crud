<template>
  <div>
    <BooksNavBar :userInput="input" @changedValue="input = $event" @inputCleared="input = $event" />

    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="$apollo.error">ERROR</div>

    <ul v-if="$apollo.data">
      <li
        v-for="(result, index) in results"
        :key="index"
        class="mt-4 bg-white p-6 rounded-lg shadow-lg"
      >
        <p class="text-sm uppercase">{{ result.__typename }}</p>
        <h2 class="font-bold">{{ result.title }}</h2>
        <p class="text-sm mt-2">{{ result.overview }}</p>
      </li>
    </ul>
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
      music: [],
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
        // this.music = data.music.results

        const results = [...this.books, ...this.movies]

        // this.results = results.sort(function (a, b) {
        //   var textA = a.title.toUpperCase()
        //   var textB = b.title.toUpperCase()
        //   return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        // })

        this.results = results
      },
      debounce: 400
    }
  }
}
</script>
