import axios from 'axios'
import { randomInt } from 'crypto'
import { genres } from './staticData'

interface MovieObject {
  title: string
  rating?: string
  boxOffice?: string
  poster?: string
}

interface MovieResult {
  genre: string
  year: number
  movies: MovieObject[]
}

const miniApiKey = process.env.MOVIES_MINI_API_KEY

export const fetchMovies = async () => {
  let movies = []
  let year
  let genre
  let url

  while (movies.length < 4) {
    year = randomInt(1982, 2003)
    genre = genres[randomInt(0, 15)]
    url = `https://moviesminidatabase.p.rapidapi.com/movie/byYear/${year}/byGen/${genre}/`

    const headers = {
      'X-RapidAPI-Key': miniApiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
    }
    let response
    try {
      response = await axios.get(url, { headers })
      console.log(response.data)
      movies = response.data.results
    } catch (error) {
      console.error(error)
    }
  }

  const res: MovieResult = { genre, year, movies: [] }
  console.log(`${genre} Movies In ${year}`)
  for (const movie of movies) {
    const omdbApiKey = process.env.OMDB_API_KEY
    const omdbUrl = `http://www.omdbapi.com/?i=${movie['imdb_id']}&apikey=${omdbApiKey}`

    try {
      const response = await axios.get(omdbUrl)
      const data = response.data
      let rating
      for (const movieRating of data['Ratings']) {
        if (movieRating['Source'] === 'Rotten Tomatoes') {
          rating = movieRating['Value']
        }
      }
      res.movies.push({
        title: movie['title'],
        rating,
        boxOffice: data['boxOffice'],
        poster: data['Poster'],
      })
    } catch (error) {
      console.error(error)
    }
  }
  return res
}
