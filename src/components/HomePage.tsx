import React, { useEffect, useState } from 'react'
import Posters from './Posters.tsx'
import ModeSwitch from './ModeSwitch.tsx'
import { MovieResult } from '../types'
import fetchMovies from '../lib/fetchMovies.ts'

const HomePage = () => {
  const [movieData, setMovieData] = useState<MovieResult>()
  const [ratingsMode, setRatingsMode] = useState<boolean>(false)
  const [inputValues, setInputValues] = useState<string[]>([])
  const [submitted, setSubmitted] = useState<boolean>(false)
  // const [correctAnswers, setCorrectAnswers] = useState<boolean[]>([])

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetchMovies()
      setInputValues(response.movies.map((movie) => movie.title))
      setMovieData(response)
    }
    getMovies()
  }, [])

  useEffect(() => {
    console.log(ratingsMode)
  }, [ratingsMode])

  const parseRating = (value: string | undefined): number => {
    if (value === undefined) {
      return 0
    }
    return ratingsMode ? parseInt(value.slice(0, -1)) : parseInt(value.slice(1))
  }

  const handleSubmit = () => {
    if (!movieData) {
      return
    }
    const order = [...movieData.movies].sort((a, b) => {
      const aValue = ratingsMode ? a.rating : a.boxOffice
      const bValue = ratingsMode ? b.rating : b.boxOffice
      return parseRating(bValue) - parseRating(aValue)
    })
    setMovieData({ ...movieData, movies: order })

    const answers = order.map((movie) => movie.title)
    let answerArray: boolean[] = []
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === inputValues[i]) {
        answerArray.push(true)
      } else {
        answerArray.push(false)
      }
    }
    // setCorrectAnswers(answerAhrray)
    setSubmitted(true)
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
      <ModeSwitch onModeChange={handleModeSwitch} ratingsMode={ratingsMode} />
      <Posters
        movieData={movieData}
        inputValues={inputValues}
        setInputValues={setInputValues}
        submitted={submitted}
        handleSubmit={handleSubmit}
        ratingsMode={ratingsMode}
      />
    </>
  )
}

export default HomePage
