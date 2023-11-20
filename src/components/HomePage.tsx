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
    <div>
        <h1>Movie Game</h1>
        </div>
        <div>
        <Posters movieData={movieData} />
        </div>
        </>
        )
}

export default HomePage