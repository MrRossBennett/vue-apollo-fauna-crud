<template>
  <div>
    <div class="sticky w-full top-0 bg-gray-100 px-6 py-4 shadow">
      <SearchInput
        :user-input="input"
        @changedValue="input = $event"
        @inputCleared="input = $event"
      />
      <div class="flex flex-wrap items-center pt-4 relative w-full text-sm">
        <ul class="flex flex-wrap items-center">
          <li
            v-for="(filterOption, index) in filterOptions"
            :key="index"
            class="pr-6"
          >
            <div class="flex items-center">
              &#8203;
              <input
                v-model="filters"
                type="checkbox"
                :value="filterOption"
                class="form-checkbox border-gray-400 h-4 w-4"
              />
              <label class="ml-1 text-gray-600">
                {{ filterOption }}
              </label>
            </div>
          </li>
        </ul>
      </div>

      <p v-if="$apollo.data && results.length > 0" class="text-xs pt-4">
        {{ results.length }} results
      </p>
      <div v-if="$apollo.loading" class="text-sm">Loading...</div>
      <div v-if="$apollo.error">ERROR</div>
    </div>

    <ul v-if="$apollo.data" class="grid gap-4 grid-container--fill p-6">
      <li
        v-for="(result, index) in filteredResults"
        :key="index"
        class="shadow-md rounded-lg flex flex-col text-gray-700"
        draggable
        @dragstart="pickupItem($event, result)"
      >
        <img
          :src="result.thumbnail"
          class="w-full rounded-tr-lg rounded-tl-lg"
        />
        <div class="p-2 text-sm">
          <!-- <p class="text-sm uppercase">{{ result.__typename }}</p> -->
          <h2 class="font-bold">{{ result.title }}</h2>
          <p class="text-xs">{{ result.release_date }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { cleanseBooks } from '@utils/cleanseBooks'
import { cleanseMovies } from '@utils/cleanseMovies'
import { cleanseMusic } from '@utils/cleanseMusic'
import { getAll } from '../graphql/getItems'
import SearchInput from './SearchInput'

export default {
  components: {
    SearchInput
  },

  props: {
    userInput: {
      type: String,
      default: ''
    }
  },

  data() {
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

      variables() {
        return {
          input: this.input
        }
      },

      skip() {
        return !this.input
      },

      result({ data, loading, networkStatus }) {
        this.books = cleanseBooks(data.books.items)
        this.movies = cleanseMovies(data.movies.results)
        this.music = cleanseMusic(data.music.results)

        // Search Results
        const results = [...this.books, ...this.movies, ...this.music]

        // Set rank number based on search keyword
        const setRank = result => {
          return {
            rank:
              result.popularity - result.title.replace(this.input, '').length
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
    filteredResults() {
      if (!this.filters.length) {
        return this.results
      }
      return this.results.filter(result =>
        this.filters.includes(result.__typename)
      )
    }
  },

  methods: {
    pickupItem(e, result) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('payload', JSON.stringify(result))
    }
  }
}
</script>
