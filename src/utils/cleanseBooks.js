// import { format } from 'date-fns'

export const cleanseBooks = books => {
  // BOOKS
  const booksData = books.map(book => book.volumeInfo)

  // If book has same title and same author, remove from array.
  // const deDupedBooks = booksData.reduce((acc, current) => {
  //   const hasAuthors = authors => {
  //     return Array.isArray(authors) ? authors : []
  //   }
  //   const x = acc.find(item => item.title === current.title && item.authors.every(author => hasAuthors(current.authors).includes(author)))
  //   if (!x) {
  //     return acc.concat([current])
  //   } else {
  //     return acc
  //   }
  // }, [])

  // const formatReleaseDate = date => format(new Date(date), 'yyyy')

  const filteredbooks = booksData.map(book => {
    return book.imageLinks ? { ...book, thumbnail: book.imageLinks.thumbnail } : { ...book, thumbnail: 'https://via.placeholder.com/128x190' }
  })

  const cleanedBooks = filteredbooks.map(book => {
    return {
      ...book,
      popularity: Math.round(book.popularity * 100 / 5)
    }
  })

  // Sort by popularity
  return cleanedBooks.sort((x, y) => y.popularity - x.popularity)
  // Sort by release date
  // return popularBooks.sort((x, y) => formatReleaseDate(y.release_date) - formatReleaseDate(x.release_date))
}
