<template>
  <div class="px-6">
    <BooksNavBar :userInput="input" @changedValue="input = $event" @inputCleared="input = $event" />

    <div v-if="$apollo.loading">Loading...</div>
    <div v-if="$apollo.error">ERROR</div>

    <ul v-if="$apollo.data">
      <li
        v-for="(result, index) in results"
        :key="index"
        class="mt-4 bg-white rounded-lg shadow-lg"
      >
      <div class="flex items-center">
        <img :src="result.thumbnail" style="width: 128px; height: auto" class="mr-3 rounded-tl-lg rounded-bl-lg"/>
        <div class="p-2">
          <p class="text-sm uppercase">{{ result.__typename }}</p>
          <h2 class="font-bold">{{ result.title }}</h2>
          <p class="text-sm mt-2">{{ result.overview }}</p>
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
        // Books
        const booksData = data.books.items.map(book => book.volumeInfo)

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

        this.books = deDupedBooks.map(book => {
          return book.imageLinks ? { ...book, thumbnail: book.imageLinks.thumbnail } : { ...book, thumbnail: 'https://via.placeholder.com/128x190' }
        })

        // Movies
        const movies = data.movies.results.map(movie => {
          return movie.poster_path ? { ...movie, thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie.poster_path}` } : { ...movie, thumbnail: 'https://via.placeholder.com/128x190' }
        })
        this.movies = movies.sort((x, y) => y.popularity - x.popularity)

        // Music
        this.music = data.music.results.filter(item => item.type === 'master')

        // Search Results
        const results = [...this.books, ...this.movies, ...this.music]

        const resultsSortedByTitle = results.sort(function (a, b) {
          var textA = a.title.toUpperCase()
          var textB = b.title.toUpperCase()
          return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
        })

        const resultsSortedByRank = resultsSortedByTitle
          // .filter(({ title }) => title !== null) // remove all objects with null for diff
          .sort((x, y) => y.title.replace(this.input, '').length - x.title.replace(this.input, '').length)
          .map((x, i) => Object.assign({ rank: x.title.replace(this.input, '').length }, x))

        this.results = resultsSortedByRank.sort((x, y) => x.rank - y.rank)
      },
      debounce: 400
    }
  }
}
</script>
