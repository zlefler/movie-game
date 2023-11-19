import axios from 'axios'

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

export const genres = [
  'Adventure',
  'Family',
  'Fantasy',
  'Crime',
  'Drama',
  'Comedy',
  'Animation',
  'Sci-Fi',
  'Sport',
  'Action',
  'Thriller',
  'Mystery',
  'Western',
  'Romance',
  'Biography',
  'Horror',
  'War',
  'Musical',
  'History',
]


const miniApiKey = process.env.REACT_APP_MOVIES_MINI_API_KEY
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

export const fetchMovies = async () => {
  let movies = []
  let year
  let genre
  let url

  while (movies.length < 4) {
    year = getRandomInt(1982, 2003)
    genre = genres[getRandomInt(0, genres.length)]
    console.log(year, genre);
    url = `https://moviesminidatabase.p.rapidapi.com/movie/byYear/${year}/byGen/${genre}/`

    const headers = {
      'X-RapidAPI-Key': miniApiKey,
      'X-RapidAPI-Host': 'moviesminidatabase.p.rapidapi.com',
    }
    let response
    try {
      response = await axios.get(url, { headers })
      movies = response.data.results

    } catch (error) {
      console.error(error)
    }
  }

  const res: MovieResult = { genre, year, movies: [] }
  // console.log(`${genre} Movies In ${year}`)
  for (const movie of movies) {
    const omdbApiKey = process.env.REACT_APP_OMDB_API_KEY
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
      const movieObject = 
      {
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
