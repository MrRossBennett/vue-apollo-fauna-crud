<template>
  <div class="px-6">
    <BooksNavBar :userInput="input" @changedValue="input = $event" @inputCleared="input = $event" />

    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="$apollo.error">ERROR</div>

    <label class="inline-flex items-center">
      <input type="checkbox" v-model="isCheckAll" @click="checkAll()" class="form-checkbox">
      <span class="mr-2">All</span>
    </label>

    <ul>
      <li v-for="(filterOption, index) in filterOptions" :key="index">
        <label class="inline-flex items-center">
          <input type="checkbox" :value="filterOption" v-model="filters" @change="updateCheckall()" class="form-checkbox">
          <span class="mr-2">{{ filterOption}}</span>
        </label>
      </li>
    </ul>

    <ul v-if="$apollo.data">
      <li
        v-for="(result, index) in filteredResults"
        :key="index"
        class="mt-4 bg-white rounded-lg shadow-lg"
      >
      <div class="flex items-center">
        <img :src="result.thumbnail" style="width: 128px; height: auto" class="mr-3 rounded-tl-lg rounded-bl-lg"/>
        <div class="p-2">
          <p class="text-sm uppercase">{{ result.__typename }}</p>
          <h2 class="font-bold">{{ result.title }}</h2>
        </div>
        </div>
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
      results: [],

      isCheckAll: true,
      filterOptions: ['Movie', 'Book', 'Music'],
      filters: []
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
        // BOOKS
        const booksData = data.books.items.map(book => book.volumeInfo)

        // If book has same title and same author, remove from array.
        const deDupedBooks = booksData.reduce((acc, current) => {
          const hasAuthors = authors => {
            return Array.isArray(authors) ? authors : []
          }
          const x = acc.find(item => item.title === current.title && item.authors.every(author => hasAuthors(current.authors).includes(author)))
          if (!x) {
            return acc.concat([current])
          } else {
            return acc
          }
        }, [])

        const books = deDupedBooks.map(book => {
          return book.imageLinks ? { ...book, thumbnail: book.imageLinks.thumbnail } : { ...book, thumbnail: 'https://via.placeholder.com/128x190' }
        })
        // Sort by popularity
        this.books = books.sort((x, y) => y.popularity - x.popularity)

        // MOVIES
        const movies = data.movies.results.map(movie => {
          return movie.poster_path ? { ...movie, thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie.poster_path}` } : { ...movie, thumbnail: 'https://via.placeholder.com/128x190' }
        })
        // Sort by popularity
        this.movies = movies.sort((x, y) => y.popularity - x.popularity)

        // MUSIC
        // Only return master releases from Discogs
        const music = data.music.results.filter(item => item.type === 'master')
        // Sort by popularity
        this.music = music.sort((x, y) => y.popularity.have - x.popularity.have)

        // Search Results
        const results = [...this.books, ...this.movies, ...this.music]

        const resultsSortedByTitle = results.sort(function (a, b) {
          var textA = a.title.toUpperCase()
          var textB = b.title.toUpperCase()
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })

        // Set rank number based on search keyword
        const setRank = result => {
          return {
            rank: result.title.replace(this.input, '').length
          }
        }

        const resultsSortedByRank = resultsSortedByTitle
          // .filter(({ title }) => title !== null) // remove all objects with null for diff
          .map(result => Object.assign(setRank(result), result))

        // Final search results are sorted byt our rank
        this.results = resultsSortedByRank.sort((x, y) => x.rank - y.rank)
      },
      debounce: 400
    }
  },

  computed: {
    filteredResults () {
      if (!this.filters.length) {
        return this.results
      }
      return this.results.filter(result => this.filters.includes(result.__typename))
    }
  },

  methods: {
    checkAll () {
      this.isCheckAll = !this.isCheckAll

      if (this.isCheckAll) { // Check all
        for (var key in this.filterOptions) {
          this.filters.push(this.filterOptions[key])
        }
      }
    },

    updateCheckall () {
      if (this.filters.length === this.filterOptions.length) {
        this.isCheckAll = true
      } else {
        this.isCheckAll = false
      }
    }
  }
}
</script>
