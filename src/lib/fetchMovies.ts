import axios from 'axios'
import { MovieObject } from '../types'
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

  const getTitles = async () => {
    year = getRandomInt(1970, 2022)
    genre = genres[getRandomInt(0, genres.length)]
    console.log(year, genre)
    url = `https://moviesminidatabase.p.rapidapi.com/movie/byYear/${year}/byGen/${genre}/`

    const headers = {
      'X-RapidAPI-Key': miniApiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
    }
    let response
    try {
      response = await axios.get(url, { headers })
      // Can change later to more movies
      movies = response.data.results
      return { year, genre, movies }
    } catch (error) {
      console.error(error)
      await delay(500)
    }
  }

  const getDetails = async ({ filmCount, movies }) => {
    let movieDetails: MovieObject[] = []
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
        if (rating === 'N/A' || data['BoxOffice'] === 'N/A') {
          continue
        }
        const movieObject = {
          title: movie['title'],
          rating,
          boxOffice: data['BoxOffice'],
          poster: data['Poster'],
        }
        movieDetails.push(movieObject)
        if (movieDetails.length === filmCount) {
          return movieDetails
        }
      } catch (error) {
        console.error(error)
      }
    }
    return movieDetails
  }

  let titles
  let details
  do {
    titles = await getTitles()
    if (titles) {
      details = await getDetails({ filmCount: 5, movies: titles.movies })
    }
  } while (
    !titles ||
    titles.movies.length < 5 ||
    (details && details.length < 5)
  )

  return { year: titles.year, genre: titles.genre, movies: details }
}

export default fetchMovies
