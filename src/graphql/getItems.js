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
    books(q: $input) @rest(path: "{args.q}", type: "Books", endpoint: "booksApi") {
      items @type(name: "Book") {
        volumeInfo @type(name: "Book") {
          title,
          subtitle,
          authors,
          publisher,
          overview: description,
          release_date: publishedDate,
          categories,
          imageLinks,
          popularity: averageRating
        }
      }
    },
    movies(query: $input) @rest(path: "&{args}", type: "Movies", endpoint: "moviesApi") {
      results @type(name: "Movie") {
        title,
        poster_path,
        overview
        release_date,
        original_language,
        original_title,
        popularity
      }
    },
    music(q: $input) @rest(path: "&{args}", type: "Music", endpoint: "discogsApi") {
      results @type(name: "Music") {
        title,
        thumbnail: thumb,
        type,
        popularity: community
      }
    }
  }
`

export { getAll, getBooks, getMovies }
