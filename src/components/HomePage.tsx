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

  const handleMovieSelection = (title: string, isSelecting: boolean) => {
    setSelectedTitles((prevSelectedTitles) => {
      if (isSelecting) {
        return prevSelectedTitles.includes(title)
          ? prevSelectedTitles
          : [...prevSelectedTitles, title]
      } else {
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

  const parseRating = (value: string | undefined): number => {
    if (value === undefined) {
      return 0
    }
    return ratingsMode ? parseInt(value.slice(0, -1)) : parseInt(value.slice(1))
  }

  const handleSubmit = (guesses: string[]) => {
    const answers = movieData.movies
      .sort((a, b) => {
        const aValue = ratingsMode ? a.rating : a.boxOffice
        const bValue = ratingsMode ? b.rating : b.boxOffice
        return parseRating(bValue) - parseRating(aValue)
      })
      .map((movie) => movie.title)

    console.log(answers)
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
      <Choices
        movieData={movieData}
        handleSubmit={handleSubmit}
        onMovieSelect={handleMovieSelection}
      />
    </>
  )
}

export default HomePage
