export const cleanseMovies = movies => {
  // MOVIES
  const filteredMovies = movies.map(movie => {
    return movie.poster_path ? { ...movie, thumbnail: `https://image.tmdb.org/t/p/w220_and_h330_bestv2${movie.poster_path}` } : { ...movie, thumbnail: 'https://via.placeholder.com/128x190' }
  })

  const cleanedMovies = filteredMovies.map(movie => {
    return {
      ...movie,
      popularity: Math.round(movie.popularity * 100 / 50)
    }
  })
  // Sort by popularity
  return cleanedMovies.sort((x, y) => y.popularity - x.popularity)
}
