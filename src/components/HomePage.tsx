import React, { useEffect, useState } from 'react'
import Posters from './Posters.tsx'
import Choices from './Choices.tsx'
import ModeSwitch from './ModeSwitch.tsx'
import { MovieResult } from '../types'
import fetchMovies from '../lib/fetchMovies.ts'

const HomePage = () => {
  const [movieData, setMovieData] = useState<MovieResult>()
  const [selectedTitles, setSelectedTitles] = useState<string[]>([])
  const [ratingsMode, setRatingsMode] = useState<boolean>(false)
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchMovies()
      console.log(response)
      setMovieData(response)
    }
    getMovies()
  }, [])

  useEffect(() => {
    console.log(ratingsMode)
  }, [ratingsMode])

  const handleMovieSelection = (title: string, isSelecting: boolean) => {
    setSelectedTitles((prevSelectedTitles) => {
      if (isSelecting) {
        // Add the title if it's not already in the array
        return prevSelectedTitles.includes(title)
          ? prevSelectedTitles
          : [...prevSelectedTitles, title]
      } else {
        // Remove the title if it's being unselected
        return prevSelectedTitles.filter((t) => t !== title)
      }
    })
  }

  const handleModeSwitch = () => {
    setRatingsMode((ratingsMode) => !ratingsMode)
  }

  if (!movieData) {
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>Movie Rankings</h1>
      {ratingsMode ? (
        <p>Rank the movies by their Rotten Tomatoes score</p>
      ) : (
        <p>Rank the movies by their box office take</p>
      )}
      <Posters movieData={movieData} selectedTitles={selectedTitles} />
      <ModeSwitch onModeChange={handleModeSwitch} ratingsMode={ratingsMode} />
      <Choices movieData={movieData} onMovieSelect={handleMovieSelection} />
    </>
  )
}

export default HomePage
