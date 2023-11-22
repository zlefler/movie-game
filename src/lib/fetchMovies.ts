import axios from 'axios'
import { MovieResult } from '../types'
import { genres } from './staticData.ts'

const miniApiKey = process.env.REACT_APP_MOVIES_MINI_API_KEY
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const delay = (ms) => new Promise((res) => setTimeout(res, ms))

const fetchMovies = async () => {
  let movies = []
  let year
  let genre
  let url

  while (movies.length < 4) {
    year = getRandomInt(1982, 2003)
    genre = genres[getRandomInt(0, genres.length)]
    url = `https://moviesminidatabase.p.rapidapi.com/movie/byYear/${year}/byGen/${genre}/`

    const headers = {
      'X-RapidAPI-Key': miniApiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
    }
    let response
    try {
      response = await axios.get(url, { headers })
      // Can change later to more movies
      movies = response.data.results.slice(0, 5)
    } catch (error) {
      console.error(error)
      await delay(500)
    }
  }
  const res: MovieResult = { genre, year, movies: [] }
  for (const movie of movies) {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY
    const omdbUrl = `https://www.omdbapi.com/?i=${movie['imdb_id']}&apikey=${omdbApiKey}`
    try {
      const response = await axios.get(omdbUrl)
      const data = response.data
      let rating
      for (const movieRating of data['Ratings']) {
        if (movieRating['Source'] === 'Rotten Tomatoes') {
          rating = movieRating['Value']
        }
      }
      const movieObject = {
        title: movie['title'],
        rating,
        boxOffice: data['BoxOffice'],
        poster: data['Poster'],
      }
      res.movies.push(movieObject)
    } catch (error) {
      console.error(error)
    }
  }
  return res
}

export default fetchMovies
