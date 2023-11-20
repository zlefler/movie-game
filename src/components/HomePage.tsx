import React, { useEffect, useState } from 'react'
import Posters from './Posters.tsx'
import { MovieResult } from '../types'
import fetchMovies from '../lib/fetchMovies.ts'

const HomePage = () => {
  const [movieData, setMovieData] = useState<MovieResult>()

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchMovies()
      console.log(response)
      setMovieData(response)
    }
    getMovies()
  }, [])

  return (
    <>
      <h1>Movie Game</h1>
      <Posters movieData={movieData} />
    </>
  )
}

export default HomePage
