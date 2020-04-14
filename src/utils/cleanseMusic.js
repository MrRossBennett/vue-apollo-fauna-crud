export const cleanseMusic = music => {
  console.log(music)
  // Only return master releases from Discogs
  const filteredMusic = music.map(item => {
    return {
      ...item,
      popularity: item.popularity ? Math.round(item.popularity.rating.average * 100 / 5) : null
    }
  })
  // Sort by popularity
  return filteredMusic.sort((x, y) => y.popularity - x.popularity)
}
