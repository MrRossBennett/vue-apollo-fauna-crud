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
          <p class="font-bold">{{ result.rank }}</p>
        </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import BooksNavBar from '@/components/BooksNavBar'
import { getAll } from '../graphql/getItems'
import { cleanseBooks } from '../utils/cleanseBooks'
import { cleanseMovies } from '../utils/cleanseMovies'
import { cleanseMusic } from '../utils/cleanseMusic'

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

      debounce: 400,

      variables () {
        return {
          input: this.input
        }
      },

      skip () {
        return !this.input
      },

      result ({ data, loading, networkStatus }) {
        this.books = cleanseBooks(data.books.items)
        this.movies = cleanseMovies(data.movies.results)
        this.music = cleanseMusic(data.music.results)

        // Search Results
        const results = [...this.books, ...this.movies, ...this.music]

        // Set rank number based on search keyword
        const setRank = result => {
          return {
            rank: result.popularity - result.title.replace(this.input, '').length
          }
        }

        const resultsWithRank = results
          // .filter(({ title }) => title !== null) // remove all objects with null for diff
          .map(result => Object.assign(setRank(result), result))

        // Final search results are sorted by our rank
        this.results = resultsWithRank.sort((x, y) => y.rank - x.rank)
      }
    }
  },

  computed: {
    // Checkbox filter results
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

      if (this.isCheckAll) {
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
