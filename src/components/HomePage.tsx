import React, { useEffect, useState } from 'react'
import Posters from './Posters.tsx'
import Choices from './Choices.tsx'
import ModeSwitch from './ModeSwitch.tsx'
import { MovieResult } from '../types'
import fetchMovies from '../lib/fetchMovies.ts'

const HomePage = () => {
  const [movieData, setMovieData] = useState<MovieResult>()
  const [ratingsMode, setRatingsMode] = useState<boolean>(false)
  const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([])
  const [inputValues, setInputValues] = useState<string[]>([])

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchMovies()
      // set answers to array the size of the list
      setInputValues(Array(response.movies.length).fill(''))
      setMovieData(response)
    }
    getMovies()
  }, [])

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
    const answers = [...movieData.movies]
      .sort((a, b) => {
        const aValue = ratingsMode ? a.rating : a.boxOffice
        const bValue = ratingsMode ? b.rating : b.boxOffice
        return parseRating(bValue) - parseRating(aValue)
      })
      .map((movie) => movie.title)
    let answerArray: boolean[] = []
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === guesses[i]) {
        answerArray.push(true)
      } else {
        answerArray.push(false)
      }
    }
    setCorrectAnswers(answerArray)
  }

  return (
    <>
      <h1>Movie Rankings</h1>
      {ratingsMode ? (
        <p>Rank the movies by their Rotten Tomatoes score</p>
      ) : (
        <p>Rank the movies by their box office take</p>
      )}
      <Posters movieData={movieData} inputValues={inputValues} />
      <ModeSwitch onModeChange={handleModeSwitch} ratingsMode={ratingsMode} />
      <Choices
        movieData={movieData}
        handleSubmit={handleSubmit}
        inputValues={inputValues}
        setInputValues={setInputValues}
        correctAnswers={correctAnswers}
      />
    </>
  )
}

export default HomePage
