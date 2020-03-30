import gql from 'graphql-tag'

const getBooks = gql`
  query getBooks {
    books @rest(path: "?q=moon", type: "Book", endpoint: "booksApi") {
      items
    }
  }
`

const getMovies = gql`
  query getMovies {
    movies @rest(path: "&query=moon", type: "Movie", endpoint: "moviesApi") {
      results
    }
  }
`

const getAll = gql`
  query getAll($input: String!) {
    books(q: $input) @rest(path: "?{args}", type: "Books", endpoint: "booksApi") {
      items @type(name: "Book") {
        volumeInfo @type(name: "Book") {
          title,
          subtitle,
          authors,
          publisher,
          overview: description,
          release_date: publishedDate,
          categories,
          thumbnail: imageLinks
        }
      }
    },
    movies(query: $input) @rest(path: "&{args}", type: "Movies", endpoint: "moviesApi") {
      results @type(name: "Movie") {
        title,
        thumbnail: poster_path,
        overview
        release_date,
        original_language,
        original_title
      }
    }
  }
`

export { getAll, getBooks, getMovies }
